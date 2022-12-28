import React, { useState ,useContext } from 'react';
import {useHistory} from 'react-router-dom'

import Logo from '../../olx-logo.png';
import './Signup.css';
import firebases  from '../../firebase/config';
import { FirebaseContext } from '../../store/Context';



export default function Signup() {
  const history = useHistory()

  const [username,setUsername] = useState('')
  const [useremail,setUseremail] = useState('')
  const [userpassword,setUserpassword] = useState('')
  const [userphone,setUserphone] = useState('')
  const {firebase} = useContext(FirebaseContext)


  const signup = (e) => {
    e.preventDefault()
      firebases.auth().createUserWithEmailAndPassword(useremail,userpassword)
      .then((userCredential) => {
        userCredential.user.updateProfile({displayName : username}).then(() => {
          firebases.firestore().collection("user").add({
              id : userCredential.user.uid,
              userName : username,
              userphone : userphone
          }).then(( ) => {
            history.push('/login')
          })
        })
      let user = userCredential.user;

})
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={signup}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}

            // user name adding to the state
            onChange = {(e) => {
              setUsername(e.target.value)
            }}


            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={useremail}

            // user email adding to the state
            onChange = {(e) => setUseremail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={userphone}

            // user phone add to the state
            onChange={((e) => setUserphone(e.target.value))}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"

            value={userpassword}
             // user phone add to the state
             onChange={((e) => setUserpassword(e.target.value))}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
