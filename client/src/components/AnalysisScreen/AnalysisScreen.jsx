import { useState } from 'react';
import AnalysisSectionLateral from '../AnalysisSectionLateral/AnalysisSectionLateral';
import Board from '../Board/Board';
import CommentSectionLateral from '../CommentSectionlateral/CommentSectionLateral';
import './AnalysisScreen.css';
function AnalysisScreen() {
  const [boardPosition, setBoardPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [pgnComments, setPgnComments] = useState({});

  return (
    <>
      <div className="screen">
        <div className='comments-section-wrapper'>
          <CommentSectionLateral pgnComments={pgnComments} boardPosition={boardPosition}/>
        </div>
        <div className='board-section-wrapper'>
          <Board setPgnComments={setPgnComments} setBoardPosition={setBoardPosition} boardPosition={boardPosition}/>
        </div>
        <div className='analysis-section-wrapper'>
          <AnalysisSectionLateral/>
        </div>
      </div>
    </>
  )
}

export default AnalysisScreen;