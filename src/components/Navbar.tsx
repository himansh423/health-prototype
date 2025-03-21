"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Menu, X, User, ShoppingCart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/auth/decode-token");
        if (response.data?.user) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const res = await axios.post("/api/auth/logout");

    if (res.data.success) {
      window.location.reload();
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#0070f3]">
                HealthCare+
              </span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {["Home", "Hospitals", "Medicines"].map(
                (item, index) => (
                  <Link
                    key={index}
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="hover:text-primary px-3 py-2 text-sm font-medium text-[#0070f3]"
                  >
                    {item}
                  </Link>
                )
              )}
              <Link
                href={`/ask-ai`}
                className="hover:text-primary px-3 py-2 text-sm font-medium text-[#0070f3]"
              >
                ASK AI
              </Link>
              <Link
                href={`/get-personalized-recommendation`}
                className="hover:text-primary px-3 py-2 text-sm font-medium text-[#0070f3]"
              >
                AI RECOMMENDATION
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5 text-[#0070f3]" />
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-[#ff0000]"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                <Link href={"/profile/67cab7250b3cc6436cebd7a7"}>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-[#0048ff]"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={"/auth/login"}>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-[#0070f3]"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link href={"/auth/register"}>
                  <Button className="bg-[#0070f3]">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-foreground hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              "Home",
              "Hospitals",
              "Medicines",
              "Subscriptions",
              "About Us",
            ].map((item, index) => (
              <Link
                key={index}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="block px-3 py-2 text-base font-medium text-primary-foreground hover:text-primary"
              >
                {item}
              </Link>
            ))}

            <div className="pt-4 flex flex-col space-y-3">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 text-[#ff0000]"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
