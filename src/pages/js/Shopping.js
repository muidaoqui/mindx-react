import React, { useState, useEffect } from "react";

function Shopping() {
    const defaultCars = [
        { productid: "1", productname: "Toyota Camry", productprice: 1000000, productbrand: "Toyota", quantity: 1 },
        { productid: "2", productname: "Honda Civic", productprice: 900000, productbrand: "Honda", quantity: 1 },
        { productid: "3", productname: "Ford Ranger", productprice: 1200000, productbrand: "Ford", quantity: 1 }
    ];

    const [products, setProducts] = useState(() => {
        return JSON.parse(localStorage.getItem("products")) || defaultCars;
    });

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const handleAdd = (product) => {
        const existingProduct = products.find((item) => item.productid === product.productid);
        let updatedProducts;
        
        if (existingProduct) {
            updatedProducts = products.map((item) => 
                item.productid === product.productid 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            );
        } else {
            updatedProducts = [...products, { ...product, quantity: 1 }];
        }

        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };

    const handleRemove = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
        localStorage.setItem("products", JSON.stringify(newProducts));
    };

    const getTotalPrice = () => {
        return products.reduce((total, item) => total + item.productprice * item.quantity, 0);
    };

    return (
        <div>
            <h1>Danh sách xe</h1>
            {products.map((product, index) => (
                <div key={index}>
                    <h3>{product.productname}</h3>
                    <p>Giá: {product.productprice} VNĐ</p>
                    <p>Hãng: {product.productbrand}</p>
                    <button onClick={() => handleAdd(product)}>Thêm vào giỏ</button>
                </div>
            ))}

            <Cart cart={products} handleRemove={handleRemove} />
            <h3>Tổng tiền: {getTotalPrice()} VNĐ</h3>
        </div>
    );
}

const Cart = ({ cart, handleRemove }) => {
    return (
        <div>
            <h3>Giỏ hàng</h3>
            {cart.length === 0 ? <p>Giỏ hàng trống</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>Tên xe</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((product, index) => (
                            <tr key={index}>
                                <td>{product.productname}</td>
                                <td>{product.productprice}</td>
                                <td>{product.quantity}</td>
                                <td>{product.productprice * product.quantity}</td>
                                <td><button onClick={() => handleRemove(index)}>Xóa</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Shopping;
