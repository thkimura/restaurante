import { useState } from 'react';
import Menu from './Menu';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Modal from '../components/Modal';
import OrderForm from '../components/OrderForm';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="min-h-screen flex flex-col">
        <div className="flex-grow bg-cover bg-center relative">
          <div className="absolute inset-0">
            <img 
              src="/assets/images/bg-home.jpeg" 
              alt="Background" 
              className="w-full h-full object-cover brightness-50 fixed -z-50"
            />
          </div>

          <div className="relative z-10 flex items-center justify-center h-[calc(100vh-200px)] animate-fade-in ">
            <div className="text-center">
              <img 
                src="/assets/images/logo.png" 
                alt="Sabor Caseiro" 
                className="w-[500px] mx-auto mb-12"
              />
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-600 text-white px-12 py-4 rounded-md hover:bg-orange-700 transition-colors text-lg relative top-12"
              >
                Peça a sua encomenda aqui!
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white relative z-10 py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-slide-up">
                <img 
                  src="/assets/images/icon-nhoque.png" 
                  alt="Qualidade" 
                  className="w-128 h-128 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Comida de qualidade</h3>
                <p className="text-gray-600">Ingredientes selecionados para seu prazer</p>
              </div>
              <div className="text-center animate-slide-up-delay-1">
                <img 
                  src="/assets/images/icon-sabor.png" 
                  alt="Sabor" 
                  className="w-128 h-128 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Sabor Incomparável</h3>
                <p className="text-gray-600">Receitas exclusivas e deliciosas</p>
              </div>
              <div className="text-center animate-slide-up-delay-2">
                <img 
                  src="/assets/images/icon-entrega.png" 
                  alt="Entrega" 
                  className="w-128 h-128 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Entrega pontual</h3>
                <p className="text-gray-600">Seu pedido no horário combinado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OrderForm />
      </Modal>

      <div className="bg-white relative z-10">
        <section id="cardapio">
          <Menu />
        </section>

        <section id="depoimentos">
          <Testimonials />
        </section>
      </div>

      <section id="contato">
        <Footer />
      </section>
    </>
  );
};

export default Home; 