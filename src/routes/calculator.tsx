import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { 
  countTokens, 
  calculateCost, 
  AVAILABLE_MODELS, 
  getModelPricing,
  type Model,
  type TokenCount,
  type CostEstimate
} from '../utils/tokenCalculator'
import { Calculator, Zap, DollarSign, X, Table } from 'lucide-react'

export const Route = createFileRoute('/calculator')({
  component: TokenCalculator,
})

function TokenCalculator() {
  const [inputText, setInputText] = useState('')
  const [selectedModel, setSelectedModel] = useState<Model>('claude-4-sonnet')
  const [outputTokens, setOutputTokens] = useState(0)
  const [result, setResult] = useState<TokenCount | null>(null)
  const [cost, setCost] = useState<CostEstimate | null>(null)
  const [showPricing, setShowPricing] = useState(false)

  const handleCalculate = async () => {
    if (!inputText.trim()) return
    
    const tokenCount = await countTokens(inputText, selectedModel)
    const costEstimate = calculateCost(tokenCount.tokens, outputTokens, selectedModel)
    
    setResult(tokenCount)
    setCost(costEstimate)
  }

  const handleSampleText = () => {
    setInputText(`The quick brown fox jumps over the lazy dog. This is a sample text to demonstrate token counting. 
    
Artificial intelligence is transforming the way we interact with technology. Large language models like GPT-4 and Claude can understand and generate human-like text.

Tokenization is the process of breaking text into smaller units called tokens. These tokens can be words, subwords, or characters depending on the tokenizer used.

Understanding token usage is important for:
1. Estimating API costs
2. Managing context window limits
3. Optimizing prompt length
4. Budget planning for AI projects`)

    setOutputTokens(150)
  }

  const groupedModels = AVAILABLE_MODELS.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = []
    }
    acc[model.provider].push(model)
    return acc
  }, {} as Record<string, typeof AVAILABLE_MODELS>)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">Token Calculator</h1>
          </div>
          <button
            onClick={() => setShowPricing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <Table className="w-4 h-4" />
            View Pricing
          </button>
        </div>

        <div className="grid gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as Model)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {AVAILABLE_MODELS.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label} ({model.provider})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">
                Input Text
              </label>
              <button
                onClick={handleSampleText}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Use sample text
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here to calculate token usage..."
              className="w-full h-48 bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Expected Output Tokens (optional)
            </label>
            <input
              type="number"
              value={outputTokens}
              onChange={(e) => setOutputTokens(parseInt(e.target.value) || 0)}
              placeholder="Enter expected output tokens for cost estimation..."
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleCalculate}
            disabled={!inputText.trim()}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Calculate Tokens
          </button>

          {result && cost && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-white">Input Tokens</h3>
                </div>
                <p className="text-3xl font-bold text-cyan-400">{result.tokens.toLocaleString()}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {result.words.toLocaleString()} words / {result.characters.toLocaleString()} chars
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Estimated Cost</h3>
                </div>
                <p className="text-3xl font-bold text-green-400">${cost.totalCost.toFixed(4)}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Input: ${cost.inputCost.toFixed(4)} | Output: ${cost.outputCost.toFixed(4)}
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Total Tokens</h3>
                </div>
                <p className="text-3xl font-bold text-purple-400">
                  {(result.tokens + outputTokens).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {outputTokens > 0 ? `Input: ${result.tokens} + Output: ${outputTokens}` : 'Input only'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPricing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">Model Pricing</h2>
              <button
                onClick={() => setShowPricing(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              {Object.entries(groupedModels).map(([provider, models]) => (
                <div key={provider} className="mb-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">{provider}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Model</th>
                          <th className="text-right py-2 px-3 text-gray-400 font-medium">Input ($/M)</th>
                          <th className="text-right py-2 px-3 text-gray-400 font-medium">Output ($/M)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {models.map((model) => {
                          const pricing = getModelPricing(model.value)
                          return (
                            <tr 
                              key={model.value} 
                              className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer"
                              onClick={() => {
                                setSelectedModel(model.value)
                                setShowPricing(false)
                              }}
                            >
                              <td className="py-2 px-3 text-white">{model.label}</td>
                              <td className="py-2 px-3 text-right text-green-400">${pricing.input.toFixed(2)}</td>
                              <td className="py-2 px-3 text-right text-green-400">${pricing.output.toFixed(2)}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
