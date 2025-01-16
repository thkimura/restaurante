import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      const homeSectionHeight = homeSection?.offsetHeight || 0;
      const currentScrollY = window.scrollY;

      // Oculta navbar quando passar da seção home e estiver scrollando para baixo
      setIsVisible(currentScrollY < homeSectionHeight || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed w-full bg-black/60 backdrop-blur-sm z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <ul className="flex justify-center space-x-8 p-4">
        <li>
          <a href="#home" className="text-white hover:text-orange-500 transition-colors duration-300">
            Home
          </a>
        </li>
        <li>
          <a href="#cardapio" className="text-white hover:text-orange-500 transition-colors duration-300">
            Cardápio
          </a>
        </li>
        <li>
          <a href="#depoimentos" className="text-white hover:text-orange-500 transition-colors duration-300">
            Depoimentos
          </a>
        </li>
        <li>
          <a href="#contato" className="text-white hover:text-orange-500 transition-colors duration-300">
            Contato
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 