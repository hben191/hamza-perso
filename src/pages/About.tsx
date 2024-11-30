import { useState, useEffect } from "react";
import cvFile from "/src/assets/pdf/cv_hamza_benbrahim.pdf";

function About() {
  const [profilePic, setProfilePic] = useState("");
  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USER;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2014;

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.avatar_url) {
          setProfilePic(data.avatar_url);
        }
      })
      .catch((error) => console.error("Erreur lors du chargement de l'image :", error));
  }, [GITHUB_USERNAME]);

  return (
    <main className="min-h-screen pt-24 flex justify-center items-center">
      <div className="text-center max-w-4xl">
        {profilePic && (
          <img
            src={profilePic}
            alt="Photo"
            className="w-32 h-32 rounded-full mx-auto mb-6"
          />
        )}

        <h2 className="text-3xl font-semibold mb-6 text-white">À propos de moi</h2>
        
        <p className="text-lg text-gray-200">
          Je suis un développeur avec plus de 
          {yearsOfExperience} ans d'expérience, 
          spécialisé en PHP et Symfony.
        </p>
        <p className="text-lg text-gray-200">
          Mon objectif est de créer des applications performantes et évolutives.
        </p>

        <a
          href={cvFile}
          download
          className="relative group mt-4 inline-block text-white font-semibold py-2 px-4 rounded overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                        transform scale-110 opacity-0 transition duration-500 
                        group-hover:opacity-100 group-hover:scale-100"></span>
          <span className="relative z-10">Télécharger mon CV</span>
        </a>
      </div>
    </main>
  );
}

export default About;
