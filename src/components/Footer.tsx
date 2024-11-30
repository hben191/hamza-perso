function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>© {currentYear} Hamza Benbrahim.</p>
      <div className="mt-4">
        <a 
          href="https://www.linkedin.com/in/hbenbrahim/"
          target="_blank"
          className="text-indigo-400 hover:text-indigo-600 mr-4">
            LinkedIn
        </a>
        <a 
          href="https://github.com/hben191"
          target="_blank"
          className="text-indigo-400 hover:text-indigo-600">
            GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
