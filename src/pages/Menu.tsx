const menuItems = [
  {
    title: "Nhoque de Batata",
    image: "/assets/images/img-nhoque.png"
  },
  {
    title: "Pães Caseiros",
    image: "/assets/images/img-pao.jpg"
  },
  {
    title: "Doces",
    image: "/assets/images/img-pudim.jpg"
  }
];

const Menu = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">Cardápio</h2>
        
        <div className="relative">
          {/* Faixa laranja de fundo */}
          <div className="absolute h-[60%] w-full rounded-lg bg-orange-600 bottom-0 -z-10" />
          
          {/* Grid de itens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {menuItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-white text-3xl font-semibold mb-2">{item.title}</h3>
                <button className="bg-[#B4540C] text-white px-5 py-2 rounded-md hover:bg-[#A34A0B] transition-colors inline-flex items-center">
                  <span className="ml-2">Ver mais →</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;  