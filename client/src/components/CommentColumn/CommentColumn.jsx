import { useState } from 'react';
import Comment from '../Comment/Comment';
import AddComment from '../AddComment/AddComment';
import './CommentColumn.css';

function CommentColumn({pgnComments, boardPosition}) {
  const [view, setView] = useState('list');
  const [titleInput, setTitleInput] = useState('');
  const [textInput, setTextInput] = useState('');
  
  function onAddButtonHandler () {
    setView('add');
  }
  function onBackButtonHandler () {
    setView('list');
  }

  return (
    <>
    
    <div className='comment-column-container'>
      <div className='comment-column-header'>
        <h3>Comments</h3>
        <h3>My Repertoire</h3>
      </div>
      <div className='comment-column'>
        {view === 'list' && pgnComments[boardPosition]?.map((fenComment, index) => <Comment key={index} fenComment={fenComment} setTextInput={setTextInput} setTitleInput={setTitleInput} setView={setView} /> )}
        {view === 'add' && <AddComment setView={setView} textInput={textInput} setTextInput={setTextInput} titleInput={titleInput} setTitleInput={setTitleInput}/>}
        {/* <Comment /> */}

      </div>
      <div className='comment-column-header'>
        {view === 'list' && <button className='add-button' onClick={onAddButtonHandler}>Add Comment</button>}
        {view === 'add' && <button className='add-button' onClick={onBackButtonHandler}>Back</button>}
      </div>
    </div>
    </>
  )

}

export default CommentColumn;