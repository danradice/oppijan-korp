/**
 * Builds a CQP (Corpus Query Processor) query from a search string
 * Supports multiple search shortcuts:
 * - Raw CQP: queries starting with "[" are passed through unchanged
 * - ? : matches one or more characters (.+ regex)
 * - ...{num} : matches 0 to {num} words between tokens
 * - -{word} : searches for lemma
 * - !{pos} : searches for part of speech
 * - '{case} : searches for grammatical case
 * - First character: automatically handles both upper and lower case
 *
 * @param search - The search string to convert
 * @returns A valid CQP query string
 */
export function buildCQPQuery(search: string): string {
  // Allow raw CQP searches (starting with "[")
  if (search[0] === "[") {
    return search
  }

  return search
    .trim()
    // Make first character case-insensitive
    .replace(/^\p{L}/u, (match) => `(${match.toLowerCase()}|${match.toUpperCase()})`)
    // ? shorthand for .+ regex combination
    .replace(/\?/g, '.+')
    .split(/\s+/)
    .map(word => {
      // ...{num} shorthand for multiple words between
      const wordsBetween = word.match(/^\.\.\.(\d+)$/)
      // -{word} shorthand for lemma search
      const lemmaSearch = word.match(/^-(\p{L}+)/u)
      // !{pos} shorthand for part of speech search
      const posSearch = word.match(/^!(\p{L}+)/u)
      // '{case} shorthand for case search
      const caseSearch = word.match(/^'(\p{L}+)/u)

      if (wordsBetween) {
        return `[]{0,${wordsBetween[1]}}`
      } else if (lemmaSearch) {
        return `[lemma = "${lemmaSearch[1]}"]`
      } else if (posSearch) {
        return `[pos = "${posSearch[1]}"]`
      } else if (caseSearch) {
        return `[msd = ".*${caseSearch[1]}.*"]`
      } else {
        return `[word = "${word}"]`
      }
    })
    .join(' ')
}
