export interface KorpToken {
  word: string;
}

export interface KorpKwic {
  tokens: KorpToken[];
}

export interface KorpResponse {
  kwic: KorpKwic[];
}
