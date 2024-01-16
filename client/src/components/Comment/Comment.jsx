import './Comment.css';
import apiService from '../../ApiService';
import { useDispatch } from 'react-redux';
import { commentDeleted } from '../../redux/userSlice';

function Comment({fenComment, setView, setTextInput, setTitleInput, setFenInput, setEditFormCommentId}) {
  const dispatch = useDispatch();

  function onAddButtonHandler() {
    setTitleInput(fenComment.title || fenComment.source);
    setTextInput(fenComment.text);
    setFenInput(fenComment.fen.split(' ').slice(0,4).join(' '));
    setView('add');
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
        {/* <p className='body'>{fenComment.text}</p> */}
        <p className='text'>{fenComment.text.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}</p>
        <div className='meta'>
          <span className='source'>{fenComment.source}</span>
          <span className='tags'>{fenComment.tags.reduce((str, tag) => `${str}, ${tag}`, '')}</span>
        </div>
      </div>

      {/* <div className='comment-wrapper'>
        <h3 className='title'>Trap</h3>
        <p className='body'>Careful, cxd5 is a trap! After pawn takes, knight takes, knight takes, bishop takes, comes Bb4+. White loses their Queen and Castling Rights and is down a Bishop for a Pawn. Horrible! </p>
        <div className='meta'>
        <span className='source'>MyCollection</span>
        <span className='tags'>as White, opening traps</span>
        </div>
      </div> */}
    </>
  )

}

export default Comment;