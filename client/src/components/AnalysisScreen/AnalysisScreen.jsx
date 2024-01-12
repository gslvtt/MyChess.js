import AnalysisSectionLateral from '../AnalysisSectionLateral/AnalysisSectionLateral';
import Board from '../Board/Board';
import CommentSectionLateral from '../CommentSectionlateral/CommentSectionLateral';
import './AnalysisScreen.css';
function AnalysisScreen() {

  return (
    <>
      <div className="screen">
        <div className='comments-section-wrapper'>
          <CommentSectionLateral/>
        </div>
        <div className='board-section-wrapper'>
          <Board/>
        </div>
        <div className='analysis-section-wrapper'>
          <AnalysisSectionLateral/>
        </div>
      </div>
    </>
  )
}

export default AnalysisScreen;