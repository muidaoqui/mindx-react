import React, {useState, useEffect} from "react";
import "../css/Admin.css";

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
        <div className="container">
            <h1>Car List</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="ID" value={carid} onChange={(e) => setCarid(e.target.value)} />
                <input type="text" placeholder="Name" value={carname} onChange={(e) => setCarname(e.target.value)} />
                <input type="text" placeholder="Model" value={carmodel} onChange={(e) => setCarmodel(e.target.value)} />
                <input type="text" placeholder="Price" value={carprice} onChange={(e) => setCarprice(e.target.value)} />
                <input type="text" placeholder="Seats" value={carseats} onChange={(e) => setCarseats(e.target.value)} />
                <input type="text" placeholder="Brand" value={carbrand} onChange={(e) => setCarbrand(e.target.value)} />
                <input type="file" accept="image/*" onChange={handleImageUpload} />

                {carImage && <img src={carImage} alt="Car Preview" width="100" />}

                <button type="submit">{editingIndex !== null ? "Update" : "Add"}</button>
            </form>
            <p style={{ color: msgColor }}>{message}</p>
            <table>
                <thead>
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
                <tbody>
                    {cars.map((car, index) => (
                        <tr key={index}>
                            <td>{car.carid}</td>
                            <td>{car.carname}</td>
                            <td>{car.carmodel}</td>
                            <td>{car.carprice}</td>
                            <td>{car.carseats}</td>
                            <td>{car.carbrand}</td>
                            <img src={car.carImage} alt={car.carname} width="100" />
                            <td>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarList;
