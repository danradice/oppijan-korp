import type { KwicSummary } from "../types";

// Ensure correct punctuation spacing
const formatTokenElements = (tokens: string[]): string[] => {
  const noSpaceBefore = new Set(['.', ',', '!', '?', ';', ':', ')', ']', '}', '"']);
  const noSpaceAfter = new Set(['(', '[', '{', '"']);
  const elements: string[] = [];

  tokens.forEach((token, i) => {
    const prev = i > 0 ? tokens[i - 1] : '';
    const needsSpaceBefore =
      i > 0 && !noSpaceBefore.has(token) && !noSpaceAfter.has(prev);

    elements.push(needsSpaceBefore ? ` ${token}` : token);
;
  });
  console.log(elements)
  return elements;
};

const Sentence = ({ tokens, start, end }: KwicSummary) => {
  const elements = formatTokenElements(tokens)
  const before = elements.slice(0, start);
  const bold = elements.slice(start, end);
  const after = elements.slice(end);

  return (
    <div className='w-4/5 max-w-3xl mt-5 mx-auto px-3 py-2 border rounded-md shadow-sm'>
      <p className='text-center'>
        {before.join('')}
        <strong>{bold.join('')}</strong>
        {after.join('')}
      </p>
    </div>
  )
}

export default Sentence
