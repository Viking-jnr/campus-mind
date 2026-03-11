import Image from "next/image"
import CampusMind from "../assets/CampusMind.png"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar"
import Link from "next/link"
import { ActivitySquare, ChevronUp, GroupIcon, HelpCircle, LayoutDashboard, LogOut, LucideSearch, NotebookTabs, Settings, User, Wallet } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TooltipProvider } from "@/components/ui/tooltip"

export function AppSidebar() {
  return (
    <Sidebar>
      <TooltipProvider>
      <SidebarHeader className="flex items-center">
        <div className="flex items-center">
          <Image loading="eager" src={CampusMind} alt="Campus Mind" width={100} height={100} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="AI Assistant">
                  <Link href="/dashboard">
                    <HelpCircle />
                    <span>AI Assistant</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Notes MarketPlace">
                  <Link href="/dashboard">
                    <NotebookTabs />
                    <span>Notes MarketPlace</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Study Groups">
                  <Link href="">
                    <GroupIcon />
                    <span>Study Groups</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Events">
                  <Link href="">
                    <ActivitySquare />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Wallet">
                  <Link href="">
                    <Wallet />
                    <span>Wallet</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bordet-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                  <User className="h-4 w-4 mr-2" />
                  <div className="flex flex-col gap-0.5 text-left text-sm">
                    <span className="font-semibold text-xs leading-none">John Doe</span>
                    <span className="text-[10px] text-muted-foreground">john@example.com</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top">
                <DropdownMenuItem>
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      </TooltipProvider>
    </Sidebar>
  )
}