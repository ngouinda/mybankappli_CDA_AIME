import { useEffect, useState } from "react";
import { fetchDepenses, createDepense, deleteDepense } from "../../api/depenses";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Assurez-vous d'avoir installé bootstrap-icons

function Depenses() {
  const [depenses, setDepenses] = useState([]);
  const [newDepense, setNewDepense] = useState({ montant: "", date: "", description: "" });
  const [error, setError] = useState(null); // État pour gérer les erreurs

  // Calcul du montant total des dépenses
  const totalDepenses = depenses.reduce((acc, depense) => acc + parseFloat(depense.montant), 0);

  // Charger les dépenses au montage du composant
  useEffect(() => {
    const loadDepenses = async () => {
      try {
        const data = await fetchDepenses();
        setDepenses(data);
      } catch (err) {
        setError("Erreur lors du chargement des dépenses.");
      }
    };
    loadDepenses();
  }, []);

  // Créer une nouvelle dépense
  const handleCreate = async () => {
    setError(null);
    if (!newDepense.montant || !newDepense.date || !newDepense.description) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const createdDepense = await createDepense(newDepense);
      setDepenses((prevDepenses) => [...prevDepenses, createdDepense]);
      setNewDepense({ montant: "", date: "", description: "" });
    } catch (err) {
      setError("Erreur lors de l'ajout de la dépense.");
    }
  };

  // Supprimer une dépense
  const handleDelete = async (id) => {
    try {
      await deleteDepense(id);
      setDepenses((prevDepenses) => prevDepenses.filter(depense => depense.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la dépense.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Colonne de gauche : Formulaire d'ajout de dépense */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4">
              <h4 className="mb-0">➕ Ajouter une Dépense</h4>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger" role="alert">{error}</div>
              )}
              <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                {/* Montant */}
                <div className="mb-3">
                  <label htmlFor="montant" className="form-label">Montant (€)</label>
                  <input
                    type="number"
                    id="montant"
                    className="form-control"
                    placeholder="25.50"
                    value={newDepense.montant}
                    onChange={(e) => setNewDepense({ ...newDepense, montant: e.target.value })}
                    required
                  />
                </div>
                {/* Date */}
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input
                    type="datetime-local"
                    id="date"
                    className="form-control"
                    value={newDepense.date}
                    onChange={(e) => setNewDepense({ ...newDepense, date: e.target.value })}
                    required
                  />
                </div>
                {/* Description */}
                <div className="mb-4">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    placeholder="Achat de courses, essence..."
                    value={newDepense.description}
                    onChange={(e) => setNewDepense({ ...newDepense, description: e.target.value })}
                    required
                  />
                </div>
                {/* Bouton Ajouter */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Enregistrer la Dépense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Colonne de droite : Liste des dépenses et total */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-success text-white rounded-top-4 d-flex justify-content-between align-items-center">
              <h4 className="mb-0">📝 Liste des Dépenses</h4>
              <span className="badge bg-light text-success fs-6">
                Total : {totalDepenses.toFixed(2)}€
              </span>
            </div>
            <ul className="list-group list-group-flush">
              {depenses.length > 0 ? (
                depenses.map((depense) => (
                  <li key={depense.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                      <span className="fw-bold">{depense.description}</span>
                      <small className="text-muted">
                        {new Date(depense.date).toLocaleDateString()} - {depense.montant}€
                      </small>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(depense.id)}
                      title="Supprimer la dépense"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center text-muted py-4">
                  Aucune dépense enregistrée.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Depenses;