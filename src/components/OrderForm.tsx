import { useState, FormEvent } from 'react';

const OrderForm = () => {
  const [nome, setNome] = useState('');
  const [pedido, setPedido] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = "5511930209535";
    const unidade = pedido === "Nhoque de Batata" ? "KG" : "UN";
    
    // Mensagem formatada com unidade
    const message = `Olá, me chamo ${nome} e gostaria de fazer um pedido de ${quantidade} ${unidade} de ${pedido}`;
    
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
              className="bg-[#FFF3D6] border-b border-gray-400 p-2 w-[200px] focus:outline-none focus:border-orange-600"
            />
          </div>

          
          <div className="relative mb-4">
            <select 
              value={pedido}
              onChange={(e) => setPedido(e.target.value)}
              required
              className="bg-[#FFF3D6] border-b border-gray-400 p-2 w-[200px] mr-4 focus:outline-none focus:border-orange-600 appearance-none"
            >
              <option value="" disabled>Escolha seu pedido</option>
              <option value="Nhoque de Batata">Nhoque de Batata</option>
              <option value="Pão Caseiro">Pão Caseiro</option>
              <option value="Pudim">Pudim</option>
            </select>

            <input
              type="number"
              value={quantidade}
              onChange={(e) => {
                if (e.target.value.length <= 2) {
                  setQuantidade(e.target.value);
                }
              }}
              min="1"
              required
              className="bg-[#FFF3D6] border-b border-gray-400 p-2 w-[40px] text-center focus:outline-none focus:border-orange-600"
            />
            <span className="absolute top-2">
              {pedido === "Nhoque de Batata" ? "kg" : "un"}
            </span>
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