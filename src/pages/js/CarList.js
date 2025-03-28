import React, {useState, useEffect} from "react";

function CarList() {
    const [cars, setCars] = useState([]);
    const [carid, setCarid] = useState('');
    const [carname, setCarname] = useState('');
    const [carmodel, setCarmodel] = useState('');
    const [carprice, setCarprice] = useState('');
    const [carseats, setCarseats] = useState('');
    const [carbrand, setCarbrand] = useState('');
    const [carImage, setCarImage] = useState('');
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
        setCarImage(car.carImage);
        setEditingIndex(index);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!carid || !carname || !carmodel || !carprice || !carseats || !carbrand || !carImage) {
            setMessage("Vui lòng điền đầy đủ thông tin.");
            setMsgColor('red');
            return;
        }

        let carsList = [...cars];

        if (editingIndex !== null) {
            carsList[editingIndex] = { carid, carname, carmodel, carprice, carseats, carbrand, carImage };
            setMessage("Cập nhật thành công!");
        } else if (carsList.find(car => car.carid === carid)) {
            setMessage("ID đã tồn tại.");
            setMsgColor('red');
            return;
        }
        carsList.push({ carid, carname, carmodel, carprice, carseats, carbrand, carImage });
        setMessage("Thêm xe thành công!");

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
    return (
        <div className="w-full h-full mb-10">
            <h1 className="text-center font-bold text-2xl my-10 text-cyan-500">Quản Lý Xe</h1>
            <form onSubmit={handleSubmit}>
                <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="ID" value={carid} onChange={(e) => setCarid(e.target.value)} />
                <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Name" value={carname} onChange={(e) => setCarname(e.target.value)} />
                <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Model" value={carmodel} onChange={(e) => setCarmodel(e.target.value)} />
                <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Price" value={carprice} onChange={(e) => setCarprice(e.target.value)} />
                <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Seats" value={carseats} onChange={(e) => setCarseats(e.target.value)} />
                <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Brand" value={carbrand} onChange={(e) => setCarbrand(e.target.value)} />
                <input className="border-2 border-black rounded-xl h-10 p-2" type="file" accept="image/*" onChange={handleImageUpload} />

                {carImage && <img src={carImage} alt="Car Preview" width="100" />}

                <div className="flex justify-end mt-4">
                    <button type="submit" className="border-2 border-black rounded-xl h-10 py-2 w-20 bg-green-500 font-bold mr-4">{editingIndex !== null ? "Cập nhật" : "Thêm" }</button>
                    {editingIndex !== null && <button type="button" className="border-2 border-black rounded-xl h-10 py-2 w-20" onClick={() => setEditingIndex(null)}>Hủy</button>}
                </div>

            </form>
            <p style={{ color: msgColor }}>{message}</p>
            <table className="w-full border-2 border-black my-8 h-40 overflow-y-scroll">
                <thead className="bg-red-500 border-2 border-black">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Price</th>
                        <th>Seats</th>
                        <th>Brand</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-center my-4">
                    {cars.map((car, index) => (
                        <tr
                            className="border-2 border-black cursor-pointer hover:bg-gray-200"
                            key={index}
                            onClick={() => handleEdit(index)} // Khi click vào hàng thì hiển thị thông tin lên form
                        >
                            <td className="border-2 border-black">{car.carid}</td>
                            <td className="border-2 border-black">{car.carname}</td>
                            <td className="border-2 border-black">{car.carmodel}</td>
                            <td className="border-2 border-black">{car.carprice}</td>
                            <td className="border-2 border-black">{car.carseats}</td>
                            <td className="border-2 border-black">{car.carbrand}</td>
                            <td className="border-2 border-black">
                                <img src={car.carImage} alt={car.carname} width="100" />
                            </td>
                            <td className="border-2 border-black bg-red-500">
                                <button className="w-full h-full" onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default CarList;
