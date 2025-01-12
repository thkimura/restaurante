interface MenuCardProps {
  title: string;
  description: string;
  image: string;
}

const MenuCard = ({ title, description, image }: MenuCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <img src={image} alt={title} className="w-full h-auto" />
    </div>
  );
};

export default MenuCard;
  
