"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { LogOut, User, Settings } from "lucide-react"

export default function NavbarDemo({ showNavbar = true }: { showNavbar?: boolean }) {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" showNavbar={showNavbar} />
    </div>
  )
}

function Navbar({ className, showNavbar = true }: { className?: string; showNavbar?: boolean }) {
  const [active, setActive] = useState<string | null>(null)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-4xl mx-auto z-50 transition-all duration-300 ease-in-out",
        showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none",
        className,
      )}
    >
      <Menu setActive={setActive}>
        {/* Home */}
        <Link href="/" className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          pathname === "/" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:text-blue-600"
        )}>
          Home
        </Link>

        {/* Destinations */}
        <Link href="/countries" className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          pathname.startsWith("/countries") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:text-blue-600"
        )}>
          Destinations
        </Link>

        {/* Student News */}
        <Link href="/news" className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          pathname.startsWith("/news") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:text-blue-600"
        )}>
          Student News
        </Link>

        {/* Our Team */}
        <Link href="/managers" className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          pathname === "/managers" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:text-blue-600"
        )}>
          Our Team
        </Link>

        {/* User Menu - Only show if authenticated */}
        {isAuthenticated && (
          <MenuItem setActive={setActive} active={active} item={user?.name || "Account"}>
            <div className="flex flex-col space-y-4 text-sm p-4 min-w-[200px]">
              <div className="border-b pb-2 mb-2">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-gray-500 text-xs">{user?.email}</p>
                <p className="text-blue-600 text-xs font-medium">{user?.role}</p>
              </div>
              
              <HoveredLink href="/dashboard" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </HoveredLink>
              
              {user?.role === 'ADMIN' && (
                <HoveredLink href="/admin" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </HoveredLink>
              )}
              
              <button 
                onClick={logout}
                className="flex items-center text-red-600 hover:text-red-700 transition-colors text-left"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}