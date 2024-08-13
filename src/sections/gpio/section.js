import { SectionTitle } from 'components/typography';
import './section.css';

function SectionWrapper({ title, children }) {
  return (
    <div className='gpio-section-wrapper'>
      {title && <SectionTitle className='gpio-section-title'>{title}</SectionTitle>}
      <div className='gpio-section-content'>
        {children}
      </div>
    </div>
  );
}

export default SectionWrapper;
