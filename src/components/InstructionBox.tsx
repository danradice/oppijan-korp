import ReactMarkdown from 'react-markdown'
import instructionsText from '../content/instructions.md?raw'
import ContentBox from './ContentBox'

// Instructions for using app. Displays on initial load
const InstructionBox = () => (
  <ContentBox padding="large" wrapper="div">
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
  </ContentBox>
)

export default InstructionBox