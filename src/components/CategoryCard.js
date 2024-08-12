
export default function CategoryCard({ category }) {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
                src={category.imageUrl}
                alt={category.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
        </div>
    );
}
