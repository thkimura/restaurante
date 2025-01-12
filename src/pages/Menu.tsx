import MenuCard from '../components/MenuCard';

const menuItems = [
  {
    title: "Nhoque de Batata",
    description: "Nhoque caseiro com molho especial",
    image: "/assets/images/img-nhoque.png"
  },
  {
    title: "Pães Caseiros",
    description: "Pães frescos e artesanais",
    image: "./public/assets/images/img-pao.jpg"
  },
  {
    title: "Pudim",
    description: "Pudim cremoso tradicional",
    image: "./public/assets/images/img-pudim.jpg"
  }
];

const Menu = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Cardápio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <MenuCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;  