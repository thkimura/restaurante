interface TestimonialCardProps {
  quote: string;
  text: string;
  author: string;
  image: string;
}

const TestimonialCard = ({ quote, text, author, image }: TestimonialCardProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded h-full">
      <p className="text-orange-600 font-bold mb-4">"{quote}"</p>
      <p className="text-gray-600 text-sm mb-4">{text}</p>
      <div className="flex items-center gap-3">
        <img 
          src={image} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <p className="text-gray-700 font-medium">{author}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
