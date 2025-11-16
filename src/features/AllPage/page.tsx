"use client";
import React, { useState } from 'react';
import { Handshake, Wallet, DollarSign, ArrowRight, Users, Calendar, Clock, ChevronUp, ChevronDown, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CreatePool from '@/components/CreatePool';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '@/components/Header';

const primaryColor = 'bg-blue-700';
const primaryBgHover = 'hover:bg-blue-800';
const primaryTextColor = 'text-blue-700';

interface FeatureCardProps {
icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  primaryColor?: string; // optional, defaults to blue
}

interface Question {

  question: string;
  answer: string;

}

export default function page() {
  const [openModal, setOpenModal] = useState(false);
  const { address } = useAccount();
  const router = useRouter();

  const handleJoinClick = () => {
    if (!address) {
      toast.error(`Connect Wallet to visit dashboard`);
      return;
    }
    router.push(`/dashboard/${address}`);
  };

  return (
    <div className="min-h-screen bg-white font-[Inter]">
      <Header/>
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 lg:pt-32 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Text Content */}
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="flex items-center space-x-2 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-300">
                    <Handshake className="h-4 w-4" />
                    <span>Trust, Transparency, Teamwork.</span>
                  </div>
                </div>

                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:leading-none sm:text-6xl lg:mt-6 lg:text-5xl xl:text-6xl">
                  The Future of Group Savings,{' '}
                  <span className={`${primaryTextColor} block md:inline`}>
                    Digitally Secured.
                  </span>
                </h1>

                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  PoolPay digitizes the traditional Rotating Savings and Credit Association (ROSCA),
                  making it transparent, secure, and flexible for modern communities. Achieve big
                  financial goals together through a secure Group Savings Pool.
                </p>

                <div className="mt-10 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => setOpenModal(true)}
                    className={`${primaryColor} ${primaryBgHover} flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white md:py-4 md:text-lg md:px-10 shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]`}
                  >
                    Create Saving Pool
                  </button>

                  <button
                    onClick={handleJoinClick}
                    className={`flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-blue-700 text-base font-medium text-blue-700 bg-white md:py-4 md:text-lg md:px-10 hover:bg-blue-50 transition duration-300 rounded-xl`}
                  >
                    My Dashboard
                  </button>
                </div>
              </div>

              {/* Visual Section */}
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden p-6 bg-white border border-gray-100">
                  <div className="w-full h-96 flex flex-col items-center justify-center space-y-4">
                    <div className="relative w-40 h-40 bg-blue-200 rounded-full flex items-center justify-center">
                      <DollarSign className={`h-16 w-16 ${primaryTextColor}`} />
                      <div className="absolute inset-0 rounded-full ring-4 ring-blue-300 animate-pulse"></div>
                    </div>
                    <p className="text-xl font-semibold text-gray-700">
                      Visualize your collective savings journey.
                    </p>
                    <p className="text-sm text-gray-500">
                      Secure digital visualization of your savings pool.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks/>
         <HowItWorks />
        {/* <Benefits /> */}
        <Testimonials />
        <FAQs />
        <Footer/>

        {/* Create Pool Modal */}
        {openModal && <CreatePool onClose={() => setOpenModal(false)} />}
      </main>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    { icon: Users, title: 'Form Your Pool', description: 'Create a savings pool with trusted members. Define the contribution amount and the rotation frequency (weekly, monthly, etc.).' },
    { icon: DollarSign, title: 'Contribute Regularly', description: 'Each member contributes the agreed-upon amount on the specified schedule directly through the PoolPay platform.' },
    { icon: Calendar, title: 'Collect Your Payout', description: 'Every cycle, one member is randomly or pre-agreed upon to receive the entire collected sum (the "payout").' },
    { icon: Clock, title: 'Rotation Completes', description: 'The process rotates until every member of the pool has had a turn to collect the full payout, helping everyone reach their financial goals.' },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-base font-semibold tracking-wider ${primaryTextColor} uppercase`}>The ROSCA Mechanism</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How PoolPay Digitizes Group Savings Pools
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            It's simple, fair, and based on community trust—now digitally secured with enhanced tracking and transparency.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative pt-6 text-center group">
                <div className="flow-root bg-gray-50 rounded-xl px-6 pb-8 pt-10 h-full shadow-xl transition duration-300 group-hover:shadow-2xl group-hover:bg-blue-50 group-hover:scale-[1.03]">
                  <div className="inline-block relative">
                    <div className={`-mt-12 p-3 ${primaryColor} rounded-full inline-block shadow-lg ring-4 ring-white`}>
                      <step.icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight text-gray-900">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// const FeatureCard = ({ icon: Icon, title, description }:FeatureCardProps) => (
//   <div className="pt-6 group">
//     <div className="flow-root bg-white rounded-2xl px-6 pb-8 pt-10 h-full shadow-lg ring-1 ring-gray-100 transition duration-300 group-hover:shadow-xl group-hover:ring-blue-300">
//       <div className="-mt-6">
//         <div className={`p-3 ${primaryColor} inline-block rounded-lg shadow-xl transition duration-300 group-hover:scale-105`}>
//           <Icon className="h-6 w-6 text-white" aria-hidden="true" />
//         </div>
//         <h3 className="mt-5 text-lg font-medium tracking-tight text-gray-900">{title}</h3>
//         <p className="mt-3 text-base text-gray-500">{description}</p>
//       </div>
//     </div>
//   </div>
// );

// const Benefits = () => {
//   const features = [
//     { icon: ShieldCheck, title: 'Guaranteed Security', description: 'All pooled funds are held in secure, segregated accounts, ensuring every member receives their full payout without counterparty risk.' },
//     { icon: Zap, title: 'Automated Payouts', description: 'No manual transfers. Once your turn comes, the funds are automatically disbursed to your linked bank account with instant notification.' },
//     { icon: TrendingUp, title: 'Boosted Savings Discipline', description: 'The commitment to the pool encourages consistent, disciplined saving, helping you achieve big financial goals faster.' },
//     { icon: Handshake, title: 'Real-Time Transparency', description: 'Every contribution and the pool schedule is visible to all members in real-time on the platform, fostering unbreakable trust.' },
//     { icon: Users, title: 'Smart Vetting Options', description: 'Create private pools with known members, or join verified public pools managed with robust trust ratings and vetting.' },
//     { icon: Lock, title: 'Digital Contract Logic', description: 'The system uses automated, logic-driven rules to manage the rotation and payouts securely, minimizing human error and disputes.' },
//   ];

//   return (
//     <section id="benefits" className="py-24 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <h2 className={`text-base font-semibold tracking-wider ${primaryTextColor} uppercase`}>Why PoolPay?</h2>
//           <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//             Modernizing the Tradition, Maximizing Trust
//           </p>
//           <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
//             We solve the core challenges of traditional Rotating Savings systems: lack of transparency and trust issues.
//           </p>
//         </div>

//         <div className="mt-16">
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {features.map((feature) => (
//               <FeatureCard key={feature.title} {...feature} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


const FAQs = () => {
  const faqData = [
    {
      question: "What is a Rotating Savings and Credit Association (ROSCA)?",
      answer: "A Rotating Savings and Credit Association (ROSCA) is a system where a group of people agree to contribute a fixed amount of money over a set period. Periodically, the entire collected sum (the 'pot') is paid out to one member on a rotating basis until everyone has received the payout."
    },
    {
      question: "How does PoolPay ensure my funds are safe?",
      answer: "PoolPay partners with regulated financial institutions to hold all pooled funds in secure, segregated accounts. The digital contract logic ensures that funds are only disbursed according to the agreed-upon rotation schedule, eliminating the risk of fraud or default common in informal systems."
    },
    {
      question: "What happens if a member misses a contribution?",
      answer: "Our automated system enforces strict rules. If a payment is missed, the pool's security is immediately activated. The system manages late fees or, in severe cases, the suspension and collection process from the defaulting member, ensuring the payout schedule remains intact for all other participants."
    },
    {
      question: "Can I set up a pool with my own friends/family?",
      answer: "Absolutely. PoolPay allows you to create private pools where you invite only trusted individuals. You set the rules, the contribution amount, and the rotation schedule. This is the heart of the community-based Group Savings model."
    },
    {
      question: "Is PoolPay only for large amounts?",
      answer: "No. PoolPay supports pools of all sizes and frequencies, from small weekly contributions to large monthly savings goals. It is designed to be flexible for all financial goals, big or small."
    },
  ];

  return (
    <section id="faqs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-base font-semibold tracking-wider ${primaryTextColor} uppercase`}>Questions? We Have Answers.</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className={`text-base font-semibold tracking-wider ${primaryTextColor} uppercase`}>Trust & Success</p>
        <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          What Our Community Says
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            quote: "PoolPay helped me save up the deposit for my first apartment in just six months. The security and transparency gave me confidence.",
            name: "Aisha T.",
            role: "Small Business Owner"
          },
          {
            quote: "We use PoolPay for our yearly business capital rotation. It’s faster and more reliable than any traditional method we've tried.",
            name: "Ben C.",
            role: "Tech Consultant"
          },
          {
            quote: "The interface is so easy to use. I love seeing the pool balance update in real-time. It truly is the digital age of group savings.",
            name: "Kemi O.",
            role: "Freelance Designer"
          },
        ].map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-xl ring-1 ring-blue-100 flex flex-col justify-between transition duration-300 hover:shadow-2xl hover:border-blue-300 border border-transparent">
            <p className="text-xl italic text-gray-700">"{testimonial.quote}"</p>
            <div className="mt-6 pt-4 border-t border-blue-200">
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className={`text-sm text-blue-700`}>{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 mt-10">
    <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
        <div className="px-5 py-2">
          <a href="#about" className="text-base text-gray-400 hover:text-gray-300">
            About Us
          </a>
        </div>
        <div className="px-5 py-2">
          <a href="#security" className="text-base text-gray-400 hover:text-gray-300">
            Security
          </a>
        </div>
        <div className="px-5 py-2">
          <a href="#privacy" className="text-base text-gray-400 hover:text-gray-300">
            Privacy
          </a>
        </div>
        <div className="px-5 py-2">
          <a href="#contact" className="text-base text-gray-400 hover:text-gray-300">
            Contact
          </a>
        </div>
      </nav>
      <p className="mt-8 text-center text-base text-gray-500">
        &copy; {new Date().getFullYear()} PoolPay, Inc. All rights reserved.
      </p>
    </div>
  </footer>
);

const FAQItem = ({ question, answer }:Question) => {
  const [isOpen, setIsOpen] = useState(false);
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
