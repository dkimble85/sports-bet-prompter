import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  estimateTokens,
  calculateCost,
  getModelPricing,
  countTokens,
  AVAILABLE_MODELS,
  type Model,
} from '../utils/tokenCalculator'

// Mock tiktoken since it requires WASM which is unavailable in jsdom
vi.mock('tiktoken', () => ({
  get_encoding: vi.fn(() => ({
    encode: vi.fn((text: string) => new Array(Math.ceil(text.length / 4)).fill(0)),
  })),
}))

describe('estimateTokens', () => {
  it('returns 0 for an empty string', () => {
    expect(estimateTokens('')).toBe(0)
  })

  it('returns ceil(length / 4) for a given string', () => {
    expect(estimateTokens('abcd')).toBe(1) // 4/4 = 1
    expect(estimateTokens('abcde')).toBe(2) // ceil(5/4) = 2
    expect(estimateTokens('hello world')).toBe(3) // ceil(11/4) = 3
  })

  it('handles a single character', () => {
    expect(estimateTokens('a')).toBe(1) // ceil(1/4) = 1
  })

  it('handles a long string', () => {
    const text = 'a'.repeat(100)
    expect(estimateTokens(text)).toBe(25) // ceil(100/4) = 25
  })
})

describe('calculateCost', () => {
  it('calculates zero cost when both token counts are 0', () => {
    const result = calculateCost(0, 0, 'claude-4-6-opus')
    expect(result.inputCost).toBe(0)
    expect(result.outputCost).toBe(0)
    expect(result.totalCost).toBe(0)
    expect(result.model).toBe('claude-4-6-opus')
  })

  it('calculates input cost correctly for claude-4-6-opus', () => {
    // claude-4-6-opus: $5.00 / 1M input tokens
    const result = calculateCost(1_000_000, 0, 'claude-4-6-opus')
    expect(result.inputCost).toBeCloseTo(5.0)
    expect(result.outputCost).toBe(0)
    expect(result.totalCost).toBeCloseTo(5.0)
  })

  it('calculates output cost correctly for claude-4-6-opus', () => {
    // claude-4-6-opus: $25.00 / 1M output tokens
    const result = calculateCost(0, 1_000_000, 'claude-4-6-opus')
    expect(result.inputCost).toBe(0)
    expect(result.outputCost).toBeCloseTo(25.0)
    expect(result.totalCost).toBeCloseTo(25.0)
  })

  it('calculates combined cost correctly for gpt-4o', () => {
    // gpt-4o: $2.50 input, $10.00 output per 1M tokens
    const result = calculateCost(500_000, 200_000, 'gpt-4o')
    expect(result.inputCost).toBeCloseTo(1.25)
    expect(result.outputCost).toBeCloseTo(2.0)
    expect(result.totalCost).toBeCloseTo(3.25)
  })

  it('calculates cost for gpt-4o-mini', () => {
    // gpt-4o-mini: $0.15 input, $0.60 output per 1M tokens
    const result = calculateCost(1_000_000, 1_000_000, 'gpt-4o-mini')
    expect(result.inputCost).toBeCloseTo(0.15)
    expect(result.outputCost).toBeCloseTo(0.60)
    expect(result.totalCost).toBeCloseTo(0.75)
  })

  it('calculates cost for deepseek-r1', () => {
    // deepseek-r1: $0.55 input, $2.19 output per 1M tokens
    const result = calculateCost(1_000_000, 1_000_000, 'deepseek-r1')
    expect(result.inputCost).toBeCloseTo(0.55)
    expect(result.outputCost).toBeCloseTo(2.19)
    expect(result.totalCost).toBeCloseTo(2.74)
  })

  it('calculates cost for gemini-2.5-flash', () => {
    // gemini-2.5-flash: $0.10 input, $0.40 output per 1M tokens
    const result = calculateCost(1_000_000, 1_000_000, 'gemini-2.5-flash')
    expect(result.inputCost).toBeCloseTo(0.10)
    expect(result.outputCost).toBeCloseTo(0.40)
    expect(result.totalCost).toBeCloseTo(0.50)
  })

  it('returns the model on the result', () => {
    const model: Model = 'gpt-5'
    const result = calculateCost(100, 100, model)
    expect(result.model).toBe(model)
  })

  it('calculates fractional token costs correctly', () => {
    // 1000 tokens of gpt-4 input: $30 / 1M * 1000 = $0.03
    const result = calculateCost(1000, 0, 'gpt-4')
    expect(result.inputCost).toBeCloseTo(0.03, 6)
  })
})

