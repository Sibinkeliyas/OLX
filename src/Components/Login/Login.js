import React,{useContext,useState} from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';

// firebase context
import {FirebaseContext} from '../../store/Context';
import { useHistory } from 'react-router-dom';



function Login() {

const {firebase} = useContext(FirebaseContext)
const [useremail,setUseremail] = useState('')
const [userpassword,setUserpassword] = useState('')
const history = useHistory()

  const login = (e) => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(useremail,userpassword).then((data) => {
      console.log(data);
      history.push('/')
    }).catch((err) => {
      alert(err.message)
    })
  
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={login}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"

            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"

            value={userpassword}
            onChange={(e) => setUserpassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
