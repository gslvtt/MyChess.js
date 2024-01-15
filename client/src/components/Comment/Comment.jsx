import './Comment.css';

function Comment({fenComment, setView, setText, setTitle}) {

  return (
    <>
      <div className='comment-wrapper'>
        {/* <div className='edit-delete-wrapper'>
        <button className='edit-delete-button'>Edit</button>
        <button className='edit-delete-button'>Delete</button>
        </div> */}
        <div className='title-buttons-wrapper'>
          <h3 className='title'>{fenComment.title || fenComment.source}</h3>
          <span className='edit-delete-wrapper'>
            {fenComment.source !== 'MyCollection' && <button className='edit-delete-button'>Add</button>}
            <button className='edit-delete-button'>Edit</button>
            <button className='edit-delete-button'>Delete</button>
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
        {/* <p className='tags'>{fenComment.tags.reduce((str, tag) => `${str}, ${tag}`, '')}</p> */}
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