import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import AnalysisPage from './pages/AnalysisPage';
import MenuBar from './components/MenuBar/MenuBar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({firstName: '', lastName: ''})

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await apiService.profile();
      if (userInfo) {
        const { firstName, lastName } = userInfo;
        setState((prevState) => {
          return {
            ...prevState,
            firstName,
            lastName,
          };
        });
      } else {
        console.log('No user info found 😞');
      }
    };
    getProfile();
  }, []);

  return (
    <>
      <div className='app-wrapper'>
        <MenuBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} setUser={setUser}/>
        <AnalysisPage isAuthenticated={isAuthenticated} />
      </div>
    </>
  )
}

export default App;
