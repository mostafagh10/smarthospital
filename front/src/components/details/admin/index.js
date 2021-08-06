import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {GET_ADMIN} from '../../../redux/actions/adminAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './style.css'

const Admindetails = ({ match }) => {

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const adminId = match.params.adminId;

    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.admins)

    const [formdata, setformdata] = useState({
    name:"",
    email:"",
    imagefile:null,
    pictureUrl:'',
    address:"",
    city:"",
    phoneNumber:"",
    dateOfBirth:"",
    gender:""
      });
      useEffect(() => {
        if(!admin){
        dispatch(GET_ADMIN(adminId))
        }
        else if(admin){
          setformdata({
              ...formdata,
              name:admin.name,
    email:admin.email,
    imagefile:null,
    pictureUrl:admin.pictureUrl,
    address:admin.address,
    city:admin.city,
    phoneNumber:admin.phoneNumber,
    dateOfBirth:admin.dateOfBirth,
    gender:admin.gender
          })
        }
   },[dispatch,adminId,admin])
  

  //destructure component state
  const {
    name,
    email,
    imagefile,
    pictureUrl,
    address,
    city,
    phoneNumber,
    dateOfBirth,
    gender
  } = formdata;

    return(
      <div className="profilebody1">
      <div className="container" style={{textAlign:'center'}}>
      <div className="row">
            <div className="col-md-4 mt-1 padding-0">
              <div className="card text-center sidebarcard1">
                <div className="card-body">
                  <img src={pictureUrl} width="100%" height="100%" />
                  <div className="mt-3">
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1">

            </div>
            <div className="col-md-7 mt-1 padding-0">
              <div className="card mb-3 content1">
                <div className="card-body" style={{textAlign:'left'}}>
                  <div className="row">
                    <div className="col-md-12">
                      <h1>{name}</h1>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <h5><span className="fas fa-user"></span> &nbsp;about</h5>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5 className="specialcolor">email</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5 className="specialcolor">address</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {address}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="specialcolor">city</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {city}
                    </div>         
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="specialcolor">phoneNumber</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {phoneNumber}
                    </div>         
                  </div>   
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="specialcolor">dateOfBirth</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                    {dateOfBirth ?
                    <span>
                    {new Intl.DateTimeFormat('en-GB', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            }).format(new Date(dateOfBirth))}
            </span> : <span></span>
            }
                    </div>         
                  </div> 
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="specialcolor">gender</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {gender}
                    </div>         
                  </div>  
                </div>
              </div>  
            </div>
          </div>
          </div>
          </div>
    )
}

export default Admindetails;