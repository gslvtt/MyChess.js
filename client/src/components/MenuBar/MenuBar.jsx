import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu';
import './MenuBar.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function MenuBar() {
  
  const [dropdownState, setDropdownState] = useState(false);
  const userFirstName = useSelector(state => state.user.firstName);

  const handleMouseEnterUser = () => {
    setDropdownState(true);
  };

  const handleMouseLeaveUser = () => {
    setDropdownState(false);
  };


  return (
    <>
      <div className="menu-wrapper">
        <div className='menu-sections'>
            <h1>MyChess</h1>
            <h2>Play</h2>
            <h2>MyGames</h2>
            <h2>MyRepertoire</h2>
            <h2>Collections</h2>
            <h2>Tools</h2>
            <h2>Lichess</h2>
        </div>
        <div className='menu-user'>
            <h2>Shortcuts</h2>
          <div onMouseEnter={handleMouseEnterUser} onMouseLeave={handleMouseLeaveUser}>
            <button >{userFirstName || 'User'}</button>
            {dropdownState && <UserDropdownMenu />}
          </div>
        </div>
      </div>
    </>
  )
}


export default MenuBar;