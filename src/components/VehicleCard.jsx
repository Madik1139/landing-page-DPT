const VehicleCard = ({ name, image, description, price }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300">
        <img src={image} alt={name} className="w-full h-48 lg:h-72 2xl:h-96 object-cover hover:scale-105" />
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-teal-700">{name}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-lg font-bold text-emerald-600">
                Rp {price.toLocaleString()} / hari
            </p>
        </div>
    </div>
);

export default VehicleCard;