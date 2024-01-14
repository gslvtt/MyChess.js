import './Comment.css';

function Comment({fenComment}) {

  return (
    <>
      <div className='comment-wrapper'>
        <h3 className='title'>{fenComment.title}</h3>
        {/* <p className='body'>{fenComment.text}</p> */}
        <p className='body'>{fenComment.text.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}</p>
        <p className='tags'>{fenComment.tags.reduce((str, tag) => `${str}, ${tag}`, '')}</p>
      </div>
      {/* <div className='comment-wrapper'>
        <h3 className='title'>Trap</h3>
        <p className='body'>Careful, cxd5 is a trap! After pawn takes, knight takes, knight takes, bishop takes, comes Bb4+. White loses their Queen and Castling Rights and is down a Bishop for a Pawn. Horrible! </p>
        <p className='tags'>as White, opening traps</p>
      </div> */}
    </>
  )

}

export default Comment;