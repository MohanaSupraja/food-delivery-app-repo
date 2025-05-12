import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../../assets/assets';
import { assets } from '../../assets/assets';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/adminorders");
            if (response.data.success) {
                setOrders(response.data.data);
            } else {
                toast.error("Error fetching orders");
            }
        } catch (error) {
            toast.error("Server error");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);
    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/updatestatus", { orderId, status: event.target.value })
        if (response.data.success) {
            await fetchAllOrders();
        }
        else {
            toast.error("Error")
        }
    }
    return (
        <div className='order add'>
            <h3>Orders</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src={assets.parcel_icon} alt='parcel icon' />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, idx) => (
                                    <span key={idx}>
                                        {item.name} x {item.quantity}
                                        {idx < order.items.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                            <p className="order-item-name">
                                {order.address.firstName + " " + order.address.lastName}
                            </p>
                            <div className="order-item-address">
                                <p>{order.address.street + ", "}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>
                                {order.address.phone}
                            </p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
