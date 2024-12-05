'use client'
import { useState } from "react";
import Link from "next/link";
// import { MenuIcon, XIcon } from "@heroicons/react/outline"; // Install Heroicons: npm install @heroicons/react

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className="bg-white shadow-md  w-full z-10 mb-8">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link href="/" className="text-2xl font-semibold text-gray-800">
          Brand
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-gray-600 hover:text-gray-800">
          Home
        </Link>
        <Link href="/projects" className="text-gray-600 hover:text-gray-800">
        Projects
        </Link>
        <Link href="/Profile" className="text-gray-600 hover:text-gray-800">
        Profile
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-gray-800 focus:outline-none"
      >
        {isOpen ? (
        //   <XIcon className="h-6 w-6" />
          <> x</>
        ) : (
        //   <MenuIcon className="h-6 w-6" />
        <>x </>
        )}
      </button>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden bg-white shadow-md">
        <Link
          href="/"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          About
        </Link>
        <Link
          href="/services"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          Services
        </Link>
        <Link
          href="/contact"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          Contact
        </Link>
      </div>
    )}
  </nav>
  )
}



