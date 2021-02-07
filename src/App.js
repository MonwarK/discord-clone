import React, { useEffect, useState } from 'react';
import { logout, selectUser, login } from './features/userSlice';
import './App.css';
import Loading from "./components/loading/loading.component"
import LoginPage from "./pages/login/login.component"
import HomePage from "./pages/home/home.component"
import { auth } from './firebase/firebase.utils';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const [loading, setLoading] = useState(true)
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    const unsubscribe = auth.onAuthStateChanged(
      userAuth => {
        if(userAuth){
          dispatch(login(
            {
              uid: userAuth.uid,
              name: userAuth.displayName,
              email: userAuth.email,
              pfp: userAuth.photoURL
            }
          ))
        } else {
          dispatch(logout())
        }
        setLoading(false)
      }
    )

    return unsubscribe;
  }, [dispatch])

  return (
    <div className="App">
      {
        !loading 
        ?
        (
          !currentUser ?         
            <LoginPage /> 
          : <HomePage />
        )
        :
          <Loading />
      }
    </div>
  );
}

export default App;
