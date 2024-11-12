import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${isScrolled ? 'bg-black' : 'bg-transparent'} transition-colors duration-300`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between">
        <Link to="/" className="text-white font-semibold text-xl">
          Hamza Benbrahim
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Accueil</Link>
          <Link to="/about" className="text-gray-300 hover:text-white">À propos</Link>
          <Link to="/projects" className="text-gray-300 hover:text-white">Projets</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
