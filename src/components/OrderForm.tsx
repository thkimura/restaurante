import { useState, FormEvent } from 'react';

const recheios = [
  "Frango com Catupiry",
  "Calabresa com Queijo",
  "Presunto e Queijo"
];

const precos = {
  "Nhoque de Batata": 20.00,
  "Pão Caseiro": 25.00,
  "Pão Recheado": 35.00,
  "Pudim": 35.00
};

interface ItemPedido {
  id: number;
  produto: string;
  quantidade: number;
  recheios?: Record<string, number>;
  valorUnitario: number;
  valorTotal: number;
}

const OrderForm = () => {
  const [nome, setNome] = useState('');
  const [pedido, setPedido] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [recheiosQuantidades, setRecheiosQuantidades] = useState<Record<string, number>>(
    recheios.reduce((acc, recheio) => ({ ...acc, [recheio]: 0 }), {})
  );
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);

  const totalRecheiosSelecionados = Object.values(recheiosQuantidades).reduce((a, b) => a + b, 0);

  const handleRecheioChange = (recheio: string, value: string) => {
    const novoValor = parseInt(value) || 0;
    const outrosRecheios = Object.entries(recheiosQuantidades)
      .filter(([key]) => key !== recheio)
      .reduce((sum, [_, val]) => sum + val, 0);

    if (novoValor >= 0 && (outrosRecheios + novoValor) <= Number(quantidade)) {
      setRecheiosQuantidades(prev => ({
        ...prev,
        [recheio]: novoValor
      }));
    }
  };

  const adicionarAoCarrinho = () => {
    if (pedido === "Pão Recheado" && totalRecheiosSelecionados !== Number(quantidade)) {
      alert(`A soma dos recheios deve ser igual a ${quantidade}`);
      return;
    }

    const valorUnitario = precos[pedido as keyof typeof precos];
    const valorTotal = valorUnitario * Number(quantidade);

    const novoItem: ItemPedido = {
      id: Date.now(),
      produto: pedido,
      quantidade: Number(quantidade),
      valorUnitario,
      valorTotal,
      ...(pedido === "Pão Recheado" && { recheios: recheiosQuantidades })
    };

    setItensPedido(prev => [...prev, novoItem]);
    limparFormulario();
  };

  const calcularTotal = () => {
    return itensPedido.reduce((total, item) => total + item.valorTotal, 0);
  };

  const removerItem = (id: number) => {
    setItensPedido(prev => prev.filter(item => item.id !== id));
  };

  const limparFormulario = () => {
    setPedido('');
    setQuantidade('');
    setRecheiosQuantidades(recheios.reduce((acc, recheio) => ({ ...acc, [recheio]: 0 }), {}));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!nome || itensPedido.length === 0) {
      alert('Por favor, adicione pelo menos um item ao pedido');
      return;
    }
    
    const phoneNumber = "5511930209535";
    let message = `Olá, me chamo ${nome}! Gostaria de fazer o seguinte pedido\n\n`;
    message += `*PEDIDO:*\n`;
    
    itensPedido.forEach((item, index) => {
      const unidade = item.produto === "Nhoque de Batata" ? "kg" : "un";
      message += `\n${index + 1}) ${item.quantidade} ${unidade} - ${item.produto}`;
      
      if (item.recheios) {
        const recheiosSelecionados = Object.entries(item.recheios)
          .filter(([_, qty]) => qty > 0)
          .map(([recheio, qty]) => `   • ${qty}x ${recheio}`);
        
        if (recheiosSelecionados.length > 0) {
          message += `\n${recheiosSelecionados.join('\n')}`;
        }
      }
    });
    
    message += `\n\n*VALOR TOTAL: R$ ${calcularTotal().toFixed(2)}*`;
    
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

        <form onSubmit={handleSubmit} className="max-w-4xl">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="bg-[#FFF3D6] border-b border-gray-400 p-2 w-[200px] mb-4 ml-4 focus:outline-none focus:border-orange-600"
          />

          <div className="bg-[#FFF3D6] rounded-lg p-4 mb-6">
            <div className="relative mb-4">
              <select 
                value={pedido}
                onChange={(e) => {
                  setPedido(e.target.value);
                  if (e.target.value !== "Pão Recheado") {
                    setRecheiosQuantidades(recheios.reduce((acc, recheio) => ({ ...acc, [recheio]: 0 }), {}));
                  }
                }}
                required={itensPedido.length === 0}
                className="bg-[#FFF3D6] border-b border-gray-400 p-2 w-[200px] mr-4 focus:outline-none focus:border-orange-600 appearance-none"
              >
                <option value="" disabled>Escolha seu pedido</option>
                {Object.entries(precos).map(([nome, valor]) => (
                  <option key={nome} value={nome}>
                    {nome} - R$ {valor.toFixed(2)}
                  </option>
                ))}
              </select>

              {pedido && (
                <input
                  type="number"
                  value={quantidade}
                  onChange={(e) => {
                    if (e.target.value.length <= 2) {
                      setQuantidade(e.target.value);
                      if (pedido === "Pão Recheado") {
                        setRecheiosQuantidades(recheios.reduce((acc, recheio) => ({ ...acc, [recheio]: 0 }), {}));
                      }
                    }
                  }}
                  min="1"
                  required={itensPedido.length === 0}
                  className="bg-[#FFF3D6] border-b border-gray-400 p-2 w-[40px] text-center focus:outline-none focus:border-orange-600"
                />
              )}
              
              <span className="absolute top-2 ml-2">
                {pedido && (pedido === "Nhoque de Batata" ? "kg" : "un")}
              </span>
            </div>

            {pedido === "Pão Recheado" && quantidade && (
              <div className="mb-4">
                <p className="text-gray-700 font-semibold mb-2">
                  Distribua a quantidade de {quantidade} pães entre os recheios:
                  <span className="ml-2 text-orange-600">
                    {totalRecheiosSelecionados}/{quantidade}
                  </span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recheios.map((recheio) => (
                    <div 
                      key={recheio} 
                      className="flex items-center gap-3 p-2 border-b border-gray-200"
                    >
                      <label className="flex-grow text-gray-600">{recheio}</label>
                      <input
                        type="number"
                        min="0"
                        max={Number(quantidade)}
                        value={recheiosQuantidades[recheio]}
                        onChange={(e) => handleRecheioChange(recheio, e.target.value)}
                        className="w-16 bg-[#FFF3D6] border-b border-gray-400 p-2 text-center focus:outline-none focus:border-orange-600"
                      />
                    </div>
                  ))}
                </div>
                {totalRecheiosSelecionados !== Number(quantidade) && (
                  <p className="text-orange-600 text-sm mt-2">
                    {totalRecheiosSelecionados < Number(quantidade)
                      ? `Faltam ${Number(quantidade) - totalRecheiosSelecionados} pães para distribuir`
                      : `Excesso de ${totalRecheiosSelecionados - Number(quantidade)} pães distribuídos`}
                  </p>
                )}
              </div>
            )}

            {pedido && quantidade && (
              <button 
                type="button"
                onClick={adicionarAoCarrinho}
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
              >
                Adicionar ao Pedido
              </button>
            )}
          </div>

          {itensPedido.length > 0 && (
            <div className="bg-white rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Itens do Pedido:</h3>
              {itensPedido.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-2">
                  <div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">
                        {item.quantidade} {item.produto === "Nhoque de Batata" ? "kg" : "un"} de {item.produto}
                      </p>
                      <p className="text-gray-600">
                        R$ {item.valorUnitario.toFixed(2)} {item.produto === "Nhoque de Batata" ? "/kg" : "/un"}
                      </p>
                    </div>
                    {item.recheios && Object.entries(item.recheios)
                      .filter(([_, qty]) => qty > 0)
                      .map(([recheio, qty]) => (
                        <p key={recheio} className="text-sm text-gray-600 ml-4">
                          {qty}x {recheio}
                        </p>
                      ))
                    }
                    <p className="text-orange-600 font-medium mt-1">
                      Subtotal: R$ {item.valorTotal.toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removerItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remover
                  </button>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xl font-bold text-gray-800 text-right">
                  Total do Pedido: R$ {calcularTotal().toFixed(2)}
                </p>
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="bg-orange-600 text-white px-8 py-3 rounded hover:bg-orange-700 transition-colors"
          >
            Finalizar Pedido
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderForm; 