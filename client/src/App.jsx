import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { reloaded } from './redux/userSlice';
import apiService from './ApiService';
import './App.css'
import AnalysisPage from './pages/AnalysisPage';
import MenuBar from './components/MenuBar/MenuBar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await apiService.profile();
      console.log(userInfo);
      if (userInfo) {
        const { firstName, lastName } = userInfo;
        const myCollection = await apiService.getComments();
        if (myCollection) {
          dispatch(reloaded({firstName : firstName, lastName : lastName, myCollection: myCollection, isAuthenticated:true}));
        } else {
          console.log('No collection found 😞');
        }
      } else {
        console.log('No user info found 😞');
      }
    };
    getProfile();
  }, []);

  return (
    <>
      <div className='app-wrapper'>
        <MenuBar/>
        <AnalysisPage/>
      </div>
    </>
  )
}

export default App;
