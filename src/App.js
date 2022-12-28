import React,{useEffect,useContext} from 'react';
import './App.css';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import {AuthContext, FirebaseContext} from './store/Context'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Create from './Components/Create/Create';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ViewPost from './Pages/ViewPost'
import Post from './store/PostContext';

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
  })
  return (
    <div>
<Post>
      <Router>
      <Route exact path='/'>
        <Home />
      </Route>

      {/* sign up */}
      <Route path='/sign-up'>
        <Signup />
      </Route>

      {/* login */}
      <Route path='/login'>
        <Login />
      </Route>

      {/* sell */}
      <Route path='/sell'>
        <Create/>
      </Route>

        {/* view more */}
      <Route path='/view-more'>
        <ViewPost/>
      </Route>
      </Router>
</Post>
    </div>
  );
}



export default App;
