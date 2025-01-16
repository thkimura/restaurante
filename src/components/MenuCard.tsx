interface MenuCardProps {
  title: string;
  description: string;
  image: string;
}

const MenuCard = ({ title, description, image }: MenuCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-orange-100 cursor-pointer overflow-hidden">
      <div className="h-72 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );  
};

export default MenuCard;
  
