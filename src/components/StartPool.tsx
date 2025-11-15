import React, { useState } from 'react'
import { X, Handshake, ArrowRight } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import PoolABI from '@/contract/abi/PoolABI.json';
import { PoolFactoryAddress } from '../contract/contract';
import { useParams, useRouter } from 'next/navigation';
import { redirect } from "next/navigation";
import { toast } from 'react-toastify';

export default function CreatePool({ onClose }: { onClose: () => void }) {

    const router = useRouter();
    const {id} = useParams();

    // const [inviteCode, setInviteCode] = useState('');
    const [poolName, setPoolName] = useState('');
    // const [poolAmount, setPoolAmount] = useState(0);
    // const [contributionPerMember, setContributionPerMember] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [poolDuration, setPoolDuration] = useState('');

    // const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

 
    const { data: hash, writeContract, isPending } = useWriteContract();


    const primaryColor = 'bg-blue-700';
    const primaryBgHover = 'hover:bg-blue-800';
    const primaryRingColor = 'ring-blue-700';
    const primaryTextColor = 'text-blue-700';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let durationInDays = 0;
        if (poolDuration === 'DAILY') {
            durationInDays = 1 * 24 * 60 * 60; // 1 day in seconds
        } else if (poolDuration === 'WEEKLY') {
            durationInDays = 7 * 24 * 60 * 60; // 7 days in seconds
        } else if (poolDuration === 'MONTHLY') {
            durationInDays = 30 * 24 * 60 * 60; // 30 days in seconds
        }else {
            toast.error("Please select a valid pool duration");
            return;
        }
console.log("Duration in Days: ", durationInDays);

        // setIsLoading(true);
        writeContract({
            address: id as `0x${string}`,
            abi: PoolABI,
            functionName: 'startPool',
            args: [durationInDays],
        });


    };
    const { isLoading: isConfirming, isSuccess: isConfirmed, data, error, isError } =
        useWaitForTransactionReceipt({
            hash,
        })

    if (isConfirmed) {
        console.log(data);
        // const log = data.logs[0];
        // const myData = log.data
        // const firstSlot = myData.slice(2, 66);
        // const poolAddress = "0x" + firstSlot.slice(24);
        // console.log("Pool Address: ", poolAddress);
        // // router.push("/poolAddress")
        // redirect(`/${poolAddress}`);

        // console.log("Pool Created Successfully");
        console.log(hash)
    }

    if (isError) {
        console.log("Error: ", error);
    }
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center p-4 transition-opacity duration-300  bg-opacity-20 backdrop-blur-sm" aria-modal="true" role="dialog">
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
                Start Pool
                </h3>
                <p className="mt-2 text-gray-500">
                Enter the unique invite code you received to instantly join your community pool.
                </p>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-6">
                <div>
                    <label htmlFor="invite-code" className="block text-sm font-medium text-gray-700 text-left">
                    Pool Duration (e.g., Daily, Weekly, Monthly)
                    </label>
                    <div className="mt-1">
                        <select
                            id="pool-duration"
                            name="pool-duration"
                            required
                            value={poolDuration}
                            onChange={(e) => setPoolDuration(e.target.value)}
                            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-600"
                            disabled={isPending || isConfirming}
                        >
                            <option value="" disabled>
                                Select Duration
                            </option>
                            <option value="DAILY">Daily</option>
                            <option value="WEEKLY">Weekly</option>
                            <option value="MONTHLY">Monthly</option>
                            {/* <option value="YEARLY">Yearly</option> */}
                        </select>
                    </div>
                </div>
               

                </div>


                <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onClose}
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
                    {isPending || isConfirming ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ) : (
                    <ArrowRight className="h-5 w-5 mr-2" />
                    )}
                    {isPending || isConfirming ? 'Starting Pool...' : 'Start Pool'}
                </button>
                </div>
            </form>
            </div>
        </div>
    )
}
