<?php
// src/Controller/Api/SecureController.php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class SecureController extends AbstractController
{
    #[Route('/api/secure', name: 'api_secure', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $user = $this->getUser();

        return $this->json([
            'message' => 'Bienvenue sur la route protégée 🔐',
            'user' => $user ? $user->getUserIdentifier() : null,
        ]);
    }
}
