import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-primary bg-gradient text-white">
            <div className="card text-center p-5 shadow-lg border-0 rounded-4" style={{ maxWidth: '600px' }}>
                <div className="card-body bg-white text-dark rounded-3">
                    <h1 className="card-title display-3 fw-bold mb-3">
                        Bienvenue chez <span className="text-warning">MyBank</span> !
                    </h1>
                    <p className="card-text lead mb-4">
                        Gérez vos finances en toute simplicité et en toute sécurité.
                    </p>
                    <Link to="/register" className="btn btn-warning btn-lg fw-bold w-100 mt-3">
                        Créer un compte
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;