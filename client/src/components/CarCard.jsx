function CarCard({ car }) {
    return (
      <div className="border p-4 rounded shadow">
        <img src={car.image} alt={car.model} className="w-full h-40 object-cover rounded mb-4" />
        <h2 className="text-xl font-bold">{car.model}</h2>
        <p className="text-gray-600">{car.description}</p>
        <p className="text-green-600 font-bold mt-2">{car.price} \u20ac/jour</p>
        <button className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
          Réserver
        </button>
      </div>
    );
  }
  
  export default CarCard;
  