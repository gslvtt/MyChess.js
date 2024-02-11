import './Comment.css';
import apiService from '../../ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { commentDeleted } from '../../redux/userSlice';

function Comment({fenComment, setView, setTextInput, setTitleInput, setFenInput, setEditFormCommentId}) {
  const isAuthenticated = useSelector(state=> state.user.isAuthenticated);
  const dispatch = useDispatch();

  function onAddButtonHandler() {
    if(isAuthenticated) {
      setTitleInput(fenComment.title || fenComment.source);
      setTextInput(fenComment.text);
      setFenInput(fenComment.fen.split(' ').slice(0,4).join(' '));
      setView('add');
    } else {
      alert('Must be logged in to add comments')
    }
  }

  function onEditButtonHandler() {
    setTitleInput(fenComment.title || fenComment.source);
    setTextInput(fenComment.text);
    setFenInput(fenComment.fen);
    setEditFormCommentId(fenComment.id);
    setView('edit');
  }

  async function onDeleteButtonHandler() {
    const result = prompt('Are you sure you wish to delete this comment? Type "yes" to continue');
    if(result === 'yes') {
      const res = await apiService.deleteComment(fenComment);
      console.log({ res });
      if (res.error) {
        alert(`${res.message}`);
      } else {
        dispatch(commentDeleted(fenComment));
      }
      setTitleInput('');
      setTextInput('');
      setView('list');
    }
  }

  return (
    <>
      <div className='comment-wrapper'>
        <div className='title-buttons-wrapper'>
          <h3 className='title'>{fenComment.title || fenComment.source}</h3>
          <span className='edit-delete-wrapper'>
            {fenComment.source !== 'myCollection' && <button className='edit-delete-button' onClick={onAddButtonHandler}>Add</button>}
            {fenComment.source !== 'Pgn' && <button className='edit-delete-button' onClick={onEditButtonHandler}>Edit</button>}
            {fenComment.source !== 'Pgn' && <button className='edit-delete-button' onClick={onDeleteButtonHandler}>Delete</button>}
          </span>
        </div>
        <p className='text'>{fenComment?.text?.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}</p>
        <div className='meta'>
          <span className='source'>{fenComment.source}</span>
          <span className='tags'>{fenComment.tags.reduce((str, tag) => `${str}, ${tag}`, '')}</span>
        </div>
      </div>
    </>
  )

}

export default Comment;