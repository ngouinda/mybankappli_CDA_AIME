import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm'; // Assurez-vous que le chemin est correct
import '@testing-library/jest-dom';

// On mocke la fonction fetch pour simuler les appels d'API
global.fetch = jest.fn();

// On mocke la navigation pour ne pas avoir d'erreurs en testant les redirections
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('RegisterForm', () => {

  // Teste si les champs et le bouton sont bien rendus
  test('renders with all required fields and a submit button', () => {
    render(<BrowserRouter><RegisterForm /></BrowserRouter>);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
  });

  // Teste une inscription réussie
  test('handles successful registration and navigates to login page', async () => {
    // On simule une réponse d'API réussie (status 201 Created)
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: () => Promise.resolve({ message: 'Utilisateur enregistré avec succès.' }),
    });

    render(<BrowserRouter><RegisterForm /></BrowserRouter>);

    // Remplir les champs du formulaire
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'Password123!' } });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    // Vérifier que l'appel d'API a été fait avec les bonnes données
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        '/api/register',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            email: 'newuser@example.com',
            password: 'Password123!',
          }),
        })
      );
    });

    // Vérifier que l'utilisateur est bien redirigé après le succès
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });

  // Teste une inscription qui échoue avec un email déjà utilisé
  test('shows an error message for an existing email', async () => {
    // On simule une réponse d'erreur de l'API (status 409 Conflict)
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: () => Promise.resolve({ message: 'Cet email est déjà utilisé.' }),
    });

    render(<BrowserRouter><RegisterForm /></BrowserRouter>);

    // Remplir les champs du formulaire
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'existing@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'Password123!' } });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    // Attendre que le message d'erreur soit affiché
    await waitFor(() => {
      expect(screen.getByText('Cet email est déjà utilisé.')).toBeInTheDocument();
    });

    // Vérifier que la navigation n'a pas été appelée
    expect(mockedUsedNavigate).not.toHaveBeenCalled();
  });
});
