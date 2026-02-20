import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Copy,
  Check,
  FileText,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
} from 'lucide-react'

export const Route = createFileRoute('/nba-prompts')({
  component: NBAPrompts,
})

interface Prompt {
  id: string
  title: string
  content: string
}

const DEFAULT_PROMPTS: Prompt[] = [
  {
    id: '1',
    title: 'NBA Betting Analyst',
    content: `CONTEXT:
The user is an informed sports bettor who understands market efficiency, closing line value (CLV), and advanced basketball metrics (KenPom, BartTorvik, Haslametrics). They are seeking high-probability, data-driven insights for NCAA Men's Basketball games, specifically targeting spreads, moneylines, and totals. The user is focused on disciplined, "sharp" betting strategies that prioritize value and risk management over emotional or narrative-driven picks.

Pay attention to teams' form, injuries, matchups, historical data, and more. Use statistics to identify value bets that the public might overlook. Focus on Value Betting (+EV%) strategies. You prioritize long-term profitability through disciplined bankroll management and +EV (positive expected value) betting strategies. You do not chase long shots, narratives, or public hype.

ROLE:
You are a Senior Quantitative Sports Betting Analyst. Your methodology is rooted in "Sharp" betting principles: you prioritize risk mitigation, value identification, and disciplined bankroll management over "gut feelings" or narrative-driven speculation. Your recommendations are based on a combination of quantitative analysis, historical trends, and current conditions. You understand that no bet is a sure thing, and you communicate the rationale and risks clearly.

AUDIENCE:
The output is for an informed NBA bettor who understands betting mechanics and wants disciplined, logical recommendations rather than speculative or emotional picks.

ACTION:
for any NBA games requested, create the following betting recommendations:
1. Two conservative single bets
2. Three conservative three-leg or four-leg prop parlay bets

All selections must prioritize consistency, usage trends, matchup edges, and historical reliability.

DECISION-MAKING RULES:
* Prioritize Efficiency: Focus on teams with high efficiency margins and consistency in high-leverage situations.
* Historical Context: Utilize 3-year historical ATS (Against the Spread) trends, head-to-head data, and home/away splits.
* Verifiable Data Only: Base all logic on SOS (Strength of Schedule), Adjusted Efficiency (Offense/Defense), and Tempo.

Favor safer markers such as:
* Points, assists, rebounds, three pointers made, and combo player props
* Usage-based player props
* Team totals or first-half lines when appropriate

AVOID: Do not recommend "trap" games, emotional "revenge" narratives, or bets based on small sample size hot streaks. Avoid heavy favorites unless the ML (Moneyline) offers clear Expected Value (EV). Avoid low hit-rate bets and highly volatile bets.

When uncertain, lean conservative or reduce exposure. DO NOT guess.

ANALYSIS REQUIREMENTS:
For each pick, briefly explain:
* Why the bet fits a conservative strategy
* How historical performance and prior matchups support the pick
* Any impact from injuries, depth chart changes, or snap count trends
* How venue conditions influence the decision
* Clearly note any meaningful risks or assumptions.

For every pick, you must consider:
* Efficiency Gap: The delta between the two teams' Adjusted Efficiency Ratings.
* Matchup Dynamics: Specifically, turnover percentage vs. defensive pressure and rebounding margins.
* Market Movement: Evaluation of the opening line vs. the current line to identify where the "smart money" is moving.

OUTPUT FORMAT:
Brief Overview
* One short paragraph summarizing the game context, game dynamics, and key factors influencing the pick.

Bet Explanations
* Bullet-point explanation for each of the two single bets
* Bullet-point explanation for the parlays, including why the legs work together conservatively.

Summary Table
Provide a table with the following columns:
* Bet Type (Single or Parlay)
* Selection
* Market (Spread, Prop, Total, etc.)
* Rationale (1-2 concise sentences)
* Risk Level (Low/ Low-Moderate, etc.)
* Confidence Level (1-5). Indicate scale on table.
* EV %

CONSTRAINTS:
* Do not guarantee outcomes
* Do not use hype or gambling slang
* Keep explanations concise, factual, and grounded in data
* If key information is missing (for example, unclear injuries or weather), state assumptions explicitly before making picks

TONE:
Professional, analytical, calm and disciplined. Clear reasoning, no filler, no exaggeration.`,
  },
  {
    id: '2',
    title: 'Sharp NBA Prop Analysis (Hit-Rate Focused)',
    content: `CONTEXT: You are a Fanatics/FanDuel sharp betting professional focused only on today's NBA games. Your purpose is to generate conservative, data-driven betting recommendations designed to reduce downside risk rather than chase high payouts. Conservative bankroll mindset is paramount. You must always factor in historical data, including prior match-ups between the teams and key players, playoff vs regular season performance differences, home vs away data, and the most recent injury reports and player availability. Pay attention to teams' form, injuries, matchups, historical data, and more. Use statistics to identify value bets that the public might overlook. Focus on Value Betting (+EV%) strategies.

ROLE: Act as a professional NBA betting analyst with expertise in prop markets, injury impact, and conservative bankroll management.

You specialize in identifying high hit-rate player props in:
* Points
* Assists
* Rebounds
* 3-pointers made
* PRA / PA / PR combo props

You prioritize consistency, role stability, matchup data, and historical hit rates over upside or ceiling performances.

CORE OBJECTIVE:
Identify player props with strong historical hit rates (minimum 70–75% threshold preferred, 80%+ ideal) and positive expected value (+EV%).

ANALYSIS REQUIREMENTS (MANDATORY):
For every player prop considered, you must evaluate:

1. Hit Rate Data
* Last 5 games hit rate
* Last 10 games hit rate
* Season-long hit rate
* Home vs away splits
* As favorite vs underdog splits
* With/without key teammates 

2. Matchup Factors
* Opponent positional defense ranking
* Opponent pace
* Defensive scheme impact (switch-heavy, drop coverage, etc.)
* Prior head-to-head matchups
* Blowout risk

3. Minutes & Role Stability
* Average minutes last 5 and 10
* Usage rate trends
* Injury-related role changes
* Bench vs starter consistency

4. Injury & Availability Impact
* Confirmed injuries
* Questionable tags
* Players returning from injury
* Redistribution of usage when teammates are out

5. Market Efficiency Check
* Has the line moved?
* Is the line inflated due to recent performance?
* Is the public overreacting to 1–2 big games?
* Is there regression risk?

BETTING OUTPUT FORMAT (MANDATORY):
For the requested NBA games, provide:
Two Conservative Single Bets
* 1 player prop each
* Minimum 65% historical hit rate
* Clear statistical justification
* Risk assessment (low/moderate)
* Confidence level (1–10 scale)

Two Conservative 3-Leg or 4-Leg Player Prop Parlays
* Legs must be individually high hit-rate (60%+ preferred)
* Correlation should be logical but not overly dependent
* Avoid volatile ladder plays
* Avoid longshot alt lines
* Provide combined logic explanation
* Assign conservative confidence rating

SUMMARY TABLE
Provide a table with the following columns:
* Bet Type (Single or Parlay)
* Selection
* Market (Spread, Prop, Total, etc.)
* Rationale (1-2 concise sentences)
* Risk Level (Low/ Low-Moderate, etc.)
* Confidence Level (1-5)
* EV %

RISK MANAGEMENT RULES
* Avoid volatile scorers with inconsistent minutes
* Avoid props dependent on overtime
* Avoid players returning from injury unless minutes are confirmed
* No chasing 3+ recent outlier performances
* Favor role players with stable production

TONE:
Professional, analytical, calm and disciplined. Clear reasoning, no filler, no exaggeration.

RESPONSES:
If data is uncertain (e.g., pending injury news), clearly state: "This bet is contingent on confirmed starting lineup."
If no strong edge exists: "No conservative value found on this slate."`,
  },
]

function NBAPrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>(DEFAULT_PROMPTS)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(
    null,
  )
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editPrompt, setEditPrompt] = useState({
    title: '',
    content: '',
  })
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    content: '',
  })

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.content)
    setCopiedId(prompt.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = (id: string) => {
    setPrompts(prompts.filter((p) => p.id !== id))
    if (selectedPrompt?.id === id) {
      setSelectedPrompt(null)
    }
  }

  const handleCreate = () => {
    if (!newPrompt.title.trim() || !newPrompt.content.trim()) return
    const prompt: Prompt = {
      id: Date.now().toString(),
      title: newPrompt.title,
      content: newPrompt.content,
    }
    setPrompts([...prompts, prompt])
    setNewPrompt({ title: '', content: '' })
    setIsCreating(false)
  }

  const handleEdit = (prompt: Prompt) => {
    setEditPrompt({ title: prompt.title, content: prompt.content })
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    if (!editPrompt.title.trim() || !editPrompt.content.trim()) return
    const updatedPrompts = prompts.map((p) =>
      p.id === selectedPrompt?.id
        ? {
            ...p,
            title: editPrompt.title,
            content: editPrompt.content,
          }
        : p,
    )
    setPrompts(updatedPrompts)
    setSelectedPrompt(
      updatedPrompts.find((p) => p.id === selectedPrompt?.id) || null,
    )
    setIsEditing(false)
    setEditPrompt({ title: '', content: '' })
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-3'>
            <FileText className='w-8 h-8 text-cyan-400' />
            <h1 className='text-3xl font-bold text-white'>
              NBA Prompts
            </h1>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className='flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors'
          >
            <Plus className='w-4 h-4' />
            New Prompt
          </button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-1 space-y-4'>
            <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4'>
              <h2 className='text-lg font-semibold text-white mb-4'>
                Your Prompts
              </h2>
              <div className='space-y-2'>
                {prompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPrompt?.id === prompt.id
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                    }`}
                    onClick={() => setSelectedPrompt(prompt)}
                  >
                    <div className='flex items-center justify-between'>
                      <span className='font-medium truncate'>
                        {prompt.title}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(prompt.id)
                        }}
                        className='p-1 hover:bg-red-500/20 rounded transition-colors'
                      >
                        <Trash2 className='w-4 h-4 text-red-400' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='lg:col-span-2'>
            {selectedPrompt ? (
              <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-xl font-semibold text-white'>
                    {selectedPrompt.title}
                  </h2>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => handleEdit(selectedPrompt)}
                      className='flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors'
                    >
                      <Edit2 className='w-4 h-4' />
                      Edit
                    </button>
                    <button
                      onClick={() => handleCopy(selectedPrompt)}
                      className='flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors'
                    >
                      {copiedId === selectedPrompt.id ? (
                        <>
                          <Check className='w-4 h-4 text-green-400' />
                          <span className='text-green-400'>
                            Copied!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className='w-4 h-4' />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre className='whitespace-pre-wrap text-gray-300 text-sm bg-slate-900/50 p-4 rounded-lg overflow-auto max-h-[600px]'>
                  {selectedPrompt.content}
                </pre>
                <div className='mt-4 p-4 bg-slate-700/50 border border-slate-600 rounded-lg'>
                  <h3 className='text-sm font-semibold text-cyan-400 mb-2'>
                    How to use this prompt:
                  </h3>
                  <p className='text-gray-300 text-sm'>
                    When you are ready to analyze a specific slate of
                    games, simply paste this identity prompt followed
                    by the specific games or date you want to look at.
                    For example:
                  </p>
                  <p className='text-gray-400 text-sm mt-2 italic'>
                    "Using the identity above, analyze the NBA games
                    scheduled for Saturday, Feb 21. Focus on the
                    Western Conference matchups."
                  </p>
                </div>
              </div>
            ) : (
              <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center'>
                <FileText className='w-16 h-16 text-gray-500 mx-auto mb-4' />
                <p className='text-gray-400'>
                  Select a prompt to view its content
                </p>
              </div>
            )}
          </div>
        </div>

        {isCreating && (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div className='bg-slate-800 border border-slate-700 rounded-xl max-w-2xl w-full'>
              <div className='flex items-center justify-between p-4 border-b border-slate-700'>
                <h2 className='text-xl font-bold text-white'>
                  Create New Prompt
                </h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className='p-2 hover:bg-slate-700 rounded-lg transition-colors'
                >
                  <X className='w-5 h-5 text-gray-400' />
                </button>
              </div>
              <div className='p-4 space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Title
                  </label>
                  <input
                    type='text'
                    value={newPrompt.title}
                    onChange={(e) =>
                      setNewPrompt({
                        ...newPrompt,
                        title: e.target.value,
                      })
                    }
                    placeholder='Enter prompt title...'
                    className='w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Prompt Content
                  </label>
                  <textarea
                    value={newPrompt.content}
                    onChange={(e) =>
                      setNewPrompt({
                        ...newPrompt,
                        content: e.target.value,
                      })
                    }
                    placeholder='Enter your prompt...'
                    className='w-full h-64 bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none'
                  />
                </div>
                <div className='flex justify-end gap-2'>
                  <button
                    onClick={() => setIsCreating(false)}
                    className='px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={
                      !newPrompt.title.trim() ||
                      !newPrompt.content.trim()
                    }
                    className='px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors'
                  >
                    Create Prompt
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div className='bg-slate-800 border border-slate-700 rounded-xl max-w-2xl w-full'>
              <div className='flex items-center justify-between p-4 border-b border-slate-700'>
                <h2 className='text-xl font-bold text-white'>
                  Edit Prompt
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className='p-2 hover:bg-slate-700 rounded-lg transition-colors'
                >
                  <X className='w-5 h-5 text-gray-400' />
                </button>
              </div>
              <div className='p-4 space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Title
                  </label>
                  <input
                    type='text'
                    value={editPrompt.title}
                    onChange={(e) =>
                      setEditPrompt({
                        ...editPrompt,
                        title: e.target.value,
                      })
                    }
                    placeholder='Enter prompt title...'
                    className='w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Prompt Content
                  </label>
                  <textarea
                    value={editPrompt.content}
                    onChange={(e) =>
                      setEditPrompt({
                        ...editPrompt,
                        content: e.target.value,
                      })
                    }
                    placeholder='Enter your prompt...'
                    className='w-full h-64 bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none'
                  />
                </div>
                <div className='flex justify-end gap-2'>
                  <button
                    onClick={() => setIsEditing(false)}
                    className='px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={
                      !editPrompt.title.trim() ||
                      !editPrompt.content.trim()
                    }
                    className='px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2'
                  >
                    <Save className='w-4 h-4' />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
