import { useState } from 'react';
import { Link } from 'react-router-dom';

function MainContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    setMousePosition({ x, y });
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="night-sky min-h-screen relative z-10 pt-24 flex justify-center items-center overflow-hidden"
    >
      <div className="relative z-10 p-8 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-white mb-4 tracking-wide">
          Développeur PHP Symfony Senior
        </h1>
        <p className="text-lg text-gray-200 mb-6 leading-relaxed">
          Passionné par le développement web, 
          j'aide les entreprises à créer des 
          solutions performantes et évolutives 
          avec PHP et Symfony.
        </p>
        <Link to="/projects"
          className="relative group mt-4 inline-block text-white font-semibold py-2 px-4 rounded overflow-hidden"
        >
          <span className="absolute 
                      inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                      transform scale-110 opacity-0 transition duration-500 
                      group-hover:opacity-100 group-hover:scale-100"></span>
          <span className="relative z-10">Voir mes projets</span>
        </Link>
        <Link to="/about"
          className="relative group mt-4 inline-block text-white font-semibold py-2 px-4 rounded overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-110 opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-100"></span>
          <span className="relative z-10">À propos de moi</span>
        </Link>
      </div>

      <div
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x * 80}% ${mousePosition.y * 80}%, rgba(63, 94, 251, 0.4), transparent),
            radial-gradient(circle at ${mousePosition.x * 20}% ${mousePosition.y * 20}%, rgba(252, 70, 107, 0.3), transparent),
            radial-gradient(circle at ${50 - mousePosition.x * 30}% ${50 - mousePosition.y * 30}%, rgba(255, 204, 0, 0.2), transparent)
          `,
          transform: `scale(1.05)`,
        }}
      ></div>
    </main>
  );
}

export default MainContent;
