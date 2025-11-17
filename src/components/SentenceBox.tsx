
// Reusable box for sentence display
const SentenceBox = ({ children }: { children: React.ReactNode }) => (
  <div className='w-4/5 max-w-4xl mt-5 mx-auto px-3 py-2 border rounded-md shadow-sm'>
    <p className='text-center'>{children}</p>
  </div>
)
export default SentenceBox