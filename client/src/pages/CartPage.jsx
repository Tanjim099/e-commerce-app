import React from 'react'
import HomeLayout from '../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeOrders } from '../redux/slices/orderSlice';

export default function CartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state?.cart);
    console.log(items)
    const totalPrice = () => {
        let total = 0;
        items?.map((item) => {
            total = total + item.price * item.itemQuantity;
        })

        return total
    }

    const { isLoggedIn, data, role } = useSelector((state) => state?.auth);

    async function handleCheckout() {
        const datas = {
            items,
            userId: data._id
        }
        const response = await dispatch(makeOrders(datas));
        console.log(response);
        localStorage.removeItem("cartItems");
        // if (response?.payload?.suceess) {
        //     localStorage.removeItem("cartItems");
        // }
    }
    return (
        <HomeLayout>
            <div className='flex gap-4 mt-10'>
                <div className='w-[70%]  p-4'>
                    <div className='flex flex-col gap-3'>
                        {
                            items?.map((item, i) => {

                                return (
                                    <div key={i} className='shadow-md p-4'>
                                        <div className='flex justify-between'>
                                            <img className='w-[40px]' src={item.image} alt="" />
                                            <div>
                                                <h3>{item.name}</h3>
                                                <span>{item.price}</span>
                                            </div>
                                            <span>{item.itemQuantity}</span>
                                            <button>Remove</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='w-[30%] h-[250px] shadow-md p-4 flex flex-col gap-4'>
                    <h3>PRICE DETAILS</h3>
                    <hr />
                    <div className='flex justify-between'>
                        <span>Price</span>
                        <span>{totalPrice()}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Discount</span>
                        <span>{totalPrice() > 2000 ? "99" : "00"}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Delivery Charges</span>
                        <span>Free</span>
                    </div>
                    {isLoggedIn ? (
                        <button onClick={handleCheckout} className=' bg-red-500 text-white p-2'>Place Order</button>
                    ) : (
                        <button onClick={() => navigate("/login")} className=' bg-red-500 text-white p-2'>Place Order</button>
                    )}
                </div>
            </div>
        </HomeLayout>
    )
}
