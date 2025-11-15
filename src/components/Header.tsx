"use client"
import React, { useState } from 'react'
import { X, Handshake, ArrowRight, Wallet, Menu } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface NavItem {
  name: string;
  href: string;
}

export default function Header() {


// const Nav: React.FC<NavProps> = ({ onNavigate, currentPage }) => {
  const param = useParams();
 
  
  const [isOpen, setIsOpen] = useState<boolean>(false);

    const primaryColor = 'bg-blue-700';
    const primaryBgHover = 'hover:bg-blue-800';
    const primaryRingColor = 'ring-blue-700';
    const primaryTextColor = 'text-blue-700';

  const navItems: NavItem[] = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'FAQs', href: '#faqs' },
  ];

  const handleLinkClick = (page: 'home' | 'dashboard' | 'login') => {
    setIsOpen(false);
    // onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <button onClick={() => handleLinkClick('home')} className="flex items-center space-x-2">
              <Wallet className={`h-8 w-8 ${primaryTextColor}`} />
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                PoolPay
              </span>
            </button>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
          {/* Hide nav links on auth/pool pages */}
          {/* {currentPage === 'home' && ( */}
            <nav className="hidden md:flex space-x-10">
              {navItems.map((item: NavItem) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          {/* )} */}

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 lg:ml-8 space-x-4">
            {/* {currentPage === 'dashboard' || currentPage === 'single-pool' ? ( */}
              <button
                onClick={() => handleLinkClick('home')}
                className={`text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition duration-300 bg-gray-500 hover:bg-gray-600`}
              >
                Logout
              </button>
            {/* // ) : currentPage === 'login' ? ( */}
              <button
                onClick={() => handleLinkClick('home')}
                className={`text-blue-700 font-semibold py-2 px-4 rounded-xl transition duration-300 hover:bg-blue-50`}
              >
                Back to Home
              </button>
            {/* ) : ( // currentPage === 'home' */}
              <>
                {/* <a 
                  href="#signup" 
                  className="text-base font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Sign Up
                </a> */}
                <button
                  onClick={() => handleLinkClick('login')}
                  className={`text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition duration-300 ${primaryColor} ${primaryBgHover} flex items-center`}
                >
                  Login <ArrowRight className="inline h-4 w-4 ml-1" />
                </button>
                <ConnectButton />
              </>
            {/* )} */}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (omitted for brevity but logic remains) */}
    </header>
  );
};