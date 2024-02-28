import { useState } from 'react';
import Comment from '../Comment/Comment';
import AddComment from '../AddComment/AddComment';
import EditComment from '../EditComment/EditComment';
import './CommentColumn.css';
import { useSelector } from 'react-redux';

function CommentColumn() {
  const [view, setView] = useState('list');
  const [titleInput, setTitleInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [fenInput, setFenInput] = useState('');
  const [editFormCommentId, setEditFormCommentId] = useState('');
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const myCollection = useSelector(state => state.user.myCollection);
  const gameHistory = useSelector(state => state.analysisBoard.gameHistory);
  const pgnComments = useSelector(state => state.analysisBoard.pgnComments)
  const boardPosition = gameHistory.fenHistory[gameHistory.pointer]

  function onAddButtonHandler () {
    if (isAuthenticated) {
      setFenInput(boardPosition.split(' ').slice(0, 4).join(' '));
      setView('add');
    } else {
      alert('Must be logged in to add comments')
    }
  }
  function onBackButtonHandler () {
    setView('list');
  }

  function filterCollection () {
    const fenCollection = myCollection[boardPosition.split(' ').slice(0, 4).join(' ')];
    if (fenCollection) {
      return Object.entries(fenCollection);
    }
    return undefined;
  }

  return (
    <>
    
    <div className='comment-column-container'>
      <div className='comment-column-header'>
        <h3>Comments</h3>
        <h3>My Repertoire</h3>
      </div>
      
      <div className='comment-column'>
        {view === 'list' && pgnComments[boardPosition]?.map((fenComment, index) => <Comment key={index} fenComment={fenComment} setTextInput={setTextInput} setTitleInput={setTitleInput} setFenInput={setFenInput} setView={setView} /> )}
        {isAuthenticated && view === 'list' && filterCollection()?.map((fenComment, index) => <Comment key={index} fenComment={fenComment[1]} setTextInput={setTextInput} setTitleInput={setTitleInput} setFenInput={setFenInput} setView={setView} setEditFormCommentId={setEditFormCommentId}/>)}
        {view === 'add' && <AddComment setView={setView} textInput={textInput} setTextInput={setTextInput} titleInput={titleInput} setTitleInput={setTitleInput} fenInput={fenInput} setFenInput={setFenInput} />}
        {view === 'edit' && <EditComment setView={setView} textInput={textInput} setTextInput={setTextInput} titleInput={titleInput} setTitleInput={setTitleInput} fenInput={fenInput} setFenInput={setFenInput} editFormCommentId={editFormCommentId}/>}
      </div>

      <div className='comment-column-header'>
        {view === 'list' && <button className='add-button' onClick={onAddButtonHandler}>Add Comment</button>}
        {view === 'add' && <button className='add-button' onClick={onBackButtonHandler}>Back</button>}
        {view === 'edit' && <button className='add-button' onClick={onBackButtonHandler}>Back</button>}
      </div>
    </div>
    </>
  )

}

export default CommentColumn;