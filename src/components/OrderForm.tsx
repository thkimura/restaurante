import { useState, FormEvent, useCallback, useMemo } from 'react';
import environment from '../config/environment';

// Dados do menu
const recheios = [
  "Frango com Catupiry",
  "Calabresa com Queijo",
  "4 Queijos (Mussarela, Parmesão, Provolone e Catupiry)",
  "Presunto e Queijo",
  "Bacon com Queijo"
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
    useMemo(() => recheios.reduce((acc, recheio) => ({ ...acc, [recheio]: 0 }), {}), [])
  );
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  // Memoização do total de recheios selecionados
  const totalRecheiosSelecionados = useMemo(() => 
    Object.values(recheiosQuantidades).reduce((a, b) => a + b, 0), 
    [recheiosQuantidades]
  );

  // Handler para alteração de recheios com callback para evitar recriações
  const handleRecheioChange = useCallback((recheio: string, value: string) => {
    const novoValor = parseInt(value) || 0;
    if (novoValor < 0) return;
    
    const qtdTotal = parseInt(quantidade) || 0;
    if (qtdTotal === 0) return;
    
    const outrosRecheios = Object.entries(recheiosQuantidades)
      .filter(([key]) => key !== recheio)
      .reduce((sum, [_, val]) => sum + val, 0);

    if (novoValor >= 0 && (outrosRecheios + novoValor) <= qtdTotal) {
      setRecheiosQuantidades(prev => ({
        ...prev,
        [recheio]: novoValor
      }));
      setFormError(null);
    } else {
      setFormError(`A soma dos recheios não pode exceder a quantidade total (${qtdTotal}).`);
    }
  }, [recheiosQuantidades, quantidade]);

  // Handler para adicionar item ao carrinho
  const adicionarAoCarrinho = useCallback(() => {
    if (!pedido || !quantidade) {
      setFormError("Escolha um produto e a quantidade.");
      return;
    }

    // Validação específica para Pão Recheado
    if (pedido === "Pão Recheado") {
      if (totalRecheiosSelecionados === 0) {
        setFormError("Selecione pelo menos um recheio.");
        return;
      }
      
      if (totalRecheiosSelecionados !== Number(quantidade)) {
        setFormError(`A soma dos recheios deve ser igual a ${quantidade}`);
        return;
      }
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
    setFormError(null);
  }, [pedido, quantidade, totalRecheiosSelecionados, recheiosQuantidades]);

  // Cálculo do total do pedido
  const calcularTotal = useMemo(() => 
    itensPedido.reduce((total, item) => total + item.valorTotal, 0),
    [itensPedido]
  );

  // Handler para remover item
  const removerItem = useCallback((id: number) => {
    setItensPedido(prev => prev.filter(item => item.id !== id));
  }, []);

  // Handler para limpar formulário
  const limparFormulario = useCallback(() => {
    setPedido('');
    setQuantidade('');
    setRecheiosQuantidades(recheios.reduce((acc, recheio) => ({ ...acc, [recheio]: 0 }), {}));
  }, []);

  // Handler para submit do formulário
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    
    if (!nome) {
      setFormError('Por favor, informe seu nome');
      return;
    }
    
    if (itensPedido.length === 0) {
      setFormError('Por favor, adicione pelo menos um item ao pedido');
      return;
    }
    
    const phoneNumber = environment.WHATSAPP_NUMBER;
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
    
    message += `\n\n*VALOR TOTAL: R$ ${calcularTotal.toFixed(2)}*`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, [nome, itensPedido, calcularTotal]);

  return (
    <section className="bg-[#FFF3D6] py-16" id="pedido">
      <div className="container mx-auto px-4">
        <p className="text-orange-600 font-semibold mb-2">
          Peça sua encomenda aqui
        </p>
        <h2 className="text-4xl font-bold text-gray-700 mb-4">
          Encomende seu pedido favorito
        </h2>

        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="mb-4">
                <label htmlFor="nome" className="block text-gray-700 mb-1">Nome</label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="bg-[#FFF3D6] border-b border-gray-400 p-2 w-full max-w-xs mb-4 focus:outline-none focus:border-orange-600"
                />
              </div>

              <div className="bg-[#FFF3D6] p-4 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-orange-600">Adicionar Item</h3>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-full md:w-auto">
                    <label htmlFor="produto" className="block text-gray-700 mb-1">Produto</label>
                    <select 
                      id="produto"
                      value={pedido}
                      onChange={(e) => {
                        setPedido(e.target.value);
                        if (e.target.value !== "Pão Recheado") {
                          setRecheiosQuantidades(recheios.reduce((acc, recheio) => ({ ...acc, [recheio]: 0 }), {}));
                        }
                      }}
                      className="bg-[#FFF3D6] border-b border-gray-400 p-2 w-full md:w-64 focus:outline-none focus:border-orange-600 appearance-none"
                    >
                      <option value="" disabled>Escolha seu pedido</option>
                      {Object.entries(precos).map(([nome, valor]) => (
                        <option key={nome} value={nome}>
                          {nome} - R$ {valor.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {pedido && (
                    <div className="w-full md:w-auto">
                      <label htmlFor="quantidade" className="block text-gray-700 mb-1">
                        Quantidade ({pedido === "Nhoque de Batata" ? "kg" : "un"})
                      </label>
                      <input
                        id="quantidade"
                        type="number"
                        value={quantidade}
                        onChange={(e) => {
                          if (e.target.value === '' || parseInt(e.target.value) >= 0) {
                            setQuantidade(e.target.value);
                            if (pedido === "Pão Recheado") {
                              setRecheiosQuantidades(recheios.reduce((acc, recheio) => ({ ...acc, [recheio]: 0 }), {}));
                            }
                          }
                        }}
                        min="1"
                        className="bg-[#FFF3D6] border-b border-gray-400 p-2 w-32 text-center focus:outline-none focus:border-orange-600"
                      />
                    </div>
                  )}
                </div>

                {pedido && quantidade && parseInt(quantidade) > 0 && (
                  <button 
                    type="button"
                    onClick={adicionarAoCarrinho}
                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
                  >
                    Adicionar ao Pedido
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-6">
              {pedido === "Pão Recheado" && quantidade && parseInt(quantidade) > 0 && (
                <div className="bg-white rounded-lg p-4 shadow">
                  <h3 className="text-xl font-semibold mb-4 text-orange-600">Opções de Recheio</h3>
                  <p className="text-gray-700 font-semibold mb-2">
                    Distribua a quantidade de {quantidade} pães entre os recheios:
                    <span className="ml-2 text-orange-600">
                      {totalRecheiosSelecionados}/{quantidade}
                    </span>
                  </p>
                  <div className="grid grid-cols-1 gap-4">
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

              {itensPedido.length > 0 && (
                <div className="bg-white rounded-lg p-4 shadow">
                  <h3 className="text-xl font-semibold mb-4 text-orange-600">Itens do Pedido:</h3>
                  <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
                    {itensPedido.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-3">
                        <div className="flex-grow">
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
                          className="text-red-500 hover:text-red-700 ml-4"
                          aria-label="Remover item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xl font-bold text-gray-800 text-right">
                      Total do Pedido: R$ {calcularTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit"
            className="bg-orange-600 text-white px-8 py-3 rounded hover:bg-orange-700 transition-colors mt-6"
            disabled={itensPedido.length === 0}
          >
            Finalizar Pedido via WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;