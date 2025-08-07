<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Form\CategorieType;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/categories')] // Notez que nous utilisons /api pour une API RESTful
final class CategorieController extends AbstractController
{
    // GET /api/categories : Récupérer toutes les catégories
    #[Route('', name: 'api_categorie_index', methods: ['GET'])]
    public function index(CategorieRepository $categorieRepository): JsonResponse
    {
        $categories = $categorieRepository->findAll();
        $data = [];

        foreach ($categories as $categorie) {
            $data[] = [
                'id' => $categorie->getId(),
                'name' => $categorie->getName(),
            ];
        }

        return $this->json($data); // Retourne une réponse JSON
    }

    // POST /api/categories : Créer une nouvelle catégorie
    #[Route('', name: 'api_categorie_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true); // Parse le JSON envoyé par React
        $categorie = new Categorie();
        $categorie->setName($data['name']);

        $entityManager->persist($categorie);
        $entityManager->flush();

        return $this->json([
            'id' => $categorie->getId(),
            'name' => $categorie->getName(),
        ], 201); // Réponse JSON avec le code HTTP 201 (Créé)
    }

    // PUT /api/categories/{id} : Mettre à jour une catégorie existante
    #[Route('/{id}', name: 'api_categorie_edit', methods: ['PUT'])]
    public function edit(Request $request, Categorie $categorie, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true); // Parse le JSON envoyé par React
        $categorie->setName($data['name']);

        $entityManager->flush();

        return $this->json([
            'id' => $categorie->getId(),
            'name' => $categorie->getName(),
        ]);
    }

    // DELETE /api/categories/{id} : Supprimer une catégorie
    #[Route('/{id}', name: 'api_categorie_delete', methods: ['DELETE'])]
    public function delete(Categorie $categorie, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($categorie);
        $entityManager->flush();

        return $this->json(['message' => 'Category deleted successfully']);
    }
}
