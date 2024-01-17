import './AddComment.css'
import apiService from '../../ApiService';
import { useDispatch } from 'react-redux';
import { commentAdded } from '../../redux/userSlice';

function AddComment ({setView, titleInput, setTitleInput, textInput, setTextInput, fenInput, setFenInput}) {
  const dispatch = useDispatch();
  console.log({titleInput});
  console.log({textInput});
  console.log({fenInput});

  async function addNewCommentHandler (event) {
    event.preventDefault();
    if (titleInput !== '' && textInput !== '') {

      // Add Comment request
      const comment = {title : titleInput, text:textInput, fen:fenInput, source:'myCollection', tags: []}
      const res = await apiService.addComment(comment);
      if (res.error) {
        alert(`${res.message}`);
      } else {
        dispatch(commentAdded(res));
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
        <h4>Fen</h4>
        <input type='text' className='title-input' value={fenInput} onChange={onFenInputChange} disabled></input>
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