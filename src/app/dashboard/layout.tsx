import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from '../components/sideBar'

const DashboardLayout = ({ children }: {children : React.ReactNode}) => {
  return (
    <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SidebarTrigger className='ml-1 text-white' />
                {children}
            </SidebarInset>
        </SidebarProvider>
  )
}

export default DashboardLayout