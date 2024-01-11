import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder, orderStatus } from '../redux/slices/orderSlice';
import { Select } from "antd";
import dateFormeter from '../helper/dateFormeter';
const { Option } = Select;

export default function AdminOrder() {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(["Not Process", "Processing", "Shopped", "Delivered", "Cancel"]);
    const { allOrders } = useSelector((state) => state?.order);
    console.log(allOrders)
    async function fetchOrder() {
        const response = await dispatch(getAllOrder());
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    async function handleChange(orderId, value) {
        await dispatch(orderStatus([orderId, value]))
    }
    return (
        <AdminLayout>

            <div className="allOrdersContainer">

                {allOrders?.map((order, i) => {
                    return (
                        <div key={i} className="border shadow  mt-3 bg-white overflow-auto">
                            <table className="table " style={{ width: "100%" }}>
                                <thead style={{ width: "100%" }}>
                                    <tr style={{ width: "100%" }}>
                                        <th scope="col" >#</th>
                                        <th className="">Status</th>
                                        <th className="">Buyer</th>
                                        <th className="">Order Date</th>
                                        <th className="">Payment Method</th>
                                        <th className="">Total Items</th>
                                        <th >Deliver Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>
                                            <Select
                                                bordered={false}
                                                onChange={(value) => handleChange(order._id, value)}
                                                defaultValue={order?.status}
                                            >
                                                {status?.map((s, i) => {
                                                    return (
                                                        <Option key={i} value={s}>
                                                            {s}
                                                        </Option>
                                                    )
                                                })}
                                            </Select>
                                        </td>
                                        <td>{order?.buyer?.name}</td>
                                        <td>{dateFormeter(order?.createdAt)}</td>
                                        <td>COD</td>
                                        <td>{order?.products?.length}</td>
                                        <td>B Blcok New Delhi </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="px-5 flex flex-col">
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th >No</th>
                                            <th >Product Name</th>
                                            <th >Price</th>
                                            <th >Quantity</th>
                                            <th >Product Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.products?.map((p, i) => (

                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{p.name}</td>
                                                <td>{p.price}</td>
                                                <td>{p.itemQuantity}</td>
                                                <td><img className="" style={{ width: "50px" }} src={p?.image} alt="" /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })}
            </div>
        </AdminLayout>
    )
}
