import AddToCartButton from './AddToCartButton';

export default function DealOfTheDay({ deal }) {
    return (
        <div className="flex flex-col md:flex-row items-center bg-gray-50 rounded-lg overflow-hidden">
            <img
                src={deal.image}
                alt={deal.name}
                width={500}
                height={300}
                className="w-full md:w-1/2 object-cover"
            />
            <div className="p-6 flex-1">
                <h3 className="text-2xl font-semibold mb-2">{deal.name}</h3>
                <p className="text-gray-700 mb-4">{deal.description}</p>
                <p className="text-xl font-bold text-red-600 mb-6">${deal.price}</p>
                <AddToCartButton product={deal} />
            </div>
        </div>
    );
}
