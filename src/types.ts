export interface ApiParams {
  command: string
  defaultcontext: string
  defaultwithin: string
  show: string
  start: number
  end: number
  cut: number
  sort: string
  corpus: string
  cqp: string
}

export interface FormProps {
  fetchData: (search: string, corp: string) => Promise<void>
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  sents: KwicSummary[]
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
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
