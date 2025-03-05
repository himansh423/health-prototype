"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#0070f3]">HealthCare+</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className="hover:text-primary px-3 py-2 text-sm font-medium text-[#0070f3]">
                Home
              </Link>
              <Link
                href="#hospitals"
                className="hover:text-primary px-3 py-2 text-sm font-medium text-[#0070f3]"
              >
                Hospitals
              </Link>
              <Link
                href="#medicines"
                className="hover:text-primary px-3 py-2 text-sm font-medium text-[#0070f3]"
              >
                Medicines
              </Link>
              <Link
                href="#subscriptions"
                className="hover:text-primary px-3 py-2 text-sm font-medium text-[#0070f3]"
              >
                Subscriptions
              </Link>
              <Link href="#about" className="text-[#0070f3] hover:text-primary px-3 py-2 text-sm font-medium">
                About Us
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5 text-[#0070f3]" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2  text-[#0070f3] ">
              <User className="h-4 w-4" />
              Sign In
            </Button>
            <Button className="bg-[#0070f3]">Get Started</Button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-foreground hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-primary-foreground hover:text-primary">
              Home
            </Link>
            <Link
              href="#hospitals"
              className="block px-3 py-2 text-base font-medium text-primary-foreground hover:text-primary"
            >
              Hospitals
            </Link>
            <Link
              href="#medicines"
              className="block px-3 py-2 text-base font-medium text-primary-foreground hover:text-primary"
            >
              Medicines
            </Link>
            <Link
              href="#subscriptions"
              className="block px-3 py-2 text-base font-medium text-primary-foreground hover:text-primary"
            >
              Subscriptions
            </Link>
            <Link
              href="#about"
              className="block px-3 py-2 text-base font-medium text-primary-foreground hover:text-primary"
            >
              About Us
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <User className="h-4 w-4" />
                Sign In
              </Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

