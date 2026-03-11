'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Assistant from '../components/assistant'
import { ModeToggle } from '../components/modeToggle'
import { AppSidebar } from '../components/sideBar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'

// Main dashboard content
const Dashboard = () => {
    return (
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
    )
}

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('Dashboard')
  return (
    <div className='flex min-h-screen'>
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SidebarTrigger className='ml-1 text-black' />
                <div className="p-6">
                    { activeTab === 'Dashboard' && <Dashboard />}
                </div>
            </SidebarInset>
        </SidebarProvider>
    </div>
  )
}

export default DashboardPage