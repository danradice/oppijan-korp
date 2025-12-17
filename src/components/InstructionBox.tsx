import ReactMarkdown from 'react-markdown'
import instructionsText from '../content/instructions.md?raw'

// Instructions for using app. Displays on initial load
const InstructionBox = () => (
  <div className='w-4/5 max-w-4xl mt-5 mx-auto px-5 py-4 border rounded-md shadow-sm leading-relaxed'>
    <p className='text-center font-bold mb-4'>Tervetuloa Oppijan Korpiin!</p>
    <div className='[&_p]:text-left [&_ul]:text-left [&_ul]:list-disc [&_ul]:pl-6'>
      <ReactMarkdown
        components={{
          a: (props) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            />
          ),
        }}
      >
        {instructionsText}
      </ReactMarkdown>
    </div>
  </div>
)

export default InstructionBox