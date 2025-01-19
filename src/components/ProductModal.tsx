import Modal from "./Modal";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    image: string;
    description: string;
    price: string;
  };
}

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h3>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-2xl font-semibold text-orange-600 mb-6">{product.price}</p>
            <button 
              onClick={() => window.location.href = '#depoimentos'}
              className="bg-orange-600 text-white px-8 py-3 rounded hover:bg-orange-700 transition-colors"
            >
              Fazer Pedido
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal; 