
interface TestimonialCardProps {
  quote: string;
  author: string;
}

const TestimonialCard = ({ quote, author }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-orange-600 font-semibold mb-4">{quote}</p>
      <p className="text-gray-600 mb-4">{author}</p>
    </div>
  );
};

export default TestimonialCard;
