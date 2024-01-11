import React, { useEffect } from 'react'
import HomeLayout from '../components/HomeLayout'
import HeroSection from '../components/HeroSection'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../redux/slices/productSlice'

export default function Home() {
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state?.product);
    console.log(productList)
    async function fetchAllProduct() {
        await dispatch(getAllProduct());
    }

    useEffect(() => {
        fetchAllProduct()
    }, [])
    return (
        <HomeLayout>
            <HeroSection />
            <div className=' my-6 m-auto grid grid-cols-2 lg:grid-cols-5 gap-3'>
                {productList && productList.map((data, i) => {
                    return <ProductCard key={i} name={data?.name} price={data?.price} image={data?.image} data={data} />
                })}
            </div>
        </HomeLayout>
    )
}
