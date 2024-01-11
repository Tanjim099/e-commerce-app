import React, { useState } from 'react'
import HomeLayout from './HomeLayout'
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleUserInput(e) {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault()  //preventDefault
        const response = await dispatch(register(registerData));
        if (response?.payload?.success) {
            navigate("/login")
        }

    }
    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[80vh]'>
                <form onSubmit={onFormSubmit} className='w-[400px] flex flex-col gap-4 bg-gray-200 p-3'>
                    <h3 className='text-xl text-center font-medium text-red-500 '>Register Form</h3>
                    <div className='w-full'>
                        <label htmlFor="name" className='w-full'>Name</label>
                        <input type="text" name="name" id="name" value={registerData.name} onChange={handleUserInput} className='w-full p-2 rounded  border' placeholder='enter name...' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="email" className='w-full'>Email</label>
                        <input type="email" name="email" id="email" value={registerData.email} onChange={handleUserInput} className='w-full p-2 rounded  border' placeholder='enter email...' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="password" className='w-full'>Password</label>
                        <input type="text" name="password" id="password" value={registerData.password} onChange={handleUserInput} className='w-full p-2 rounded  border' placeholder='enter password...' />
                    </div>
                    <button type='submit' className='w-full bg-red-500 p-2 font-medium text-white'>Register</button>
                </form>
            </div>
        </HomeLayout>
    )
}
