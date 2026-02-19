export type Model = 
  | 'gpt-5'
  | 'gpt-5-mini'
  | 'gpt-5-nano'
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-4-turbo'
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'claude-4-6-opus'
  | 'claude-4-6-sonnet'
  | 'deepseek-r1'
  | 'gemini-3-pro'
  | 'gemini-2.5-pro'
  | 'gemini-2.5-flash'
  | 'gemini-2.0-flash'

export interface TokenCount {
  tokens: number
  characters: number
  words: number
  model: Model
}

export interface CostEstimate {
  inputCost: number
  outputCost: number
  totalCost: number
  model: Model
}

const PRICING_PER_MILLION: Record<Model, { input: number; output: number }> = {
  'gpt-5': { input: 1.25, output: 10.00 },
  'gpt-5-mini': { input: 0.25, output: 2.00 },
  'gpt-5-nano': { input: 0.05, output: 0.40 },
  'gpt-4o': { input: 2.50, output: 10.00 },
  'gpt-4o-mini': { input: 0.15, output: 0.60 },
  'gpt-4-turbo': { input: 10.00, output: 30.00 },
  'gpt-4': { input: 30.00, output: 60.00 },
  'gpt-3.5-turbo': { input: 0.50, output: 1.50 },
  'claude-4-6-opus': { input: 5.00, output: 25.00 },
  'claude-4-6-sonnet': { input: 3.00, output: 15.00 },
  'deepseek-r1': { input: 0.55, output: 2.19 },
  'gemini-3-pro': { input: 2.00, output: 12.00 },
  'gemini-2.5-pro': { input: 1.25, output: 10.00 },
  'gemini-2.5-flash': { input: 0.10, output: 0.40 },
  'gemini-2.0-flash': { input: 0.10, output: 0.40 },
}

const ENCODING_MAP: Record<string, string> = {
  'gpt-5': 'o200k_base',
  'gpt-5-mini': 'o200k_base',
  'gpt-5-nano': 'o200k_base',
  'gpt-4o': 'o200k_base',
  'gpt-4o-mini': 'o200k_base',
  'gpt-4-turbo': 'o200k_base',
  'gpt-4': 'cl100k_base',
  'gpt-3.5-turbo': 'cl100k_base',
  'claude-4-6-opus': 'cl100k_base',
  'claude-4-6-sonnet': 'cl100k_base',
  'deepseek-r1': 'cl100k_base',
  'gemini-3-pro': 'cl100k_base',
  'gemini-2.5-pro': 'cl100k_base',
  'gemini-2.5-flash': 'cl100k_base',
  'gemini-2.0-flash': 'cl100k_base',
}

let encodingCache: Map<string, any> = new Map()

async function loadEncoding(model: string): Promise<any> {
  const encodingName = ENCODING_MAP[model] || 'cl100k_base'
  
  if (!encodingCache.has(encodingName)) {
    const { get_encoding } = await import('tiktoken')
    const encoding = get_encoding(encodingName)
    encodingCache.set(encodingName, encoding)
  }
  
  return encodingCache.get(encodingName)
}

export async function countTokens(text: string, model: Model): Promise<TokenCount> {
  const encoding = await loadEncoding(model)
  const tokens = encoding.encode(text).length
  const characters = text.length
  const words = text.split(/\s+/).filter(w => w.length > 0).length
  
  return { tokens, characters, words, model }
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

export function calculateCost(
  inputTokens: number, 
  outputTokens: number, 
  model: Model
): CostEstimate {
  const pricing = PRICING_PER_MILLION[model] || { input: 0, output: 0 }
  
  const inputCost = (inputTokens / 1_000_000) * pricing.input
  const outputCost = (outputTokens / 1_000_000) * pricing.output
  const totalCost = inputCost + outputCost
  
  return { inputCost, outputCost, totalCost, model }
}

export function getModelPricing(model: Model) {
  return PRICING_PER_MILLION[model] || { input: 0, output: 0 }
}

export const AVAILABLE_MODELS: { value: Model; label: string; provider: string }[] = [
  { value: 'gpt-5', label: 'GPT-5', provider: 'OpenAI' },
  { value: 'gpt-5-mini', label: 'GPT-5 Mini', provider: 'OpenAI' },
  { value: 'gpt-5-nano', label: 'GPT-5 Nano', provider: 'OpenAI' },
  { value: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'OpenAI' },
  { value: 'gpt-4', label: 'GPT-4', provider: 'OpenAI' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { value: 'claude-4-6-opus', label: 'Claude 4.6 Opus', provider: 'Anthropic' },
  { value: 'claude-4-6-sonnet', label: 'Claude 4.6 Sonnet', provider: 'Anthropic' },
  { value: 'deepseek-r1', label: 'DeepSeek R1', provider: 'DeepSeek' },
  { value: 'gemini-3-pro', label: 'Gemini 3 Pro', provider: 'Google' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', provider: 'Google' },
  { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', provider: 'Google' },
  { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', provider: 'Google' },
]
