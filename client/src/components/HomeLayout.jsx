import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CopyRight from './CopyRight'

export default function HomeLayout({ children }) {
    return (
        <div className='lg:w-[80%] w-[100%] m-auto'>
            <Navbar />
            <main className=' min-h-[80vh]'>
                {children}
            </main>
            <Footer />
            <CopyRight />
        </div>
    )
}
