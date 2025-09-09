"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { LogOut, User, Settings, Menu as MenuIcon, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export default function NavbarDemo({ showNavbar = true }: { showNavbar?: boolean }) {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" showNavbar={showNavbar} />
    </div>
  )
}

function Navbar({ className, showNavbar = true }: { className?: string; showNavbar?: boolean }) {
  const [active, setActive] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const pathname = usePathname()
  const { t } = useTranslation()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const checkBackgroundBrightness = () => {
      
      // For other pages, check the actual background
      const body = document.body
      const computedStyle = window.getComputedStyle(body)
      const backgroundColor = computedStyle.backgroundColor
      
      // Parse RGB values
      const rgbMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
      if (rgbMatch) {
        const [, r, g, b] = rgbMatch.map(Number)
        // Calculate brightness using luminance formula
        const brightness = (r * 299 + g * 587 + b * 114) / 1000
        setIsDarkBackground(brightness < 128)
      } else {
        // Default to light background for other pages
        setIsDarkBackground(false)
      }
    }

    checkBackgroundBrightness()
    
    // Re-check on route changes
    const timer = setTimeout(checkBackgroundBrightness, 100)
    return () => clearTimeout(timer)
  }, [pathname])
  const navItems = [
    { href: "/", label: t('nav.home') },
    { href: "/countries", label: t('nav.destinations') },
    { href: "/news", label: t('nav.studentNews') },
    { href: "/managers", label: t('nav.ourTeam') },
  ]

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const getTextColor = (isActive: boolean) => {
    if (isDarkBackground) {
      return isActive ? "text-blue-300" : "text-white/90 hover:text-white"
    } else {
      return isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-600"
    }
  }

  const getActiveBackground = () => {
    return isDarkBackground ? "bg-white/20" : "bg-blue-100"
  }
  return (
    <>
      {/* Desktop Navigation */}
      <div
        className={cn(
          "fixed top-10 inset-x-0 max-w-4xl mx-auto z-50 transition-all duration-300 ease-in-out hidden md:block",
          showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none",
          className,
        )}
      >
        <div
          className={cn(
            "relative rounded-full border backdrop-blur-xl flex justify-center space-x-8 px-10 py-4 shadow-2xl transition-all duration-300",
            isDarkBackground 
              ? "border-white/20 bg-white/10 shadow-black/10" 
              : "border-gray-200 bg-white/90 shadow-gray-200/50"
          )}
        >
          {/* Home */}
          <Link href="/" className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            pathname === "/" ? `${getActiveBackground()} ${getTextColor(true)}` : getTextColor(false)
          )}>
            {t('nav.home')}
          </Link>

          {/* Destinations */}
          <Link href="/countries" className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            pathname.startsWith("/countries") ? `${getActiveBackground()} ${getTextColor(true)}` : getTextColor(false)
          )}>
            {t('nav.destinations')}
          </Link>

          {/* Student News */}
          <Link href="/news" className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            pathname.startsWith("/news") ? `${getActiveBackground()} ${getTextColor(true)}` : getTextColor(false)
          )}>
            {t('nav.studentNews')}
          </Link>

          {/* Our Team */}
          <Link href="/managers" className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            pathname === "/managers" ? `${getActiveBackground()} ${getTextColor(true)}` : getTextColor(false)
          )}>
            {t('nav.ourTeam')}
          </Link>

          {/* Language Switcher */}
          <div className={isDarkBackground ? "text-white" : "text-gray-900"}>
            <LanguageSwitcher />
          </div>

          {/* User Menu - Only show if authenticated */}
          {isAuthenticated && (
            <div className="relative group">
              <button className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                getTextColor(false)
              )}>
                {user?.name || "Account"}
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4">
                  <div className="border-b border-gray-100 pb-3 mb-3">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-gray-500 text-xs">{user?.email}</p>
                    <p className="text-blue-600 text-xs font-medium">{user?.role}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <Link href="/dashboard" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <User className="h-4 w-4 mr-2" />
                      {t('nav.dashboard')}
                    </Link>
                    
                    {user?.role === 'ADMIN' && (
                      <Link href="/admin" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Settings className="h-4 w-4 mr-2" />
                        {t('nav.adminPanel')}
                      </Link>
                    )}
                    
                    <button 
                      onClick={logout}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.signOut')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out md:hidden",
          showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "shadow-lg transition-all duration-300",
                isDarkBackground 
                  ? "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30" 
                  : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
              )}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white border-l shadow-xl">
            <SheetHeader>
              <SheetTitle className="text-left">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <span className="font-bold text-xl">Erasmus GBZA</span>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="mt-8 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActivePath(item.href)
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Separator />

              {/* Language Switcher */}
              <div className="px-4">
                <p className="text-sm font-medium text-gray-900 mb-3">{t('nav.language')}</p>
                <LanguageSwitcher />
              </div>

              {/* User Section */}
              {isAuthenticated && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="px-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                          <p className="text-xs text-blue-600 font-medium">{user?.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <User className="h-4 w-4 mr-3" />
                        {t('nav.dashboard')}
                      </Link>

                      {user?.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          {t('nav.adminPanel')}
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout()
                          setMobileMenuOpen(false)
                        }}
                        className="flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        {t('nav.signOut')}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Login Link for non-authenticated users */}
              {!isAuthenticated && (
                <>
                  <Separator />
                  <div className="px-4">
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-md"
                    >
                      {t('auth.staffLogin')}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}