"use client"
import React, { useEffect, useState } from 'react'
import { Menu, X, Wallet, Users, Clock, ShieldCheck, Zap, TrendingUp, Handshake, ArrowRight, DollarSign, Calendar, Lock, ChevronDown, ChevronUp, CheckCircle, Link, Home, List, Activity, Settings, Copy, User, ArrowLeft, PiggyBank, Briefcase, FileText } from 'lucide-react';

export default function page() {



// login();
     const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
    const primaryColor: string = 'bg-blue-700';
const primaryBgHover: string = 'hover:bg-blue-800';
const primaryTextColor: string = 'text-blue-700';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // onLoginSuccess();
    };

  return (
     <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-blue-100">
                <div className="text-center">
                    <User className={`mx-auto h-12 w-12 ${primaryTextColor}`} />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Sign in to PoolPay
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <button 
                            // onClick={() => onNavigate('home')} 
                            className={`font-medium ${primaryTextColor} hover:text-blue-600 transition duration-150`}
                        >
                            start a free trial
                        </button>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className={`font-medium ${primaryTextColor} hover:text-blue-600`}>
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white ${primaryColor} ${primaryBgHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-lg hover:shadow-xl`}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 text-blue-400 group-hover:text-blue-300" aria-hidden="true" />
                            </span>
                            Sign in (Mock Login)
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}
