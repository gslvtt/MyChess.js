import { useState } from 'react';
import './AddComment.css'

function AddComment ({setView, titleInput, setTitleInput, textInput, setTextInput}) {

  console.log({titleInput});
  console.log({textInput});

  function addNewCommentHandler (event) {
    event.preventDefault();
    if (titleInput !== '' || textInput !== '') {
      // Add Comment OR Update
      setTitleInput('');
      setTextInput('');
    }
    setView('list');
  }

  function onTitleInputChange (e) {
    setTitleInput(e.target.value);
  }

  function onTextInputChange (e) {
    setTextInput(e.target.value);
  }


  return( 
  <>
  <div className="add-comment-container">
    <form onSubmit={addNewCommentHandler}>
      <div>
        <h4>Title</h4>
        <input type='text' className='title-input' value = {titleInput} onChange={onTitleInputChange}></input>
      </div>
      <div>
        <h4>Text</h4>
        <textarea type='text' className='text-input' value={textInput} onChange={onTextInputChange}></textarea>
      </div>
      <div>
        <input type='submit' value='Save' className="save-button"></input>
      </div>
    </form>
  </div>
  </>
  )
}

export default AddComment;