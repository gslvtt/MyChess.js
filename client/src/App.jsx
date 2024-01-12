import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import AnalysisPage from './pages/AnalysisPage'
import MenuBar from './components/MenuBar/MenuBar'


function App() {

  return (
    <>
      <div className='app-wrapper'>
        <MenuBar/>
        <AnalysisPage/>
      </div>
    </>
  )
}

export default App
