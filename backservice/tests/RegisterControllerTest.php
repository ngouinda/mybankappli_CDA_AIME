<?php

namespace App\Tests\Controller\Api;

use App\Controller\Api\RegisterController;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegisterControllerTest extends TestCase
{
    private $entityManager;
    private $passwordHasher;
    private $validator;
    private $controller;
    private $userRepository;

    protected function setUp(): void
    {
        // On crée des objets "mock" (simulés) pour les dépendances du contrôleur.
        // Cela nous permet de tester le contrôleur isolément, sans toucher à la base de données réelle.
        $this->entityManager = $this->createMock(EntityManagerInterface::class);
        $this->passwordHasher = $this->createMock(UserPasswordHasherInterface::class);
        $this->validator = $this->createMock(ValidatorInterface::class);

        // On crée un mock pour le UserRepository car le contrôleur l'utilise pour chercher un utilisateur existant.
        $this->userRepository = $this->createMock(UserRepository::class);

        // On s'assure que le repository est bien retourné par l'EntityManager.
        $this->entityManager->method('getRepository')->willReturn($this->userRepository);

        // On instancie le contrôleur avec les mocks.
        $this->controller = new RegisterController();
    }

    // -- SCÉNARIOS DE SUCCÈS --

    public function testRegisterSuccessfully()
    {
        // Arrange : Préparation des données
        $requestContent = json_encode([
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);
        $request = new Request([], [], [], [], [], [], $requestContent);

        // On simule que l'utilisateur n'existe pas encore.
        $this->userRepository->method('findOneBy')->willReturn(null);

        // On simule un mot de passe haché.
        $this->passwordHasher->method('hashPassword')->willReturn('hashed_password');

        // On simule une validation sans erreurs.
        $this->validator->method('validate')->willReturn(new ConstraintViolationList());

        // On simule l'enregistrement de l'entité User.
        $this->entityManager->expects($this->once())->method('persist');
        $this->entityManager->expects($this->once())->method('flush');

        // Act : Exécution du contrôleur
        $response = $this->controller->register(
            $request,
            $this->entityManager,
            $this->passwordHasher,
            $this->validator
        );

        // Assert : Vérification du résultat
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
        $this->assertStringContainsString('Utilisateur enregistré avec succès.', $response->getContent());
    }

    // -- SCÉNARIOS D'ÉCHEC --

    public function testRegisterFailsWithMissingData()
    {
        // Arrange : Demande sans email ni mot de passe.
        $request = new Request([], [], [], [], [], [], json_encode([]));

        // Act : Exécution du contrôleur
        $response = $this->controller->register(
            $request,
            $this->entityManager,
            $this->passwordHasher,
            $this->validator
        );

        // Assert : Vérification du résultat
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
        $this->assertStringContainsString('Email et mot de passe requis.', $response->getContent());
    }

    public function testRegisterFailsWithExistingEmail()
    {
        // Arrange : Préparation des données et d'un utilisateur existant
        $requestContent = json_encode([
            'email' => 'existing@example.com',
            'password' => 'password123',
        ]);
        $request = new Request([], [], [], [], [], [], $requestContent);

        // On simule qu'un utilisateur existe déjà.
        $existingUser = new User();
        $this->userRepository->method('findOneBy')->willReturn($existingUser);

        // Act : Exécution du contrôleur
        $response = $this->controller->register(
            $request,
            $this->entityManager,
            $this->passwordHasher,
            $this->validator
        );

        // Assert : Vérification du résultat
        $this->assertEquals(Response::HTTP_CONFLICT, $response->getStatusCode());
        $this->assertStringContainsString('Cet email est déjà utilisé.', $response->getContent());
    }

    public function testRegisterFailsWithValidationErrors()
    {
        // Arrange : Préparation de données non valides
        $requestContent = json_encode([
            'email' => 'invalid-email', // Email non valide
            'password' => 'short',      // Mot de passe trop court
        ]);
        $request = new Request([], [], [], [], [], [], $requestContent);

        // On simule qu'il n'y a pas d'utilisateur existant.
        $this->userRepository->method('findOneBy')->willReturn(null);
        
        // On simule une liste d'erreurs de validation.
        $errors = new ConstraintViolationList([
            $this->createMock(\Symfony\Component\Validator\ConstraintViolation::class),
            $this->createMock(\Symfony\Component\Validator\ConstraintViolation::class),
        ]);
        $this->validator->method('validate')->willReturn($errors);

        // Act : Exécution du contrôleur
        $response = $this->controller->register(
            $request,
            $this->entityManager,
            $this->passwordHasher,
            $this->validator
        );

        // Assert : Vérification du résultat
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
        $this->assertStringContainsString('Erreur de validation.', $response->getContent());
        // Note : On pourrait aller plus loin en vérifiant le contenu exact des erreurs, mais c'est un bon début.
    }
}
