
// Reusable box for content display
interface ContentBoxProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'responsive';
  padding?: 'normal' | 'large';
  wrapper?: 'p' | 'div';
}

const ContentBox = ({ children, align = 'responsive', padding = 'normal', wrapper = 'p' }: ContentBoxProps) => {
  const alignmentClass =
    align === 'responsive' ? 'text-center sm:text-left' :
    align === 'left' ? 'text-left' :
    'text-center';

  const paddingClass = padding === 'large' ? 'px-5 py-4' : 'px-3 py-2';
  const Wrapper = wrapper;

  return (
    <div className={`w-4/5 max-w-4xl mt-5 mx-auto ${paddingClass} border rounded-md shadow-sm`}>
      <Wrapper className={`${alignmentClass} leading-normal`}>{children}</Wrapper>
    </div>
  );
};

export default ContentBox