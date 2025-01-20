interface TestimonialCardProps {
  quote: string;
  text: string;
  author: string;
  image: string;
  rating: number;
}

const TestimonialCard = ({ quote, text, author, image, rating }: TestimonialCardProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded h-full">
      <p className="text-orange-600 font-bold mb-4">"{quote}"</p>
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
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
