import CommentColumn from '../CommentColumn/CommentColumn';
import CommentFilters from '../CommentFilters/CommentFilters';
import './CommentSectionLateral.css';

function CommentSectionLateral ({boardPosition, pgnComments}) {
  console.log({pgnComments});

  return (
    <>
    <div className='comment-section-lateral'>
      <div className='comment-column-outer-wrapper'>
          <CommentColumn pgnComments={pgnComments} boardPosition={boardPosition} />
      </div>
      <div className='comment-filters-outer-wrapper'>
        <CommentFilters/>
      </div>
    </div>    
    </>
  )

}

export default CommentSectionLateral;