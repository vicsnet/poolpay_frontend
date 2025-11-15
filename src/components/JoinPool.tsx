"use client";
import React, { useState } from 'react'
import { X, Handshake, ArrowRight } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import PoolFactoryABI from '../contract/abi/PoolFactoryABI.json';
import { PoolFactoryAddress } from '../contract/contract';
// import { useRouter } from 'next/navigation';
import { redirect } from "next/navigation";
import { useParams } from 'next/navigation';
import PoolABI from '@/contract/abi/PoolABI.json';
import Header from './Header';
import { toast } from 'react-toastify';

export default function CreatePool() {

    // const router = useRouter();
    const params = useParams();
    const { id, referral } = params;
    const account = useAccount();


    const { data: ReferredPoolName } = useReadContract({
        address: id as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'poolName',
        args: [],
    });

    console.log("Referred Pool Name: ", referral);

    const [inviteCode, setInviteCode] = useState('');
    const [poolName, setPoolName] = useState('');
    const [poolAmount, setPoolAmount] = useState(0);
    const [contributionPerMember, setContributionPerMember] = useState(0);
    const { data: hash, writeContract, isPending } = useWriteContract();


    const primaryColor = 'bg-blue-700';
    const primaryBgHover = 'hover:bg-blue-800';
    const primaryRingColor = 'ring-blue-700';
    const primaryTextColor = 'text-blue-700';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const referralStr = Array.isArray(referral) ? referral[0] : referral;
        if (!referralStr){
            toast.error("Invalid referral link");
            return;
        };
        if (!account.address){
            toast.error("Please connect your wallet to join the pool");
            return;
        }

        // setIsLoading(true);
        writeContract({
            address: PoolFactoryAddress,
            abi: PoolFactoryABI,
            functionName: 'joinPool',
            args: [id as `0x${string}`, referralStr.toUpperCase() as string],
        });


    };
    const { isLoading: isConfirming, isSuccess: isConfirmed, data, error, isError } =
        useWaitForTransactionReceipt({
            hash,
        })

    if (isConfirmed) {
        console.log(data);
      
        redirect(`/${id}`);

        console.log("Pool Created Successfully");
        console.log(hash)
    }

    if (isError) {
        console.log("Error: ", error);
    }

    const onClose = () => {
        // router.push('/');
        redirect('/');
    }


    return (
        <div className="">
            <div className="fixed top-0 left-0 w-full z-60">
                    <Header />
           
            </div>

        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300" aria-modal="true" role="dialog">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 m-auto transform transition-all duration-300 scale-100">
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition duration-150"
                onClick={onClose}
                >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="text-center">
                    <Handshake className={`mx-auto h-12 w-12 ${primaryTextColor}`} />
                    <h3 className="mt-4 text-2xl font-extrabold text-gray-900">
                        Join {ReferredPoolName ? ReferredPoolName as string : "Group Savings"} Savings Pool
                    </h3>
                    <p className="mt-2 text-gray-500">
                        You have been invited to join a savings pool. Please click on the button below to Join {ReferredPoolName as string}
                    </p>
                </div>
                  <div className="flex justify-center space-x-3 mt-6" >
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-3 px-6 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                            disabled={isPending || isConfirming}
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={handleSubmit}
                            className={`flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white ${primaryColor} ${primaryBgHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150`}
                            disabled={isPending || isConfirming}
                        >
                            {isPending ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <ArrowRight className="h-5 w-5 mr-2" />
                            )}
                            {isPending || isConfirming ? 'Joining Pool...' : 'Join Pool'}
                        </button>
                    </div>

                {/* <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="invite-code" className="block text-sm font-medium text-gray-700 text-left">
                                Pool Name (e.g., General Savings)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="pool-name"
                                    name="pool-name"
                                    type="text"
                                    required
                                    placeholder="Enter Pool Name"
                                    value={poolName}
                                    onChange={(e) => setPoolName(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-600"
                                    disabled={isPending || isConfirming}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="invite-code" className="block text-sm font-medium text-gray-700 text-left">
                                Target Pool Amount
                            </label>
                            <div className="mt-1">
                                <input
                                    id="pool-amount"
                                    name="pool-amount"
                                    type="number"
                                    required
                                    placeholder="Enter Amount"
                                    // value={}
                                    onChange={(e) => setPoolAmount(Number(e.target.value))}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-600"
                                    disabled={isPending || isConfirming}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="invite-code" className="block text-sm font-medium text-gray-700 text-left">
                                Contribution per Member
                            </label>
                            <div className="mt-1">
                                <input
                                    id="contribution-per-member"
                                    name="contribution-per-member"
                                    type="number"
                                    required
                                    placeholder="Enter Amount per Member"
                                    // value={inviteCode}
                                    onChange={(e) => setContributionPerMember(Number(e.target.value))}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-600"
                                    disabled={isPending || isConfirming}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="invite-code" className="block text-sm font-medium text-gray-700 text-left">
                                Invite Code (e.g., PP-G72X-B31F)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="invite-code"
                                    name="invite-code"
                                    type="text"
                                    required
                                    placeholder="Enter Code"
                                    value={inviteCode}
                                    onChange={(e) => setInviteCode(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-600"
                                    disabled={isPending || isConfirming}
                                />
                            </div>
                        </div>

                    </div>


                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            // onClick={onClose}
                            className="py-3 px-6 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                            disabled={isPending || isConfirming}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white ${primaryColor} ${primaryBgHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150`}
                            disabled={isPending || isConfirming}
                        >
                            {isPending ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <ArrowRight className="h-5 w-5 mr-2" />
                            )}
                            {isPending || isConfirming ? 'Creating Pool...' : 'Create Pool'}
                        </button>
                    </div>
                </form> */}
            </div>
        </div>
        </div>
    )
}
