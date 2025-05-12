import React, { useEffect } from 'react'
import './VerifyOrder.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { url } from '../../assets/assets'
import { useSearchParams } from 'react-router-dom'
const VerifyOrder = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId");
    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId })
        if (response.data.success) {
            navigate('/myorders');
        }
        else {
            navigate('/')
        }
    }
    useEffect(() => {
        verifyPayment();
    }, [])
    return (
        <div className='verify'>
            <div className="spinner">

            </div>

        </div>
    )
}

export default VerifyOrder