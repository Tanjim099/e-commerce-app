import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeLayout from '../components/HomeLayout';
import { login } from '../redux/slices/authSlice';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault()  //preventDefault
        const response = await dispatch(login(loginData));
        if (response?.payload?.success) {
            navigate("/")
        }

    }
    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[80vh]'>
                <form onSubmit={onFormSubmit} className='w-[400px] flex flex-col gap-4 bg-gray-200 p-3'>
                    <h3 className='text-xl text-center font-medium text-red-500 '>Login Form</h3>
                    <div className='w-full'>
                        <label htmlFor="email" className='w-full'>Email</label>
                        <input type="email" name="email" id="email" value={loginData.email} onChange={handleUserInput} className='w-full p-2 rounded  border' placeholder='enter email...' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="password" className='w-full'>Password</label>
                        <input type="text" name="password" id="password" value={loginData.password} onChange={handleUserInput} className='w-full p-2 rounded  border' placeholder='enter password...' />
                    </div>
                    <button type='submit' className='w-full bg-red-500 p-2 font-medium text-white'>Login</button>
                </form>
            </div>
        </HomeLayout>
    )
}
