import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom'
import { url } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, clearCart,
  } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""

  })

  const onChangeHandler = (event) => {

    const value = event.target.value;
    const name = event.target.name;
    setData(data => ({ ...data, [name]: value }))
  }
  // useEffect(() => {
  //   console.log(data)
  // }, [data])
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    // console.log("food_list:", food_list)
    // console.log("cart_list:", cartItems)
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems)
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    console.log(response.data)
    if (response.data.success) {
      await clearCart();
      const { session_url } = response.data;
      window.location.replace(session_url)

    }
    else {
      alert("Error")
    }

  }

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount() == 0) {
      navigate('/cart')
    }
  }, [token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name' />
        </div>
        <input required type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone Number' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivert fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>

        </div>
      </div>

    </form>
  )
}

export default PlaceOrder