import Menu from './Menu';
import Testimonials from './Testimonials';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-cover bg-center relative">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/bg-home.jpeg" 
            alt="Background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center min-h-screen relative z-10">
          <img 
            src="/assets/images/logo.png" 
            alt="Sabor Caseiro" 
            className="w-128 md:w-128 mx-auto mb-8"
          />
          <button className="bg-orange-600 text-white px-8 py-3 rounded-md hover:bg-orange-700 transition-colors mt-8">
            <a href="https://wa.me/5511930209535">Peça a sua encomenda aqui!</a>
          </button>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="/assets/images/icon-nhoque.png" alt="Qualidade" className="w-94 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comida de qualidade</h3>
              <p className="text-gray-600">Ingredientes selecionados para seu prazer</p>
            </div>
            <div className="text-center">
              <img src="/assets/images/icon-sabor.png" alt="Sabor" className="w-94 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sabor Incomparável</h3>
              <p className="text-gray-600">Receitas exclusivas e deliciosas</p>
            </div>
            <div className="text-center">
              <img src="/assets/images/icon-entrega.png" alt="Entrega" className="w-94 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Entrega pontual</h3>
              <p className="text-gray-600">Seu pedido no horário combinado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="cardapio">
        <Menu />
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos">
        <Testimonials />
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 bg-white">
        <Footer />
      </section>
    </>
  );
};

export default Home; 