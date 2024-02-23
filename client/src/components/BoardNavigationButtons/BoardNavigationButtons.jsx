import { useDispatch } from "react-redux";

import { pointedToBeginning, pointedToPrevious, pointedToNext, pointedToLast } from "../../redux/analysisBoardSlice";
import './BoardNavigationButtons.css'

function BoardNavigationButtons () {
  const dispatch = useDispatch()

  // GAME NAVIGATION HANDLERS
  function onBeginningHandler() {
    dispatch(pointedToBeginning());
  }

  function onPreviousHandler() {
    dispatch(pointedToPrevious())
  }

  function onNextHandler() {
    dispatch(pointedToNext())
  }

  function onLastHandler() {
    dispatch(pointedToLast())
  }

  return (
      <div className='game-navigation-buttons'>
        <button className='navigation-button' onClick={onBeginningHandler}>Beginning</button>
        <button className='navigation-button' onClick={onPreviousHandler}>Previous</button>
        <button className='navigation-button' onClick={onNextHandler}>Next</button>
        <button className='navigation-button' onClick={onLastHandler}>Last</button>
      </div>
  )
} 
export default BoardNavigationButtons;