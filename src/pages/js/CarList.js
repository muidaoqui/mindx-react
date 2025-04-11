import React, {useState, useEffect, useRef} from "react";
import { Star, StarHalf } from "lucide-react";

function CarList() {
    const [cars, setCars] = useState([]);
    const [carid, setCarid] = useState('');
    const [carname, setCarname] = useState('');
    const [carmodel, setCarmodel] = useState('');
    const [carprice, setCarprice] = useState('');
    const [carseats, setCarseats] = useState('');
    const [carbrand, setCarbrand] = useState('');
    const [carImage, setCarImage] = useState('');
    const [carDescription, setCarDescription] = useState('');
    const [carRating, setCarRating] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('red');

    useEffect(() => {
        const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
        setCars(storedCars);
    }, []);
    const handleEdit = (index) => {
        const car = cars[index];
        setCarid(car.carid);
        setCarname(car.carname);
        setCarmodel(car.carmodel);
        setCarprice(car.carprice);
        setCarseats(car.carseats);
        setCarbrand(car.carbrand);
        setCarDescription(car.carDescription);
        if (car.carImage) {
            setCarImage(car.carImage);
        }
        setEditingIndex(index);
    };
    const handleCancelEdit = () => {
        setCarid('');
        setCarname('');
        setCarmodel('');
        setCarprice('');
        setCarseats('');
        setCarbrand('');
        setCarImage('');
        setCarDescription('');
        setEditingIndex(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!carid || !carname || !carmodel || !carprice || !carseats || !carbrand || !carImage || !carDescription) {
            setMessage("Vui lòng điền đầy đủ thông tin.");
            setMsgColor('red');
            return;
        }

        let carsList = [...cars];

        if (editingIndex !== null) {
            carsList[editingIndex] = { carid, carname, carmodel, carprice, carseats, carbrand, carImage, carDescription,
            ratings: carsList[editingIndex].ratings || []
            };
            setMessage("Cập nhật thành công!");
        } else {
            if (carsList.find(car => car.carid === carid)) {
                setMessage("ID đã tồn tại.");
                setMsgColor('red');
                return;
            }
            carsList.push({ carid, carname, carmodel, carprice, carseats, carbrand, carImage, carDescription,
                ratings: []
            });
            setMessage("Thêm xe thành công!");
        }        
        

        setMsgColor('green');
        setCars(carsList);
        localStorage.setItem("cars", JSON.stringify(carsList));

        setCarid('');
        setCarname('');
        setCarmodel('');
        setCarprice('');
        setCarseats('');
        setCarbrand('');
        setCarImage('');
        setCarDescription('');
        setEditingIndex(null);
    };
    const handleDelete = (index) => {
        const newCars = cars.filter((car, i) => i !== index);
        setCars(newCars);
        localStorage.setItem("cars", JSON.stringify(newCars));
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCarImage(reader.result); // Lưu ảnh dưới dạng base64
            };
            reader.readAsDataURL(file);
        }
    };

    const [showForm, setShowForm] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const filteredCars = cars.filter(car => 
        car.carname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.carbrand.toLowerCase().includes(searchQuery.toLowerCase()) 
    );

    const calculateAverageRating = (carRating) => {
        if (!carRating || carRating.length === 0) return 0;
        const sum = carRating.reduce((acc, rating) => acc + rating, 0);
        return sum / carRating.length;
    };
    
    const StarRating = ({ rating }) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
        return (
            <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-current" />
                ))}
                {halfStar && <StarHalf className="text-yellow-500 fill-current" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={i + fullStars} className="text-gray-300" />
                ))}
            </div>
        );
    };
    
    const fileInputRef = useRef(null);
    const handleImport = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const newData = JSON.parse(event.target.result);
                    if (!Array.isArray(newData)) {
                        console.error("Dữ liệu không hợp lệ");
                        return;
                    }
                    const updatedCars = [...cars, ...newData]; 
                    setCars(updatedCars);
                    localStorage.setItem("cars", JSON.stringify(updatedCars)); 
                } catch (error) {
                    console.error("Lỗi khi đọc file JSON", error);
                }
            };
            reader.readAsText(file);
        }
    };
    

    return (
        <div className="w-full h-full mb-10">
            <h1 className="text-center font-bold text-2xl my-10 text-cyan-500">Quản Lý Xe</h1>
            <div className="relative flex mb-4 gap-4 justify-between mx-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-4">
                            {!showForm && (
                                <button 
                                    className="border-2 border-black rounded-xl h-10 px-4 bg-blue-500 text-white font-bold" 
                                    onClick={() => setShowForm(true)}
                                >
                                    Add Car
                                </button>
                            )}
                        </div>

                        {showForm && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center bg-white p-6 rounded-xl shadow-lg z-50 w-96">
                                    <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="ID" value={carid} onChange={(e) => setCarid(e.target.value)} />
                                    <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Name" value={carname} onChange={(e) => setCarname(e.target.value)} />
                                    <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Model" value={carmodel} onChange={(e) => setCarmodel(e.target.value)} />
                                    <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Price" value={carprice} onChange={(e) => setCarprice(e.target.value)} />
                                    <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Seats" value={carseats} onChange={(e) => setCarseats(e.target.value)} />
                                    <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Brand" value={carbrand} onChange={(e) => setCarbrand(e.target.value)} />
                                    <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Description" value={carDescription} onChange={(e) => setCarDescription(e.target.value)} />
                                    <input className="border-2 border-black rounded-xl h-10 p-2" type="file" accept="image/*" onChange={handleImageUpload} />

                                    {carImage && <img src={carImage} alt="Car Preview" width="100" />}

                                    <div className="flex justify-end mt-4">
                                        <button type="submit" className="border-2 border-black rounded-xl h-10 py-2 w-20 bg-green-500 font-bold mr-4">{editingIndex !== null ? "Cập nhật" : "Thêm" }</button>
                                        <button type="button" className="border-2 border-black rounded-xl h-10 py-2 w-20" onClick={() => setShowForm(false)}>Hủy</button>
                                    </div>

                                </form>
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-4">
                            <input
                            type="search"
                            placeholder="Tìm kiếm xe..."
                            className="border-2 border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <input 
                                type="file" 
                                accept=".json" 
                                ref={fileInputRef} 
                                style={{ display: "none" }} 
                                onChange={handleImport} 
                            />
                            <button 
                                className="border-2 border-black rounded-xl h-10 px-4 bg-blue-500 text-white font-bold" 
                                onClick={() => fileInputRef.current.click()}
                            >
                                Import
                            </button>
                        </div>
                        <div>
                            <button 
                                className="border-2 border-black rounded-xl h-10 px-4 bg-blue-500 text-white font-bold" 
                                onClick={() => setShowForm(true)}
                            >
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            
            <p style={{ color: msgColor }}>{message}</p>
            <div className="w-full border-2 border-black my-8 max-h-80 overflow-y-auto">

            </div>
            <table className="w-full border-2 border-black my-8 h-40 overflow-y-scroll">
                <thead className="bg-red-500 border-2 border-black">
                    <tr>
                        <th className="border-2 border-black">STT</th>
                        <th className="p-2 border-2 border-black">ID</th>
                        <th className="p-2 border-2 border-black">Name</th>
                        <th className="p-2 border-2 border-black">Model</th>
                        <th className="p-2 border-2 border-black">Price</th>
                        <th className="p-2 border-2 border-black">Seats</th>
                        <th className="p-2 border-2 border-black">Brand</th>
                        <th className="p-2 border-2 border-black">Image</th>
                        <th className="p-2 border-2 border-black">Rating</th>
                        <th className="p-2 border-2 border-black">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center my-4" key={''} onClick={() => setShowForm(true)}>
                    {filteredCars.length > 0 ? (
                        filteredCars.map((car, index) => (
                            <tr key={index} onClick={() => handleEdit(index)}>
                                <td className="border-2 border-black">{index + 1}</td>
                                <td className="border-2 border-black">{car.carid}</td>
                                <td className="border-2 border-black">{car.carname}</td>
                                <td className="border-2 border-black">{car.carmodel}</td>
                                <td className="border-2 border-black">{car.carprice}</td>
                                <td className="border-2 border-black">{car.carseats}</td>
                                <td className="border-2 border-black">{car.carbrand}</td>
                                <td className="border-2 border-black">
                                    <img src={car.carImage} alt={car.carname} width="100" />
                                </td>
                                <td className="border-2 border-black">
                                    <StarRating rating={calculateAverageRating(car.ratings)} />
                                </td>
                                <td className="border-2 border-black bg-red-500">
                                    <button className="w-full h-full" onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="p-2">Không có xe nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CarList;
