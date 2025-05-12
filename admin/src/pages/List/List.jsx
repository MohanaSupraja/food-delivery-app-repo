import React, { useEffect } from 'react'
import './List.css'
import axios from 'axios';
import { useState } from 'react'
import { url } from '../../assets/assets';
import { toast } from 'react-toastify';
const List = () => {
    const [list, setList] = useState([]);
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        // console.log(response.data)
        if (response.data.success) {
            setList(response.data.data);
        }
        else {
            toast.error("error")
        }
    }
    useEffect(() => {
        fetchList();
    }, [])
    const removeFood = async (itemId) => {
        // console.log(itemId)
        const response = await axios.post(`${url}/api/food/remove`, { id: itemId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message)
        }
        else {
            toast.error("Error")
        }

    }
    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format">
                    <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b></b>
                </div>
                {list && list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/` + item.image} alt='' />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p style={{ cursor: "pointer" }} onClick={() => { removeFood(item._id) }}>X</p>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default List