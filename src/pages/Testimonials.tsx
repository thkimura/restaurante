import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import TestimonialCard from '../components/TestimonialCard';
import OrderForm from '../components/OrderForm';

// Importe os estilos do Swiper
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    quote: "Vou pedir de novo!",
    text: "O nhoque estava simplesmente divino!",
    author: "Marina K.",
    image: `/src/assets/images/avatarmarinak.jpg`
  },
  {
    quote: "Uma delícia.",
    text: "O nhoque de batata mais saboroso que já experimentei! A massa é macia e o molho é simplesmente divino.",
    author: "Matheus F.",
    image: `/src/assets/images/avatarmatheusf.jpg`
  },
  {
    quote: "Pao caseiro delicioso!",
    text: "Este pão caseiro é uma delícia! A casca é crocante e a miolo é macio e saboroso. É perfeito para um café da manhã ou lanche.",
    author: "Beatriz M.",
    image: `/src/assets/images/avatarbeatriz.jpg`
  },
  {
    quote: "Pudim de Leite Condensado com Caramelo",
    text: "Este pudim de leite condensado com caramelo é uma sobremesa extraordinaria! É doce na medida certa, cremoso e tem uma textura perfeita.",
    author: "Thalles K.",
    image: `/src/assets/images/avatarthallesk.jpg`
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
          
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard
                  quote={testimonial.quote}
                  text={testimonial.text}
                  author={testimonial.author}
                  image={testimonial.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <OrderForm />
    </>
  );
};

export default Testimonials;