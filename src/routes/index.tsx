import { createFileRoute, Link } from '@tanstack/react-router'
import { Zap, DollarSign, CircleFadingPlus } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const features = [
    {
      icon: <Zap className='w-12 h-12 text-cyan-400' />,
      title: 'Crafted Powerful Prompts',
      description:
        'Handcrafted intelligent prompts that drive your bets. Get insights, predictions, and recommendations from your data. Promopts designed for sports betting success.',
    },
    {
      icon: <CircleFadingPlus className='w-12 h-12 text-cyan-400' />,
      title: 'Add Your Own Prompts',
      description:
        'Add new prompts to refine your betting strategy. Get insights from your sports betting data and make smarter bets. NOTE: These will not be saved and will reset on page refresh.',
    },
    {
      icon: <DollarSign className='w-12 h-12 text-cyan-400' />,
      title: 'Token Calculator',
      description:
        'Calculate token usage and costs for your AI interactions. Optimize your prompts for performance and budget.',
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900'>
      <section className='relative py-20 px-6 text-center overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10'></div>
        <div className='relative max-w-5xl mx-auto'>
          <div className='flex items-center justify-center gap-6 mb-6'>
            <h1 className='text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]'>
              <span className='text-gray-300'>SPORTS BET</span>{' '}
              <span className='bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                PROMPTER
              </span>
            </h1>
          </div>
          <p className='text-2xl md:text-3xl text-gray-300 mb-4 font-light'>
            Intelligent prompts for sports betting insights
          </p>
          <p className='text-lg text-gray-400 max-w-3xl mx-auto mb-8'>
            Get better predictions, recommendations, and insights from
            your favorite AI chat client using our sports betting
            prompts. Optimize your bets with AI-driven prompts. Build
            bets backed by data and powered by AI. Calculate token
            usage and costs for your interactions.
          </p>

          <p className='text-2xl md:text-3xl text-gray-300 mb-4 font-light mt-3'>
            Various sports to choose from
          </p>
          <div className='flex flex-wrap justify-center gap-3 mb-8'>
            <Link
              to='/ncaa-prompts'
              className='bg-slate-800/60 border border-slate-600 px-4 py-2 rounded-full text-gray-300 text-sm font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-colors'
            >
              College Basketball
            </Link>
            <Link
              to='/college-football-prompts'
              className='bg-slate-800/60 border border-slate-600 px-4 py-2 rounded-full text-gray-300 text-sm font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-colors'
            >
              College Football
            </Link>
            <Link
              to='/nba-prompts'
              className='bg-slate-800/60 border border-slate-600 px-4 py-2 rounded-full text-gray-300 text-sm font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-colors'
            >
              NBA
            </Link>
            <Link
              to='/nfl-prompts'
              className='bg-slate-800/60 border border-slate-600 px-4 py-2 rounded-full text-gray-300 text-sm font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-colors'
            >
              NFL
            </Link>
            <Link
              to='/mlb-prompts'
              className='bg-slate-800/60 border border-slate-600 px-4 py-2 rounded-full text-gray-300 text-sm font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-colors'
            >
              MLB
            </Link>
          </div>
        </div>
      </section>

      <section className='py-16 px-6 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10'
            >
              <div className='mb-4'>{feature.icon}</div>
              <h3 className='text-xl font-semibold text-white mb-3'>
                {feature.title}
              </h3>
              <p className='text-gray-400 leading-relaxed'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
