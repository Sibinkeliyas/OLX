import React, { Fragment ,useContext,useState} from 'react';
import './Create.css';
import Header from '../Header/Header';
import {AuthContext,FirebaseContext} from '../../store/Context'
import {useHistory} from 'react-router-dom'


const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setprice] = useState('')
  const [image,setImage] = useState(null)

  // use history
  const history = useHistory()

  const submit = () => {
    console.log(image.name);
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref}) => {
     ref.getDownloadURL().then((url) => {
      console.log(url);
      firebase.firestore().collection('products').add({
        name,price,category,url,
        userID : user.uid,
        createdDate : new Date().toDateString()
      }).then(() => {
        history.push('/')
      })
     })
      
   
    }).catch((err) => {
      console.log(err);
    })
    
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
       
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"

              // add to state
               value={name}
               onChange={(e) => setName(e.target.value)}

              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"

              // add to state
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            id="fname" 

            // add to state
            value={price}
            onChange={(e) => setprice(e.target.value)}
            name="Price" />
            <br />
  
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): null}></img>
         
            <br />
            <input 
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0])
            }}
             />
            <br />
            <button onClick={submit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
