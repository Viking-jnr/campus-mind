import Link from 'next/link'
import React from 'react'
import Assistant from '../components/assistant'

const Dashboard = () => {
  return (
    <div className='flex min-h-screen bg-gray-100'>
        <aside className='w-64 bg-blue-900 text-white p-6'>
            <h2 className='text-2xl font-bold mb-6'>Campus Mind</h2>
            <nav className='space-y-4'>
                <Link href="#" className='block hover:text-blue-300'>Home</Link>
                <Link href="#" className='block hover:text-blue-300'>AI Assistant</Link>
                <Link href="#" className='block hover:text-blue-300'>Notes Marketplace</Link>
                <Link href="#" className='block hover:text-blue-300'>Study Groups</Link>
                <Link href="#" className='block hover:text-blue-300'>Events</Link>
                <Link href="#" className='block hover:text-blue-300'>Wallet</Link>
                <Link href="#" className='block hover:text-blue-300'>Settings</Link>
            </nav>
        </aside>

        <main className='flex-1 p-8'>
            <header className='flex justify-between items-center mb-8 border-b-6 pb-4'>
                <h1 className='text-xl text-black font-semibold'>Welcome Back</h1>
                <button className='bg-blue-900 text-white px-4 py-2 rounded'>Logout</button>
            </header>

            <section className='bg-white shadow rounded p-6 mb-8'>
                <Assistant />
            </section>
            <section className='bg-white shadow rounded p-6 mb-8'>
                <h2 className='text-lg text-gray-800 font-semibold mb-4'>Quick Actions</h2>
                <button className='bg-blue-600 text-white px-4 py-2 rounded mr-5 cursor-pointer hover:bg-blue-700'>Find Notes</button>
                <button className='bg-green-600 text-white px-4 py-2 rounded mr-5 cursor-pointer hover:bg-green-700'>Find Study Group</button>
                <button className='bg-purple-600 text-white px-4 py-2 rounded mr-5 cursor-pointer hover:bg-purple-700'>Find Events</button>
            </section>
            <section className='bg-white shadow rounded p-6 mb-8'>
                <h2 className='text-lg text-gray-800 font-semibold mb-4'>Agent Activity</h2>
                <ul className='list-disc pl-6 space-y-2 text-black'>
                    <li>Notes Agent Found Calculus Notes</li>
                    <li>Quiz Agent Generated Practice Questions</li>
                    <li>Study Agent matched 3 students</li>
                </ul>
            </section>
        </main>
    </div>
  )
}

export default Dashboard