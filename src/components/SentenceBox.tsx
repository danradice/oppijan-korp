
// Reusable box for sentence display
interface SentenceBoxProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

const SentenceBox = ({ children, align }: SentenceBoxProps) => {
  const alignmentClass = align ? `text-${align}` : 'text-center sm:text-left';

  return (
    <div className='w-4/5 max-w-4xl mt-5 mx-auto px-3 py-2 border rounded-md shadow-sm'>
      <p className={alignmentClass}>{children}</p>
    </div>
  );
};

export default SentenceBox