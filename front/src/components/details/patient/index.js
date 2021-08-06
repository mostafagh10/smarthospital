import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {GET_PATIENT} from '../../../redux/actions/patientAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Patientdetails = ({ match }) => {

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const patientId = match.params.patientId 

    const dispatch = useDispatch();
    const { patient } = useSelector(state => state.patients)

    const [formdata, setformdata] = useState({
    name:"",
    email:"",
    imagefile:null,
    pictureUrl:'',
    address:"",
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
    phoneNumber,
    dateOfBirth,
    gender,
    weight,
    height,
    bloodType
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
                  </div><br />
                  <div className="row">
                    <div className="col-md-12">
                      <h5><span className="fas fa-user"></span> &nbsp;about</h5>
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
                      <h5 className="specialcolor">phoneNumber</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {phoneNumber}
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
                      <h5 className="specialcolor">weight</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {weight}
                    </div>         
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="specialcolor">height</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {height}
                    </div>         
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="specialcolor">bloodType</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {bloodType}
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

export default Patientdetails;