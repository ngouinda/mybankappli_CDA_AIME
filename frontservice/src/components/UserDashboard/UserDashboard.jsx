import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [User, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Non authentifié. Redirection...");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/secure", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else if (response.status === 401 || response.status === 403) {
          setError("Token invalide ou expiré. Redirection...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError("Erreur serveur.");
        }
      } catch (err) {
        setError("Erreur réseau.");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow rounded-4 p-4">
            <h2 className="text-center mb-4">Tableau de bord</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {User ? (
              <>
                <div className="alert alert-success">
                  Bienvenue, <strong>{User}</strong> 🎉
                </div>
                <div className="d-grid mt-3">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Se déconnecter
                  </button>
                </div>
              </>
            ) : !error ? (
              <div className="text-center">Chargement...</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
