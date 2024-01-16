import { useState } from 'react';
import './EditComment.css'
import apiService from '../../ApiService';
import { useDispatch } from 'react-redux';
import { commentEdited } from '../../redux/userSlice';

function EditComment ({setView, titleInput, setTitleInput, textInput, setTextInput, fenInput, setFenInput, editFormCommentId}) {
  const dispatch = useDispatch();

  console.log({titleInput});
  console.log({textInput});

  async function editCommentHandler (event) {
    event.preventDefault();
    if (titleInput !== '' && textInput !== '') {

      // Add Comment request
      const comment = { title: titleInput, text: textInput, fen: fenInput, source: 'myCollection', tags: [], id : editFormCommentId  }
      const res = await apiService.editComment(comment);
      console.log({ res });
      if (res.error) {
        alert(`${res.message}`);
        // setState(initialState); FOR INPUT FORM ONCE IMPLEMENTED
      } else {
        dispatch(commentEdited(comment));
        //! FETCH COMMENTS, user name.
      }
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

  function onFenInputChange(e) {
    setFenInput(e.target.value);
  }


  return( 
  <>
  <div className="edit-comment-container">
    <form onSubmit={editCommentHandler}>
      <div>
        <h4>Title</h4>
        <input type='text' className='title-input' value = {titleInput} onChange={onTitleInputChange}></input>
      </div>
      <div>
        <h4>Text</h4>
        <textarea type='text' className='text-input' value={textInput} onChange={onTextInputChange}></textarea>
      </div>
      <div>
        <h4>Fen</h4>
        <input type='text' className='title-input' value={fenInput} onChange={onFenInputChange}></input>
      </div>
      <div>
        <input type='submit' value='Save' className="save-button"></input>
      </div>
    </form>
  </div>
  </>
  )
}

export default EditComment;