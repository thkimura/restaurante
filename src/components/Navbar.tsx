import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="fixed w-full bg-black/50 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex justify-center space-x-8 md:space-x-12">
          <li><Link to="/" className="text-white hover:text-orange-600">Home</Link></li>
          <li><Link to="/cardapio" className="text-white hover:text-orange-600">Cardápio</Link></li>
          <li><Link to="/depoimentos" className="text-white hover:text-orange-600">Depoimentos</Link></li>
          <li><Link to="/contato" className="text-white hover:text-orange-600">Contato</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar; 