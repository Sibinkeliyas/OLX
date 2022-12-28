import React,{useEffect,useState,useContext} from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';

import './View.css';
function View() {

  const [userData,setUserData] = useState()

  const {postData} = useContext(PostContext)
  console.log(postData.url);
  const {firebase} = useContext(FirebaseContext)
  

  useEffect(() => {
    firebase.firestore().collection('user').where("id","==",postData.userID).get().then((data) => {
      console.log("data.doc");
      console.log(data.doc);
      data.forEach(element => {
        console.log(element.data());
        setUserData(element.data())
      });
    })
  },[])
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postData.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postData.price} </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
{   userData &&  <div className="contactDetails">
          <p>Seller details</p>
          <p>{userData.userName}</p>
          <p>{userData.userphone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
