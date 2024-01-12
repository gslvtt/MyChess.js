import Comment from '../Comment/Comment';
import './CommentColumn.css';

function CommentColumn() {

  return (
    <>
    
    <div className='comment-column-container'>
      <div className='comment-column-header'>
        <h3>Comments</h3>
        <h3>My Repertoire</h3>
      </div>
      <div className='comment-column'>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <div className='comment-column-header'>
        <h3>Add Comment</h3>
      </div>
    </div>
    </>
  )

}

export default CommentColumn;