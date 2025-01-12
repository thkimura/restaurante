import { FC } from 'react';
import TestimonialCard from '../components/TestimonialCard';

const testimonials = [
  {
    quote: "O nhoque de batata mais saboroso que já experimentei!",
    author: "Maria K."
  },
  {
    quote: "Este pudim de leite condensado é uma explosão de sabores!",
    author: "Rafael C."
  },
  {
    quote: "Este pão caseiro é uma delícia!",
    author: "Thalles K."
  }
];

const Testimonials: FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">O que as pessoas disseram?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;