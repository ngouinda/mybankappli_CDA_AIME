<?php



namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function index(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'message' => 'Email ou mot de passe invalide.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        // Si l'authentification est réussie, le token est généré par le bundle.
        // Cette route ne sert qu'à récupérer les infos de l'utilisateur si besoin.
        return $this->json([
            'userIdentifier' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
        ]);
    }
}
