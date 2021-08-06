import React , {useState , useEffect} from 'react';
import {Link , useHistory} from 'react-router-dom'
import {GET_DOCTOR} from '../../../redux/actions/doctorAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {GET_REQUESTS , APPROVE_REQUEST} from '../../../redux/actions/requestAction'
import {DELETE_DOCTOR} from '../../../redux/actions/doctorAction'
import axios from 'axios'
import './style.css'

const Requestdetails = ({ match }) => {
  const history = useHistory();

    const doctorId = match.params.doctorId;

    const dispatch = useDispatch();
    const { doctor } = useSelector(state => state.doctors)

    const [formdata, setformdata] = useState({
    name:"",
    imagefile:null,
    pictureUrl:'',
    email:'',
    address:'',
    phoneNumber:'',
    clinicAddress:'',
    clinicName:'',
    workHours:'',
    specialization:''
      });
      useEffect(() => {
        if(!doctor){
        dispatch(GET_DOCTOR(doctorId))
        }
        else if(doctor){
          setformdata({
              ...formdata,
              name:doctor.name,
              imagefile:null,
              pictureUrl:doctor.pictureUrl,
              email:doctor.email,
              address:doctor.address,
              phoneNumber:doctor.phoneNumber,
              clinicAddress:doctor.clinicAddress,
              clinicName:doctor.clinicName,
              workHours:doctor.workHours,
              specialization:doctor.specialization
          })
        }
   },[dispatch,doctorId,doctor])

    //destructure component state
  const {
    name,
    imagefile,
    pictureUrl,
    email,
    address,
    phoneNumber,
    clinicAddress,
    clinicName,
    workHours,
    specialization
  } = formdata;

  const approverequest = () => {
    dispatch(APPROVE_REQUEST(doctorId))
    history.push('/admin/managedoctor')
  }

  const deletequest = () => {
    dispatch(DELETE_DOCTOR(doctorId))
    history.push('/admin/managerequest')
  }

    return(
      <div className="profilebody1">
      <div className="container" style={{textAlign:'center'}}>
      <div className="row">
            <div className="col-md-4 mt-1 padding-0">
              <div className="card text-center sidebarcard1">
                <div className="card-body">
                  <img src={pictureUrl} width="100%" height="400px" />
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
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="specialcolor">specialization : {specialization}</h5>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-12">
                  <button className="btn btn-success text-white" onClick={approverequest}><i className="fas fa-thumbs-up"></i>  approve</button>
                    <span>&nbsp; &nbsp;</span> 
                    <button className="btn btn-danger text-white" onClick={deletequest}><i className="fas fa-times-circle"></i>  reject</button>
                    </div>
                  </div><br />
                  <div className="row">
                    <div className="col-md-12">
                      <h5><span className="fas fa-user"></span> &nbsp;About</h5>
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
                      <h5 className="specialcolor">clinicNumber</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {phoneNumber}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5 className="specialcolor">clinicAddress</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {clinicAddress}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="specialcolor">clinicName</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {clinicName}
                    </div>         
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="specialcolor">workHours</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {workHours}
                    </div>         
                  </div>   
                  <hr />
                </div>
              </div>  
            </div>
          </div>
          </div>
          </div>
    )
}

export default Requestdetails;