import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Gari Naka</Link>
        <div className="flex gap-4">
          <Link to="/login" className="hover:underline">Connexion</Link>
          <Link to="/register" className="hover:underline">S'inscrire</Link>
          <Link to="/cgu" className="hover:underline">CGU</Link>
          <Link to="/politique-confidentialite" className="hover:underline">Confidentialité</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
