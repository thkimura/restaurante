import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Redes Sociais */}
          <div>
            <img 
              src="/assets/images/logo.png" 
              alt="Sabor Caseiro" 
              className="w-48 mb-4"
            />
            <div>
              <p className="mb-2">Redes Sociais</p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/1A4tuLTXaN/" className="hover:text-orange-200 transition-colors">
                  <FaFacebook size={24} />
                </a>
                <a href="https://www.instagram.com/wilsonfernandes214/" className="hover:text-orange-200 transition-colors">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-bold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-orange-200 transition-colors">Home</a></li>
              <li><a href="#cardapio" className="hover:text-orange-200 transition-colors">Cardápio</a></li>
              <li><a href="#depoimentos" className="hover:text-orange-200 transition-colors">Depoimentos</a></li>
              <li><a href="#contato" className="hover:text-orange-200 transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <div className="space-y-2">
              <p>Via WhatsApp</p>
              <a href="https://wa.me/5511930209535">11 93020-9535</a>
              <p className="mt-4">Email</p>
              <p>saborcaseiro@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 