describe('getModelPricing', () => {
  it('returns correct pricing for gpt-5', () => {
    const pricing = getModelPricing('gpt-5')
    expect(pricing.input).toBe(1.25)
    expect(pricing.output).toBe(10.00)
  })

  it('returns correct pricing for claude-4-6-sonnet', () => {
    const pricing = getModelPricing('claude-4-6-sonnet')
    expect(pricing.input).toBe(3.00)
    expect(pricing.output).toBe(15.00)
  })

  it('returns correct pricing for gpt-4-turbo', () => {
    const pricing = getModelPricing('gpt-4-turbo')
    expect(pricing.input).toBe(10.00)
    expect(pricing.output).toBe(30.00)
  })

  it('returns correct pricing for gemini-3-pro', () => {
    const pricing = getModelPricing('gemini-3-pro')
    expect(pricing.input).toBe(2.00)
    expect(pricing.output).toBe(12.00)
  })

  it('returns correct pricing for gpt-3.5-turbo', () => {
    const pricing = getModelPricing('gpt-3.5-turbo')
    expect(pricing.input).toBe(0.50)
    expect(pricing.output).toBe(1.50)
  })
})

describe('AVAILABLE_MODELS', () => {
  it('contains 15 models', () => {
    expect(AVAILABLE_MODELS).toHaveLength(15)
  })

  it('each model entry has value, label, and provider fields', () => {
    for (const model of AVAILABLE_MODELS) {
      expect(model).toHaveProperty('value')
      expect(model).toHaveProperty('label')
      expect(model).toHaveProperty('provider')
      expect(typeof model.value).toBe('string')
      expect(typeof model.label).toBe('string')
      expect(typeof model.provider).toBe('string')
    }
  })

  it('includes models from all four providers', () => {
    const providers = new Set(AVAILABLE_MODELS.map((m) => m.provider))
    expect(providers).toContain('OpenAI')
    expect(providers).toContain('Anthropic')
    expect(providers).toContain('Google')
    expect(providers).toContain('DeepSeek')
  })

  it('contains claude-4-6-opus and claude-4-6-sonnet', () => {
    const values = AVAILABLE_MODELS.map((m) => m.value)
    expect(values).toContain('claude-4-6-opus')
    expect(values).toContain('claude-4-6-sonnet')
  })

  it('model values are unique', () => {
    const values = AVAILABLE_MODELS.map((m) => m.value)
    const unique = new Set(values)
    expect(unique.size).toBe(values.length)
  })
})

describe('countTokens', () => {
  beforeEach(() => {
    // Reset the module-level encoding cache between tests by re-importing
    vi.clearAllMocks()
  })

  it('returns a TokenCount object with the correct model', async () => {
    const result = await countTokens('hello world', 'gpt-4o')
    expect(result.model).toBe('gpt-4o')
  })

  it('returns character count matching the input length', async () => {
    const text = 'hello world'
    const result = await countTokens(text, 'gpt-4o')
    expect(result.characters).toBe(text.length)
  })

  it('returns word count matching the number of words', async () => {
    const result = await countTokens('one two three', 'claude-4-6-opus')
    expect(result.words).toBe(3)
  })

  it('returns 0 words for an empty string', async () => {
    const result = await countTokens('', 'gpt-4o')
    expect(result.words).toBe(0)
  })

  it('counts tokens using the mocked encoder (ceil(length/4))', async () => {
    // Mock returns array of length ceil(text.length / 4)
    const text = 'abcdefgh' // 8 chars → ceil(8/4) = 2 tokens
    const result = await countTokens(text, 'gpt-4o')
    expect(result.tokens).toBe(2)
  })

  it('handles multi-word text token count', async () => {
    const text = 'hello world test' // 16 chars → ceil(16/4) = 4 tokens
    const result = await countTokens(text, 'claude-4-6-sonnet')
    expect(result.tokens).toBe(4)
    expect(result.words).toBe(3)
  })
})
