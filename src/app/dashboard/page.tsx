'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Brain, FileText, ShoppingCart, Users, NotebookTabs, Wallet, FileQuestion } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'



const DashboardPage = () => {
    const agents = [
  { name: "Notes Finder", desc: "Find notes on any topic", icon: <NotebookTabs className="text-blue-500" />, status: "Active" },
  { name: "Notes Summarizer", desc: "Turn long notes into key points", icon: <FileText className="text-yellow-500" />, status: "Active" },
  { name: "Group Matcher", desc: "Find peers for your courses", icon: <Users className="text-green-500" />, status: "Experimental" },
  { name: "Quiz Generator", desc: "Generate quizes from any notes", icon: <FileQuestion className="text-orange-500" />, status: "Active" },
  { name: "Assignment Helper", desc: "Strategy and planning agent", icon: <Brain className="text-purple-500" />, status: "Active" },
]
const router = useRouter();
  return (
    <div className="p-6 space-y-6">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary">Campus Mind Hub</h1>
                <p className="text-muted-foreground">Select an agent to start your session.</p>
            </div>
            <Badge variant="outline" className="px-3 py-1 border-blue-500 text-blue-600">
                <Wallet className="mr-2 h-4 w-4" /> Hedera Connected
            </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) =>(
                <Card key={agent.name} className="hover:border-blue-500 transition-colors cursor-pointer ">
                    <CardHeader>
                        <div className="flex justify-between">
                        <div className='p-2 w-fit rounded-lg bg-slate-100 group-hover:bg-blue-50 transition-colors'>
                            {agent.icon}
                        </div>
                        <Badge variant="outline" className={agent.status === "Active" ? "bg-green-200 text-black" : "bg-red-200 text-black"}>
                            {agent.status} 
                        </Badge>
                        </div>
                        <CardTitle className="mt-2 ml-2">{agent.name} </CardTitle>
                        <CardDescription>{agent.desc} </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={() => router.push(`/dashboard/assistant?agent=${agent.name.toLowerCase().replace(/\s+/g, '-')}`)} variant="secondary" className="w-full cursor-pointer">Launch Agent </Button>
                    </CardFooter>
                    
                </Card>
            ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Hedera Network Activity for Notes and Tutoring</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">No recent Transactions Found</div>
            </CardContent>
        </Card>

        </div>
  )
}

export default DashboardPage