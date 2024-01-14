import Comment from '../Comment/Comment';
import './CommentColumn.css';

function CommentColumn({pgnComments, boardPosition}) {

  return (
    <>
    
    <div className='comment-column-container'>
      <div className='comment-column-header'>
        <h3>Comments</h3>
        <h3>My Repertoire</h3>
      </div>
      <div className='comment-column'>
        {pgnComments[boardPosition]?.map((fenComment,index) => <Comment key = {index} fenComment={fenComment}/>)}
        {/* <Comment /> */}

      </div>
      <div className='comment-column-header'>
        <h3>Add Comment</h3>
      </div>
    </div>
    </>
  )

}

export default CommentColumn;