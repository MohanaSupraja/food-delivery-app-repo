import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets, url } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({ id, name, price, description, image }) => {
    console.log(url + "/images/" + image)
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={url + "/images/" + image} />
                {
                    !cartItems[id]
                        ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} />
                        : <div className='food-item-counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
                        </div>
                }
            </div>
            <div className='food-item-info'>
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">
                    {description}
                </p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem