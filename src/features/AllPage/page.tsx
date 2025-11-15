"use client"
import React, { useState } from 'react';
import { Menu, X, Wallet, Users, Clock, ShieldCheck, Zap, TrendingUp, Handshake, ArrowRight, DollarSign, Calendar, Lock, ChevronDown, ChevronUp, CheckCircle, Link, Home, List, Activity, Settings, Copy, User, ArrowLeft, PiggyBank, Briefcase, FileText } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CreatePool from '@/components/CreatePool';
import { useParams } from 'next/navigation';

// --- TypeScript Interface Definitions ---

interface NavItem {
  name: string;
  href: string;
}

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Pool {
  id: string;
  name: string;
  contribution: number;
  frequency: string;
  payoutDate: string;
  members: number;
  status: 'Active' | 'Completed' | 'Upcoming';
}

interface NavProps {
  onNavigate: (page: 'home' | 'dashboard' | 'login') => void;
  currentPage: 'home' | 'dashboard' | 'login' | 'single-pool';
}

interface HeroProps {
  onNavigate: (page: 'home' | 'dashboard' | 'login') => void;
  onOpenJoinModal: () => void;
}

interface DashboardProps {
  pools: Pool[];
  userId: string;
  onSelectPool: (poolId: string) => void; // New prop for selecting a single pool
}

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigate: (page: 'home' | 'login') => void;
}

interface SinglePoolDashboardProps {
  pool: Pool | undefined;
  poolId: string;
  onNavigateBack: () => void;
}

// Use a clean, professional color palette
const primaryColor: string = 'bg-blue-700';
const primaryBgHover: string = 'hover:bg-blue-800';
const primaryTextColor: string = 'text-blue-700';

// --- Utility Components ---

const FeatureCard: React.FC<Feature> = ({ icon: Icon, title, description }) => (
  <div className="pt-6 group">
    <div className="flow-root bg-white rounded-2xl px-6 pb-8 pt-10 h-full shadow-lg ring-1 ring-gray-100 transition duration-300 group-hover:shadow-xl group-hover:ring-blue-300">
      <div className="-mt-6">
        <div className={`p-3 ${primaryColor} inline-block rounded-lg shadow-xl transition duration-300 group-hover:scale-105`}>
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-lg font-medium tracking-tight text-gray-900">{title}</h3>
        <p className="mt-3 text-base text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

const FAQItem: React.FC<FAQ> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const Icon = isOpen ? ChevronUp : ChevronDown;

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg text-gray-800 hover:text-blue-700 transition duration-150">{question}</span>
        <Icon className={`h-6 w-6 transition-transform duration-300 ${primaryTextColor} ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-base text-gray-600 pr-10">{answer}</p>
      </div>
    </div>
  );
};

// --- MODAL COMPONENTS ---

const JoinPoolModal: React.FC<{ onClose: () => void, onJoin: (code: string) => void }> = ({ onClose, onJoin }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  // Mock handler for joining the pool
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    setIsLoading(true);

    // Simulate API call to validate invite code and join pool
    setTimeout(() => {
      setIsLoading(false);
      // CRITICAL UPDATE: Navigate to the single pool dashboard after joining
      onJoin(inviteCode.trim().toUpperCase());
    }, 1500);
  };

  return (
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
            Join a Group Savings Pool
          </h3>
          <p className="mt-2 text-gray-500">
            Enter the unique invite code you received to instantly join your community pool.
          </p>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="invite-code" className="block text-sm font-medium text-gray-700 text-left">
              Pool Invite Code (e.g., PP-G72X-B31F)
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
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-6 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white ${primaryColor} ${primaryBgHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150`}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <ArrowRight className="h-5 w-5 mr-2" />
              )}
              {isLoading ? 'Joining Pool...' : 'Join Pool'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- CORE LAYOUT COMPONENTS ---

const Nav: React.FC<NavProps> = ({ onNavigate, currentPage }) => {
  const param = useParams();
 
  
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const navItems: NavItem[] = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'FAQs', href: '#faqs' },
  ];

  const handleLinkClick = (page: 'home' | 'dashboard' | 'login') => {
    setIsOpen(false);
    onNavigate(page);
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
          {currentPage === 'home' && (
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
          )}

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 lg:ml-8 space-x-4">
            {currentPage === 'dashboard' || currentPage === 'single-pool' ? (
              <button
                onClick={() => handleLinkClick('home')}
                className={`text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition duration-300 bg-gray-500 hover:bg-gray-600`}
              >
                Logout
              </button>
            ) : currentPage === 'login' ? (
              <button
                onClick={() => handleLinkClick('home')}
                className={`text-blue-700 font-semibold py-2 px-4 rounded-xl transition duration-300 hover:bg-blue-50`}
              >
                Back to Home
              </button>
            ) : ( // currentPage === 'home'
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
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (omitted for brevity but logic remains) */}
    </header>
  );
};

const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenJoinModal }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <main>
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 lg:pt-32 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center lg:justify-start">
                <div className="flex items-center space-x-2 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-300">
                  <Handshake className="h-4 w-4" />
                  <span>Trust, Transparency, Teamwork.</span>
                </div>
              </div>
              <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:leading-none sm:text-6xl lg:mt-6 lg:text-5xl xl:text-6xl">
                The Future of Group Savings,{' '}
                <span className={`${primaryTextColor} block md:inline`}>Digitally Secured.</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                PoolPay digitizes the traditional **Rotating Savings and Credit Association (ROSCA)**, making it transparent, secure, and flexible for modern communities. Achieve big financial goals, together through a secure **Group Savings Pool**.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setOpenModal(true)}
                  className={`${primaryColor} ${primaryBgHover} flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white md:py-4 md:text-lg md:px-10 shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]`}
                >
                  Create Saving Pool
                </button>
                <button
                  onClick={onOpenJoinModal}
                  className={`flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-blue-700 text-base font-medium text-blue-700 bg-white md:py-4 md:text-lg md:px-10 hover:bg-blue-50 transition duration-300 rounded-xl`}
                >
                  Join a Pool with an Invite
                </button>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden p-6 bg-white border border-gray-100">
                {/* Visual simulation of money flowing into a central pool */}
                <div className="w-full h-96 flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-40 h-40 bg-blue-200 rounded-full flex items-center justify-center">
                    <DollarSign className={`h-16 w-16 ${primaryTextColor}`} />
                    <div className="absolute inset-0 rounded-full ring-4 ring-blue-300 animate-pulse"></div>
                  </div>
                  <p className="text-xl font-semibold text-gray-700">Visualize your collective savings journey.</p>
                  <p className="text-sm text-gray-500">Secure digital visualization of your savings pool.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {openModal && (
        <CreatePool onClose={()=>setOpenModal(false)}/>
      )}
    </main>
  );
}


const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  // ... (Login logic remains the same)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mock login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
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
              onClick={() => onNavigate('home')}
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
  );
};


// --- SINGLE POOL DASHBOARD COMPONENT (NEW) ---

const SinglePoolDashboard: React.FC<SinglePoolDashboardProps> = ({ pool, poolId, onNavigateBack }) => {

  // Fallback data if pool is undefined (e.g., if newly joined pool isn't in initial mock data list)
  const mockPool: Pool = {
    id: poolId,
    name: `Community Pool: ${poolId}`,
    contribution: 350,
    frequency: 'Monthly',
    payoutDate: 'Feb 01, 2026',
    members: 12,
    status: 'Active',
  };

  const currentPool = pool || mockPool;
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

  const PayoutInfoCard: React.FC<{ title: string, value: string, icon: React.ElementType, color: string }> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-l-2 border-gray-100" style={{ borderColor: color }}>
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color} bg-opacity-10`} style={{ color: color }}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-extrabold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-[80vh] py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onNavigateBack}
          className="flex items-center text-gray-600 hover:text-blue-700 font-medium transition duration-150 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to All Pools
        </button>

        <header className="mb-10 bg-white p-8 rounded-2xl shadow-xl border-l-8 border-blue-500">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            <PiggyBank className={`${primaryTextColor} h-8 w-8 mr-3`} />
            {currentPool.name}
          </h1>
          <div className="mt-3 flex items-center space-x-4 text-gray-500">
            <span className={`px-3 py-1 text-sm font-medium rounded-full border bg-green-100 text-green-800 border-green-300`}>
              {currentPool.status}
            </span>
            <div className="flex items-center text-sm">
              <Link className="h-4 w-4 mr-1" />
              Pool ID: <span className="font-mono ml-1">{currentPool.id}</span>
            </div>
          </div>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <PayoutInfoCard
            title="Total Pool Payout"
            value={`$${totalPayout.toLocaleString()}`}
            icon={DollarSign}
            color="#10B981" // Green
          />
          <PayoutInfoCard
            title="Your Contribution"
            value={`$${currentPool.contribution.toLocaleString()} ${currentPool.frequency}`}
            icon={Briefcase}
            color="#3B82F6" // Blue
          />
          <PayoutInfoCard
            title="Next Payout Date"
            value={currentPool.payoutDate}
            icon={Calendar}
            color="#F59E0B" // Amber
          />
        </div>

        {/* Payout Schedule & Members */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Schedule Card */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-500" />
              Payout Schedule & Status
            </h2>
            <div className="space-y-4">
              {mockMembers.map((member, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition duration-150">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-semibold w-8 text-center text-gray-500">{index + 1}.</div>
                    <p className="font-medium text-gray-700">{member.name}</p>
                  </div>
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${member.status === 'Collected' ? 'bg-indigo-100 text-indigo-800' : member.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {member.status}
                  </div>
                  <p className="text-sm text-gray-500 min-w-[100px] text-right">{member.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Members Overview */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="h-6 w-6 mr-2 text-blue-500" />
              {currentPool.members} Pool Members
            </h2>
            <ul className="space-y-3">
              {mockMembers.map((member, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{member.name.replace(/\s\(.*\)/, '')}</span>
                </li>
              ))}
            </ul>
            <button className={`mt-6 w-full py-3 rounded-xl shadow-md text-white font-medium ${primaryColor} ${primaryBgHover} transition duration-150`}>
              Invite More Members
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- DASHBOARD COMPONENT ---

const Dashboard: React.FC<DashboardProps> = ({ pools, userId, onSelectPool }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success'>('idle');

  // Mock referral link generation
  const referralLink = `https://poolpay.app/invite?ref=${userId}`;

  const getStatusClasses = (status: Pool['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Upcoming':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Completed':
        return 'bg-gray-100 text-gray-500 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-500 border-gray-300';
    }
  };

  const handleCopy = () => {
    try {
      const tempInput = document.createElement('textarea');
      tempInput.value = referralLink;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="min-h-[80vh] py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            <Activity className={`${primaryTextColor} h-8 w-8 mr-3`} />
            My Pools Dashboard
          </h1>
          <p className="mt-2 text-xl text-gray-500">
            Welcome back! Here's an overview of the Group Savings Pools you are participating in.
          </p>
          <div className="mt-2 text-sm text-gray-400">
            User ID: <span className="font-mono text-gray-600">{userId}</span>
          </div>
        </header>

        {/* Referral Link Card (omitted for brevity) */}

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Active & Upcoming Pools ({pools.filter(p => p.status !== 'Completed').length})</h2>

        {pools.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-gray-200">
            <List className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg text-gray-600">You haven't joined any active pools yet. Get started by creating one or accepting an invite!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pools.map((pool) => (
              <div
                key={pool.id}
                className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-blue-500 hover:shadow-2xl transition duration-300 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer"
                onClick={() => onSelectPool(pool.id)} // Select pool on click
              >

                {/* Pool Info */}
                <div className="flex-1 min-w-0 mb-4 md:mb-0">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-extrabold text-gray-900 truncate">{pool.name}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusClasses(pool.status)}`}>
                      {pool.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{pool.members} Members</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{pool.frequency}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="flex space-x-6 md:space-x-12 items-center">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Your Contribution</p>
                    <p className="text-lg font-bold text-gray-900">${pool.contribution.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Next Payout Date</p>
                    <p className="text-lg font-bold text-blue-700">{pool.payoutDate}</p>
                  </div>

                  {/* Action Button */}
                  <div className={`p-3 rounded-full ${primaryColor} text-white hover:bg-blue-800 transition duration-150 shadow-md`}>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};


// Main Application Component
const App: React.FC = () => {
  // Updated navigation state to include 'single-pool'
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'login' | 'single-pool'>('home');
  const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null); // New state to hold the pool ID for the detail view
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Mock data now uses useState for dynamic updates
  const [myPools, setMyPools] = useState<Pool[]>([
    { id: 'p1', name: 'The Big Dream Savings Pool', contribution: 500, frequency: 'Monthly', payoutDate: 'Dec 15, 2025', members: 10, status: 'Active' },
    { id: 'p2', name: 'Weekly Coffee Capital', contribution: 25, frequency: 'Weekly', payoutDate: 'Nov 29, 2025', members: 4, status: 'Active' },
    { id: 'p3', name: 'Summer Vacation Fund', contribution: 1200, frequency: 'Quarterly', payoutDate: 'Jan 01, 2026', members: 5, status: 'Upcoming' },
    { id: 'p4', name: 'Initial Investment Pool', contribution: 100, frequency: 'Monthly', payoutDate: 'Oct 31, 2024', members: 8, status: 'Completed' },
  ]);

  const mockUserId = 'POOLPAY_USER_8347E0B9';


  // Updated navigateTo function to handle the optional poolId
  const navigateTo = (page: 'home' | 'dashboard' | 'login' | 'single-pool', poolId: string | null = null) => {
    setCurrentPage(page);
    setSelectedPoolId(poolId); // Set the ID if navigating to single-pool
    window.scrollTo(0, 0); // Scroll to top on navigation
  };

  const handleLoginSuccess = () => {
    navigateTo('dashboard');
  };

  const handleJoinPool = (code: string) => {
    // 1. Mock: Create a new pool entry for the joined code (to make the detail page find the data)
    const newPool: Pool = {
      id: code, // Use code as ID
      name: `Community Pool: ${code}`,
      contribution: 350,
      frequency: 'Monthly',
      payoutDate: 'Feb 01, 2026',
      members: 12,
      status: 'Active',
    };
    setMyPools(prev => [...prev.filter(p => p.id !== code), newPool]); // Filter existing just in case

    setIsJoinModalOpen(false); // 2. Close modal

    // 3. CRITICAL: Navigate to the single pool dashboard with the code
    navigateTo('single-pool', code);
  };

  const handleSelectPool = (poolId: string) => {
    navigateTo('single-pool', poolId);
  }

  const renderContent = () => {
    if (currentPage === 'dashboard') {
      return <Dashboard pools={myPools.filter(p => p.status !== 'Completed')} userId={mockUserId} onSelectPool={handleSelectPool} />;
    }

    if (currentPage === 'single-pool' && selectedPoolId) {
      const poolData = myPools.find(p => p.id === selectedPoolId);
      return <SinglePoolDashboard pool={poolData} poolId={selectedPoolId} onNavigateBack={() => navigateTo('dashboard')} />;
    }

    if (currentPage === 'login') {
      return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={(page) => navigateTo(page)} />;
    }

    // Default: currentPage === 'home' (Landing Page)
    return (
      <main>
        {/* Pass navigateTo for primary CTA, and setIsJoinModalOpen for secondary CTA */}
        <Hero
          onNavigate={(page) => navigateTo(page)}
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />
        {/* ... (HowItWorks, Benefits, FAQs, Footer components omitted for brevity, they remain unchanged) */}
        {/* Placeholder for other static sections to keep file small */}
        <div className="bg-gray-200 py-16 text-center text-gray-500">
          <p>Static Content Sections (How It Works, Benefits, FAQs) would appear here.</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white font-[Inter]">
      <Nav onNavigate={(page) => navigateTo(page)} currentPage={currentPage} />
      {renderContent()}
      <Footer />

      {/* Conditional Modal Rendering */}
      {isJoinModalOpen && (
        <JoinPoolModal
          onClose={() => setIsJoinModalOpen(false)}
          onJoin={handleJoinPool}
        />
      )}
    </div>
  );
}

// Minimal static components for file completion
const HowItWorks: React.FC = () => <div></div>;
const Benefits: React.FC = () => <div></div>;
const Testimonials: React.FC = () => <div></div>;
const FAQs: React.FC = () => <div></div>;
const Footer: React.FC = () => (
  <footer className="bg-gray-900 mt-10">
    <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <p className="mt-8 text-center text-base text-gray-500">
        &copy; {new Date().getFullYear()} PoolPay, Inc. All rights reserved.
      </p>
    </div>
  </footer>
);
// End of minimal static components

export default App;