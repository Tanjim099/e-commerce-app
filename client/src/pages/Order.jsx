import React, { useEffect, useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../redux/slices/orderSlice';

export default function Order() {
    const dispatch = useDispatch();
    const { isLoggedIn, data, role } = useSelector((state) => state?.auth);
    const [userOrders, setUserOrders] = useState([]);

    const { orderList } = useSelector((state) => state?.order);
    console.log(orderList);
    async function fetchOrders() {
        const response = await dispatch(getOrders(data._id));
        console.log(response);
    };

    useEffect(() => {
        fetchOrders()
    }, [data])
    return (
        <HomeLayout>
            <div>
                <div className=" flex flex-col gap-4">
                    <h1 className="text-center">All Orders</h1>
                    {orderList?.map((order, i) => {
                        return (
                            <div key={i} className="border  orderCardBox">
                                <table className="table ">
                                    <thead>
                                        <tr className="">
                                            <th className="col bg-primary text-white">No</th>
                                            <th className="col bg-primary text-white">Status</th>
                                            <th className="col bg-primary text-white">Buyer</th>
                                            <th className="col bg-primary text-white">Order Date</th>
                                            <th className="col bg-primary text-white">Payment Method</th>
                                            <th className="col bg-primary text-white">Total Items</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{order?.status}</td>
                                            <td>{order?.buyer?.name}</td>
                                            <td>{order?.createdAt}</td>
                                            <td>{order?.payment?.success ? "Success" : "COD"}</td>
                                            <td>{order?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex flex-col gap-4">
                                    {order?.products?.map((p) => (
                                        <div className=" flex justify-between items-center px-4" key={p._id}>


                                            <div className="">
                                                <p>{p.name}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <p className=' font-medium'>Price :</p>
                                                <span>{p.price}</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <p className=' font-medium'>Quantity :</p>
                                                <span>{p.itemQuantity}</span>
                                            </div>
                                            <div className="">
                                                <img
                                                    src={p?.image}
                                                    className=""
                                                    alt={p.name}
                                                    style={{ width: "40px" }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </HomeLayout>
    )
}
