import React , {useState , useEffect , useContext} from 'react';
import {GET_DOCTOR} from '../../../redux/actions/doctorAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa'
import {  UserContext } from '../../../ContextAPI/User'
import logoutUser from '../../../ContextAPI/Node API/logout'
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

const DoctorProfile = ({ match }) => {

  let history = useHistory();

  const {userLogout , isUser , user, userType} = useContext(UserContext)

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

  const [rating , setrating] = useState(null)

    const [hover , sethover] = useState(null)

    return(
      <div className="profilebody" style={{paddingBottom:'30px'}}>
      <div className="container" style={{textAlign:'center'}}>
          <div className="row">
            <div className="col-md-4 mt-1 padding-0">
              <div className="card text-center sidebarcard">
                <div className="card-body">
                  <img src={pictureUrl} className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h5>{name}</h5>
                    <h5>{email}</h5>
                    <a href={`/doctorpage/editprofile/${doctorId}`}><button className="btn btn-primary"><span className="fas fa-user-edit"></span> &nbsp; update my profile</button></a>
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
                      <h5>clinicName</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {clinicName}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5>clinicAddress</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {clinicAddress}
                    </div>         
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5>workHours</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {workHours}
                    </div>         
                  </div>   
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5>specialization</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {specialization}
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

export default DoctorProfile;