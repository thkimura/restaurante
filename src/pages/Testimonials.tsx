import OrderForm from '../components/OrderForm';

const testimonials = [
  {
    quote: "Vou pedir de novo!",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    author: "Angela C."
  },
  {
    quote: "Uma delícia.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    author: "Katia O."
  },
  {
    quote: "Nhoque incrível!",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    author: "Roberto E."
  }
];

const Testimonials = () => {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-700 text-center mb-12">
            O que as pessoas disseram?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded">
                <p className="text-orange-600 font-bold mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {testimonial.text}
                </p>
                <p className="text-gray-700">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-orange-600 text-white px-8 py-3 hover:bg-orange-700 transition-colors">
              Peça sua encomenda também!
            </button>
          </div>
        </div>
      </section>
      <OrderForm />
    </>
  );
};

export default Testimonials;