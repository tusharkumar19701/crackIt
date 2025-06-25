import React, { useEffect, useRef, useState } from 'react'
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu';
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef();

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className='bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group'>
      
      {/* Top Bar */}
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-[15px] font-semibold text-gray-400 leading-[18px]">Q</span>
          <h3 className="text-[15px] font-medium text-gray-800 mr-0 md:mr-20" onClick={toggleExpand}>
            {question}
          </h3>
        </div>
        <div className="flex items-center justify-end ml-4 relative">
          <div className={`flex ${isExpanded ? "md:flex" : "md:hidden group-hover:flex"}`}>
            <button onClick={onTogglePin} className="flex items-center gap-2 text-indigo-800 font-medium bg-indigo-50 p-3 py-1 mr-2 rounded text-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer">
              {isPinned ? (
                <LuPinOff className='text-sm' />
              ) : (
                <LuPin className='text-sm' />
              )}
            </button>

            <button onClick={() => {
              setIsExpanded(true);
              onLearnMore();
            }} className="flex items-center gap-2 text-cyan-800 font-medium bg-cyan-50 p-3 py-1 mr-2 rounded text-nowrap border border-cyan-50 hover:border-cyan-200 cursor-pointer">
              <LuSparkles className='text-sm' />
              <span className='text-sm hidden md:block'>Learn More</span>
            </button>

            <button className="text-gray-400 hover:text-gray-500 cursor-pointer" onClick={toggleExpand}>
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Answer Section */}
      <div
        style={{ maxHeight: `${height}px` }}
        className="overflow-hidden transition-all duration-300 ease-in-out mt-4"
      >
        <div ref={contentRef} className="text-gray-700 bg-gray-50 px-5 py-3 rounded-lg">
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;
