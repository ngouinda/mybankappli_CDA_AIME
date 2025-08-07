import { useEffect, useState } from "react";
import { fetchCategories, createCategory, deleteCategory } from "../../api/categories";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importez le CSS des icônes

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [error, setError] = useState(null); // État pour les messages d'erreur

  // Charger les catégories au montage du composant
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError("Erreur lors du chargement des catégories.");
      }
    };
    loadCategories();
  }, []);

  // Créer une nouvelle catégorie
  const handleCreate = async () => {
    setError(null); // Réinitialise l'erreur
    if (!newCategory.name.trim()) {
      setError("Le nom de la catégorie ne peut pas être vide.");
      return;
    }

    try {
      const createdCategory = await createCategory(newCategory);
      setCategories((prevCategories) => [...prevCategories, createdCategory]);
      setNewCategory({ name: "" }); // Réinitialise le formulaire
    } catch (err) {
      setError("Erreur lors de l'ajout de la catégorie.");
    }
  };

  // Supprimer une catégorie
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      // Met à jour la liste sans recharger toutes les données depuis l'API
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la catégorie.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Colonne de gauche : Formulaire d'ajout de catégorie */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4">
              <h4 className="mb-0">➕ Ajouter une Catégorie</h4>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger" role="alert">{error}</div>
              )}
              <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">Nom de la catégorie</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Ex: Nourriture, Transport, Loisirs"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ name: e.target.value })}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Enregistrer la Catégorie
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Colonne de droite : Liste des catégories */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-success text-white rounded-top-4">
              <h4 className="mb-0">📝 Catégories Disponibles</h4>
            </div>
            <ul className="list-group list-group-flush">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{category.name}</span>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(category.id)}
                      title="Supprimer la catégorie"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center text-muted py-4">
                  Aucune catégorie enregistrée.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;