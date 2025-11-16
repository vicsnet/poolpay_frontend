"use client"
import { Activity, ArrowRight, Clock, List, Users } from 'lucide-react';
import React, { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import PoolFactoryABI from '@/contract/abi/PoolFactoryABI.json'
import { PoolFactoryAddress } from '@/contract/contract';
import PoolABI from '@/contract/abi/PoolABI.json';
import { ethers } from 'ethers';
import { redirect } from 'next/navigation';


type PoolStatus = 'Active' | 'Upcoming' | 'Completed';

interface Pool {
    id: string;
    name: string;
    status: PoolStatus;
    members: number;
    frequency: string;
    contribution: number;
    payoutDate: string;
}

export default function Page() {
    const primaryColor = 'bg-blue-700';
    const primaryTextColor = 'text-blue-700';
    const { address } = useAccount();

    const [copyStatus, setCopyStatus] = useState<'idle' | 'success'>('idle');
    const provider = new ethers.JsonRpcProvider(
        `https://arc-testnet.g.alchemy.com/v2/74gt1L_XsQyauh_orPvGtWC6fqJXfxVE`
    );


    // Dummy userId
    const userId = 'user-123';

    // Dummy pools
    const pools: Pool[] = [
        {
            id: 'pool-001',
            name: 'Education Fund',
            status: 'Active',
            members: 5,
            frequency: 'Weekly',
            contribution: 150,
            payoutDate: 'Nov 22, 2025',
        },
        {
            id: 'pool-002',
            name: 'Travel Savings',
            status: 'Upcoming',
            members: 8,
            frequency: 'Monthly',
            contribution: 200,
            payoutDate: 'Dec 1, 2025',
        },
        {
            id: 'pool-003',
            name: 'Gadgets Fund',
            status: 'Completed',
            members: 3,
            frequency: 'Weekly',
            contribution: 100,
            payoutDate: 'Nov 15, 2025',
        },
    ];

    // const referralLink = `https://poolpay.app/invite?ref=${userId}`;

    // const getStatusClasses = (status: PoolStatus) => {
    //     switch (status) {
    //         case 'Active':
    //             return 'bg-green-100 text-green-800 border-green-300';
    //         case 'Upcoming':
    //             return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    //         case 'Completed':
    //             return 'bg-gray-100 text-gray-500 border-gray-300';
    //         default:
    //             return 'bg-gray-100 text-gray-500 border-gray-300';
    //     }
    // };

    const { data: usersCreatedPool } = useReadContract({
        address: PoolFactoryAddress as `0x${string}`,
        abi: PoolFactoryABI as any,
        functionName: 'getUserPools',
        args: [address as `0x${string}`],

    });

    const poolsToShow = Array.isArray(usersCreatedPool) ? usersCreatedPool : [];


    console.log('pools', usersCreatedPool);
    return (
        <section className="min-h-screen py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
                        <Activity className={`${primaryTextColor} h-8 w-8 mr-3`} />
                        My Pools Dashboard
                    </h1>
                    <p className="mt-2 text-xl text-gray-500">
                        Welcome back! Here's an overview of the Group Savings Pools you are participating in.
                    </p>
                    {/* <div className="mt-2 text-sm text-gray-400">
                        User ID: <span className="font-mono text-gray-600">{userId}</span>
                    </div> */}
                </header>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Pools & Joined Pools ({pools.filter(p => p.status !== 'Completed').length})
                </h2>
                <div className="">
                    {poolsToShow?.length === 0 ? (
                        <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-gray-200">
                            <List className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-lg text-gray-600">
                                You haven't Created any Pool yet
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {poolsToShow?.map((pool, index) => {


                                return (
                                    <div
                                        key={index}
                                        // Base styles: White background, generous padding, large rounded corners, subtle shadow
                                        className="bg-white p-5 rounded-xl shadow-lg cursor-pointer transition duration-300 ease-in-out 
                       text-gray-800 font-medium flex items-center justify-between border border-gray-100 hover:shadow-2xl hover:border-blue-500 hover:scale-[1.01] "
                                        onClick={() => redirect(`/${pool}`)}
                                    >
                                        <span className="truncate text-lg">{pool}</span>

                                        {/* Optional: Add an icon to visually indicate it's a clickable link */}
                                        <svg
                                            className="w-5 h-5 text-blue-500 ml-4 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            ></path>
                                        </svg>
                                    </div>
                                )
                            }

                            )}
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
