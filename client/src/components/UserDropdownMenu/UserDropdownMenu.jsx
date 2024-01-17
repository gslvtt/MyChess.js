import './UserDropdownMenu.css';
import apiService from '../../ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { loggedOut, reloaded } from '../../redux/userSlice';

const UserDropdownMenu = () => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  async function onLoginHandler () {
    // e.preventDefault(); FOR INPUT FORM ONCE IMPLEMENTED
    // email, password mocked
      const { email, password } = {email : 'test@email.com', password: 'testpw'};
      const user = { email, password };
      const res = await apiService.login(user);
      console.log({res});
      if (res.error) {
        alert(`${res.message}`);
        // setState(initialState); FOR INPUT FORM ONCE IMPLEMENTED
      } else {
        const myCollection = await apiService.getComments();
        if (myCollection) {
          dispatch(reloaded({ firstName: res.firstName, lastName: res.lastName, myCollection: myCollection, isAuthenticated: true }));
        } else {
          console.log('No collection found 😞');
        }
      }
  }

  async function onLogoutHandler () {
    const res = await apiService.logout();
    if (res.error) {
      alert(`${res.message}`);
      // setState(initialState); FOR INPUT FORM ONCE IMPLEMENTED
    } else {
      dispatch(loggedOut({}));
    }
  }



  async function onRegisterHandler() {
    // e.preventDefault(); FOR INPUT FORM ONCE IMPLEMENTED
    // mocked form input
    const { email, password, firstName, lastName } = { email: 'testx@email.com', password: 'testpw', firstName: 'me', lastName:'again'};
    const user = { email, password, firstName, lastName };
    const res = await apiService.register(user);
    if (res.error) {
      alert(`${res.message}`);
      // setState(initialState); FOR INPUT FORM ONCE IMPLEMENTED
    } else {
      const myCollection = await apiService.getComments();
      if (myCollection) {
        dispatch(reloaded({ firstName: res.firstName, lastName: res.lastName, myCollection: myCollection, isAuthenticated: true }));
      } else {
        console.log('No collection found 😞');
      }
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