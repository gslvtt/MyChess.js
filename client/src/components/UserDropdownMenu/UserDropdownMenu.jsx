import './UserDropdownMenu.css';
// import auth from '../utils/auth';
import apiService from '../../ApiService';

const UserDropdownMenu = ({isAuthenticated, setIsAuthenticated, setUser}) => {

  async function onLoginHandler () {
      // e.preventDefault();
      const { email, password } = {email : 'test@email.com', password: 'testpw'};
      const user = { email, password };
      const res = await apiService.login(user);
      if (res.error) {
        alert(`${res.message}`);
        // setState(initialState); FOR INPUT FORM ONCE IMPLEMENTED
      } else {
        setIsAuthenticated(true);
        // auth.login(() => {
          //! FETCH COMMENTS, user name.
          // });
          setUser({firstname: 'test_user', lastname: 'test_user' })
      }
      // REMOVE-END
  }

  function onLogoutHandler () {
    apiService.logout();
    handleAuth();
    
    function handleAuth () {
      setIsAuthenticated(false);
      setUser({ firstname : '', lastname: '' })
      //! RESET COMMENT STATE ETC AND OTHER USER DATA
      // auth.logout(() => navigate('/'));
    }
  }



  async function onRegisterHandler() {
    // e.preventDefault(); For INPUT FORM ONCE IMPLEMENTED
    const { email, password, firstName, lastName } = { email: 'testx@email.com', password: 'testpw', firstName: 'me', lastName:'again'};
    const user = { email, password, firstName, lastName };
    const res = await apiService.register(user);
    if (res.error) {
      alert(`${res.message}`);
      // setState(initialState); FOR INPUT FORM ONCE IMPLEMENTED
    } else {
      setIsAuthenticated(true);
      //! FETCH COMMENTS, user name.
      setUser({ firstname: 'me', lastname: 'again' })
      // auth.login(() => navigate('/profile'));
    }
  }

  return (
    <div className="dropdown-menu">
      <ul>
        {isAuthenticated && <li onClick={onLogoutHandler} >Logout</li>}
        { !isAuthenticated && <li onClick={onLoginHandler}>Login</li>}
        { !isAuthenticated && <hr></hr>}
        { !isAuthenticated && <li onClick={onRegisterHandler}>Register</li>}
      </ul>
    </div>
  );
};

export default UserDropdownMenu;