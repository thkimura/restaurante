import { useState, useEffect } from 'react';
import ProductModal from '../components/ProductModal';

const menuItems = [
  {
    title: "Nhoque de Batata",
    image: "/assets/images/img-nhoque.png",
    description: "Nhoque caseiro feito com batatas selecionadas, preparado com muito carinho e seguindo a tradicional receita italiana. **Não acompanha molho.**",
    price: "R$ 20,00/kg"
  },
  {
    title: "Pão Caseiro",
    image: "/assets/images/img-pao.jpg",
    description: "Pão artesanal feito com ingredientes naturais, fermentação natural e assado na hora. Crocante por fora e macio por dentro.",
    price: "R$ 25,00/unidade"
  },
  {
    title: "Pudim",
    image: "/assets/images/img-pudim.jpg",
    description: "Pudim cremoso feito com leite condensado de primeira qualidade, ovos frescos e calda de caramelo caseira.",
    price: "R$ 35,00/unidade"
  }
];

const Menu = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const menuSection = document.getElementById('cardapio');
    if (menuSection) {
      observer.observe(menuSection);
    }

    return () => {
      if (menuSection) {
        observer.unobserve(menuSection);
      }
    };
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold text-gray-800 text-center mb-16 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          Cardápio
        </h2>
        
        <div className="relative">
          <div className="absolute h-full md:h-[75%] w-full bg-orange-600 bottom-0 -z-10 left-1/2 transform -translate-x-1/2 gap-2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-32 p-8">
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center transition-all duration-1000 transform ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-white text-3xl font-semibold mb-2">{item.title}</h3>
                <button 
                  onClick={() => setSelectedProduct(index)}
                  className="bg-[#B4540C] text-white px-5 py-2 rounded-md hover:bg-[#A34A0B] transition-colors inline-flex items-center"
                >
                  <span className="ml-2">Ver mais →</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProduct !== null && (
        <ProductModal
          isOpen={true}
          onClose={() => setSelectedProduct(null)}
          product={menuItems[selectedProduct]}
        />
      )}
    </section>
  );
};

export default Menu;  