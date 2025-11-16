"use client"
import React, { use, useEffect } from 'react'
import { Menu, X, Wallet, Users, Clock, ShieldCheck, Zap, TrendingUp, Handshake, ArrowRight, DollarSign, Calendar, Lock, ChevronDown, ChevronUp, CheckCircle, Link, Home, List, Activity, Settings, Copy, User, ArrowLeft, PiggyBank, Briefcase, FileText } from 'lucide-react';
import { useParams } from 'next/navigation';
import PoolABI from '@/contract/abi/PoolABI.json';
import { usdcAddress } from '@/contract/contract'

import { useAccount, useReadContract, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import usdcABI from '@/contract/abi/usdcABI.json'
import InfoCard from '@/components/InfoCard';
import Header from '@/components/Header';
import StartPool from '@/components/StartPool';
import { toast } from 'react-toastify';

interface Pool {
    id: string;
    name: string;
    contribution: number;
    frequency: string;
    payoutDate: string;
    members: number;
    status: 'Active' | 'Completed' | 'Upcoming';
}


export default function page() {

    const params = useParams();
    const poolId = params.id;
    const [openPool, setOpenPool] = React.useState<boolean>(false);
    const { address } = useAccount()





    const primaryColor = 'bg-blue-700';
    const primaryBgHover = 'hover:bg-blue-800';
    const primaryRingColor = 'ring-blue-700';
    const primaryTextColor = 'text-blue-700';


    const { data: allUser } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'getContributors',
        args: [],
    });

    const { data: poolName } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'poolName',
        args: [],
    });

    const { data: poolStatus } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'poolStatus',
        args: [],
    });

    const { data: referralCode } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'referrer',
        args: [],
    });

    const { data: totalPoolPayout } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'targetAmount',
        args: [],
    });

    const { data: minimumContribution } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'minimumAmount',
        args: [],
    });

    const { data: maxContributor } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'getMaxContributors',
        args: [],
    });
    const { data: currentMember } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'getTotalContributors',
        args: [],

    });

    const { data: currentAmount } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'getCurrentAmountContributed',
        args: [],
    });

    const { data: estimate } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'estimatePayoutFor',
        args: [address as `0x${string}`],
    });

    const { data: cycleDurration } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'cycleDuration',
        args: [],
    });

    const { data: startTime } = useReadContract({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'cycleStartTime',
        args: [],
    });



    console.log('est', estimate);

    // NOTE: add `useContractReads` to your imports: `import { useContractReads } from 'wagmi'`

    const contributorAddresses = Array.isArray(allUser) ? (allUser as string[]).slice(0, 5) : [];

    const contractCalls = contributorAddresses.map((contributor) => ({
        address: poolId as `0x${string}`,
        abi: PoolABI as any,
        functionName: 'estimatePayoutFor',
        args: [contributor as `0x${string}`],
    }));

    const { data: estimates } = useReadContracts({
        contracts: contractCalls,
        // watch: true,
    });

    // `estimates` will be an array aligned with `contributorAddresses`.
    // e.g. to log readable values:


    // console.log(`estimate`, EstimatePayout);

    const { data: allowance } = useReadContract({
        address: usdcAddress as `0x${string}`,
        abi: usdcABI as any,
        functionName: 'allowance',
        args: [address as `0x${string}`, poolId as `0x${string}`],
    });



    const { data: hash, writeContract: deposit, isPending } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed, data, error, isError } =
        useWaitForTransactionReceipt({
            hash,
        })

    const { data: tokenHash, writeContract: tokenApprove, isPending: tokenIsPending } = useWriteContract();

    const { isLoading: tokenIsConfirming, isSuccess: tokenIsConfirmed, data: tokenData, error: tokenError, isError: tokenIsError } =
        useWaitForTransactionReceipt({
            hash: tokenHash,
        });


    const makeContribution = async () => {
        console.log('clicked');

        if (!minimumContribution) {
            toast.error('Minimum contribution has not been set')
            return
        }

        console.log('hello clicked', Number(minimumContribution));


        if (Number(allowance as any) >= Number(minimumContribution as any)) {
            await deposit({
                address: poolId as `0x${string}`,
                abi: PoolABI,
                functionName: 'contribute',
                args: [Number(minimumContribution)],
            });
        } else {
            console.log('hello clicked3');

            await tokenApprove({
                address: usdcAddress as `0x${string}`,
                abi: usdcABI,
                functionName: 'approve',
                args: [poolId as `0x${string}`, Number(minimumContribution)],
            });
            console.log('hello approve')

            if (tokenIsConfirmed) {

                deposit({
                    address: poolId as `0x${string}`,
                    abi: PoolABI,
                    functionName: 'contribute',
                    args: [Number(minimumContribution)],
                });
            }
        }



    }

    if (isError) {
        console.log(error)
    }
    if (isConfirmed) {
        toast.success('Deposit transaction Successful')
    }


    const generateDate =(startTime:number, duration:number)=>{
        const cycle  = startTime + duration;
        const endDate = new Date(cycle * 1000);
        return endDate;
    }

    // e.g. replace `{poolName as string}` with `{displayPoolName}`
    console.log("All Users in Pool: ", allUser);

    // const SinglePoolDashboard: Reapooct.FC<SinglePoolDashboardProps> = ({ pool, poolId, onNavigateBack }) => {

    // Fallback data if pool is undefined (e.g., if newly joined pool isn't in initial mock data list)


    // Provide a local mockPool so the page can render without external props
    const mockPool: Pool = {
        id: 'PL-001',
        name: 'Community Savings Pool',
        contribution: 100,
        frequency: 'Monthly',
        payoutDate: 'Dec 1, 2025',
        members: 6,
        status: 'Active',
    };

    const currentPool = mockPool;
    const totalPayout = currentPool.contribution * currentPool.members;

    // Mock member list
    const mockMembers = [
        { name: 'You (Payer)', status: 'Paid', date: 'Oct 1, 2025' },
        { name: 'Sarah L.', status: 'Paid', date: 'Oct 1, 2025' },
        { name: 'Ben K.', status: 'Due', date: 'Oct 1, 2025' },
        { name: 'Jane D. (Collector)', status: 'Collected', date: 'Oct 15, 2025' },
        { name: 'Aisha T.', status: 'Paid', date: 'Nov 1, 2025' },
        { name: 'Chris W.', status: 'Due', date: 'Nov 1, 2025' },
    ].slice(0, currentPool.members);

    // useEffect(() => {

    //     if (!estimates) return;
    //     console.log(estimates);
    //     estimates.forEach((e, i) => {
    //         console.log(`Estimate for ${contributorAddresses[i]}:`, e?.toString?.() ?? e);
    //     });
    // }, [estimates, contributorAddresses]);

    return (
        <main>

            <Header />
            <section className="min-h-[80vh] py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <button
                                //   onClick={onNavigateBack}
                                className="flex items-center text-gray-600 hover:text-blue-700 font-medium transition duration-150"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Back to All Pools
                            </button>
                        </div>

                        {/* Actions: Deposit (when Active) and Start Pool (when Not Started) */}
                        <div className="flex items-center space-x-3">
                            {Number(poolStatus) === 1 && (
                                <button
                                    onClick={makeContribution}
                                    className={`inline-flex items-center px-4 py-2 rounded-xl font-medium text-white ${primaryColor} ${primaryBgHover} shadow-sm`}
                                >
                                    <Wallet className="h-4 w-4 mr-2" />
                                    Deposit Quota
                                </button>
                            )}

                            {/* Start Pool button placed in the header area (right side) */}
                            {!(Number(poolStatus) === 1 || Number(poolStatus) === 2) && (
                                <div>
                                    <button
                                        onClick={() => setOpenPool(true)}
                                        className={`inline-flex items-center px-4 py-2 rounded-xl font-medium text-white ${primaryColor} ${primaryBgHover} shadow-sm`}
                                    >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Start Pool
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <header className="mb-10 bg-white p-8 rounded-2xl shadow-xl border-l-8 border-blue-500">
                        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
                            <PiggyBank className={`${primaryTextColor} h-8 w-8 mr-3`} />
                            {poolName as string}
                        </h1>
                        <div className="mt-3 flex items-center space-x-4 text-gray-500">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full border bg-green-100 text-green-800 border-green-300`}>
                                {poolStatus as number === 0 ? 'Not Started' : poolStatus as number === 1 ? 'Active' : 'Completed'}
                            </span>
                            <div className="flex items-center text-sm">
                                <Link className="h-4 w-4 mr-1" />
                                Pool ID: <span className="font-mono ml-1">{referralCode as string}</span>
                            </div>
                        </div>
                    </header>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <InfoCard
                            title="Total Pool Payout"
                            value={`$${totalPoolPayout ? (Number(totalPoolPayout) / 1e6).toLocaleString() : '0'}`}
                            icon={DollarSign}
                            color="#10B981" // Green
                        />
                        <InfoCard
                            title="Minimum Contribution"
                            value={`$${minimumContribution ? (Number(minimumContribution) / 1e6).toLocaleString() : '0'}`}
                            icon={Briefcase}
                            color="#3B82F6" // Blue
                        />
                        <InfoCard
                            title="Next Payout Date"
                            value={(startTime && cycleDurration) ? generateDate(Number(startTime), Number(cycleDurration)).toLocaleString() : '—'}
                            icon={Calendar}
                            color="#F59E0B" // Amber
                        />
                        <InfoCard
                            title="Current Member in Pool"
                            value={currentMember ? Number(currentMember).toString() : '0'}
                            icon={Calendar}
                            color="#06B6D4" // Cyan (nicer)
                        />

                        <InfoCard
                            title="Expected Member in Pool"
                            value={maxContributor ? Number(maxContributor).toString() : '0'}
                            icon={Calendar}
                            color="#8B5CF6" // Purple
                        />
                        <InfoCard
                            title="Amount in Escrow"
                            value={currentAmount ? (Number(currentAmount) / 1e6).toLocaleString() : '0'}
                            icon={Calendar}
                            color="#8B5CF6" // Purple
                        />
                    </div>

                    {/* Payout Schedule & Members */}
                    <div className="">

                        {/* Schedule Card */}
                        {/* <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FileText className="h-6 w-6 mr-2 text-blue-500" />
                                My P
                            </h2>
                            <div className="space-y-4">
                                {(contributorAddresses && contributorAddresses.length > 0) ? (
                                    contributorAddresses.map((addr, index) => {
                                        const raw = estimates?.[index];
                                        // basic formatting: try to show as USDC (assumes 18 decimals). Fall back to raw string.
                                        const estimateDisplay = raw
                                            ? `${(Number(raw as any) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 6 })} USDC`
                                            : '—';

                                        const shortAddr = typeof addr === 'string' ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : String(addr);

                                        return (
                                            <div
                                                key={`${addr}-${index}`}
                                                className="flex justify-between items-center p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition duration-150"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-sm font-semibold w-8 text-center text-gray-500">{index + 1}.</div>
                                                    <p className="font-medium text-gray-700">{shortAddr}</p>
                                                </div>

                                                <div className="text-sm text-gray-500 font-medium text-right min-w-[140px]">
                                                    {estimateDisplay}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-gray-500 p-3">No contributor estimates available yet.</div>
                                )}
                            </div>
                        </div> */}

                        {/* Members Overview */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <Users className="h-6 w-6 mr-2 text-blue-500" />
                                {Array.isArray(allUser) ? allUser.length : 0} Pool Members
                            </h2>
                            <ul className="space-y-4">
                                {(Array.isArray(allUser) ? allUser : []).map((member: any, index: number) => (
                                    <li key={index} className="flex items-center space-x-3">
                                        <User className="h-5 w-5 text-gray-400" />
                                        <span className="text-gray-700">{member}</span>
                                    </li>
                                ))}
                            </ul>
                            {/* <button className={`mt-6 w-full py-3 rounded-xl shadow-md text-white font-medium ${primaryColor} ${primaryBgHover} transition duration-150`}>
                                Invite More Members
                            </button> */}
                        </div>

                    </div>
                </div>
                {openPool && (

                    <StartPool onClose={() => setOpenPool(false)} />
                )}

            </section>
        </main>
    );
}