import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/slices/cartSlice';

export default function ProductCard({ name, price, image, data }) {
    const dispatch = useDispatch();
    async function onAddToCart(item) {
        await dispatch(addItem({
            id: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            itemQuantity: 1
        }));
        alert("Item Added to cart");
    }
    return (
        <div className=' shadow-md '>
            <div className='p-3'>
                <img src={image} alt="" className='h-[200px] w-full' />
                <p className=' text-sm'>{name}</p>
                <div className='flex justify-between items-center'>
                    <span className='text-sm font-semibold'>₹ {price}</span>
                    <span className=' bg-green-100 text-xs font-medium p-0'>23% OFF</span>
                </div>
            </div>
            <button onClick={() => onAddToCart(data)} className='bg-red-500 w-[100%] text-white p-1 font-medium'>Add to cart</button>
        </div>
    )
}
