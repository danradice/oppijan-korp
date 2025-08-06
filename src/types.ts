export interface ApiParams {
  command: string
  defaultcontext: string
  defaultwithin: string
  show: string
  start: number
  end: number
  corpus: string
  cqp: string
}

export interface KwicSummary {
    start: number,
    end: number,
    tokens: string[]
}

export interface KorpToken {
  word: string
}
export interface KorpKwic {
  tokens: KorpToken[]
  match: {
    start: number
    end: number
  }
}
export interface KorpResponse {
  kwic: KorpKwic[]
}
