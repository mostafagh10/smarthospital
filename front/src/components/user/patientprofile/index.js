import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {GET_PATIENT} from '../../../redux/actions/patientAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './style.css'

const PatientProfile = ({ match }) => {

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const patientId = match.params.patientId

    const dispatch = useDispatch();
    const { patient } = useSelector(state => state.patients)

    const [loading , setloading] = useState(true)

    const [formdata, setformdata] = useState({
    name:"",
    email:"",
    imagefile:null,
    pictureUrl:'',
    address:"",
    city:"",
    phoneNumber:"",
    dateOfBirth:"",
    gender:"",
    weight:"",
    height:"",
    bloodType:""
      });
      useEffect(() => {
        if(!patient){
        dispatch(GET_PATIENT(patientId))
        }
        else if(patient){
          setformdata({
              ...formdata,
              name:patient.name,
    email:patient.email,
    imagefile:null,
    pictureUrl:patient.pictureUrl,
    address:patient.address,
    city:patient.city,
    phoneNumber:patient.phoneNumber,
    dateOfBirth:patient.dateOfBirth,
    gender:patient.gender,
    weight:patient.weight,
    height: patient.height,
    bloodType: patient.bloodType
          })
        }
   },[dispatch,patientId,patient])
  

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
    gender,
    weight,
    height,
    bloodType
  } = formdata;


  useEffect(() => {
    setTimeout(() => {
      setloading(false)
    }, 1000);
  },[])

  // if(loading){
  //   return(
  //     <h1>please wait</h1>
  //   )
  // }
    return(
      <div className="profilebody">
      <div className="container" style={{textAlign:'center'}}>
        {
          loading ? '' : 
        
          <div className="row">
            <div className="col-md-4 mt-1 padding-0">
              <div className="card text-center sidebarcard">
                <div className="card-body">
                  <img src={pictureUrl} className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h5>{name}</h5>
                    <a href={`/editprofile/${patientId}`}><button className="btn btn-primary"><span className="fas fa-user-edit"></span> &nbsp; update my profile</button></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 mt-1 padding-0">
              <div className="card mb-3 content">
              <div style={{textAlign:'center'}}>
              <h1 className="m-3 pt-3 pagetitle">my profile</h1>
               <hr className="titlehr" size="20" />
               </div>
                <div className="card-body" style={{textAlign:'left'}}>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Email</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5>address</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {address}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5>phone</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {phoneNumber}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5>gender</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {gender}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5>weight</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {weight}
                    </div>         
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5>height</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {height}
                    </div>         
                  </div>   
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5>blood type</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {bloodType}
                    </div>         
                  </div>  
                </div>
              </div>  
            </div>
          </div>
          }
        </div>
        </div>
    )
}

export default PatientProfile;