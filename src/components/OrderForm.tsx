import { useState, FormEvent } from 'react';

const OrderForm = () => {
  const [nome, setNome] = useState('');
  const [pedido, setPedido] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    

    const phoneNumber = "5511930209535";
    
    // Mensagem formatada
    const message = `Olá, me chamo ${nome} e gostaria de fazer um pedido de ${pedido}`;
    

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    

    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="bg-[#FFF3D6] py-16">
      <div className="container mx-auto px-4">
        <p className="text-orange-600 font-semibold mb-2">
          Peça sua encomenda aqui
        </p>
        <h2 className="text-4xl font-bold text-gray-700 mb-4">
          Encomende seu pedido favorito
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="bg-[#FFF3D6] border-b border-gray-400 p-2 focus:outline-none focus:border-orange-600"
            />
          </div>
          
          <div className="relative mb-4">
            <select 
              value={pedido}
              onChange={(e) => setPedido(e.target.value)}
              required
              className="w-full bg-[#FFF3D6] border-b border-gray-400 p-2 focus:outline-none focus:border-orange-600 appearance-none"
            >
              <option value="" disabled>Escolha seu pedido</option>
              <option value="Nhoque de Batata">Nhoque de Batata</option>
              <option value="Pães Caseiros">Pães Caseiros</option>
              <option value="Doces">Doces</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button 
            type="submit"
            className="bg-orange-600 text-white px-8 py-3 rounded hover:bg-orange-700 transition-colors"
          >
            Enviar Pedido
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderForm; 