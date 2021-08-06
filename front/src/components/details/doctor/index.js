import React , {useState , useEffect , useContext} from 'react';
import {Link} from 'react-router-dom'
import {GET_DOCTOR} from '../../../redux/actions/doctorAction'
import {GET_Rates} from '../../../redux/actions/rateAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
import {  UserContext } from '../../../ContextAPI/User'
import logoutUser from '../../../ContextAPI/Node API/logout'
import {useHistory} from 'react-router-dom'
import './style.css'

const Doctordetails = ({ match }) => {

  let history = useHistory();

  const {userLogout , isUser , user, userType} = useContext(UserContext)

    const doctorId = match.params.doctorId;
    const x = JSON.stringify(user)
    const y = JSON.parse(x)

    const dispatch = useDispatch();
    const { doctor } = useSelector(state => state.doctors)

    const {singlerates} = useSelector(state => state.totalrates)

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
        //dispatch(GET_Rates('60d8dcfafdbaf02ae4f74603' ,'60b4fee34ed5551af0dede90'))
        //console.log("therates = ",singlerates)
        }
        else if(doctor){
          //console.log("doctorid : ",doctorId , " and userid : ",user._id)
          //console.log("the total rates = ",singlerates)
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
   },[dispatch,doctorId,doctor,user,singlerates])


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

    const [showrate , setshowrate] = useState(false)

    
    useEffect(()=>{
      const getfriends = async () => {
      const res = await axios.get(`http://localhost:3500/user/doctor/rate/${doctorId}/${user._id}`);
      if(user._id !== undefined){
        console.log("user1.id= ", user._id)
      }
      else{
        console.log("user = ",user)
      console.log("user2.id= ", y._id)
      }
      console.log("res = ",res.data)
      if(res.data.length !== 0){
        setshowrate(true)
      }
      };
      getfriends();
    },[user])

    const handlesubmit = async (e) => {
      e.preventDefault();
      const rate = {
          rater : user._id,
          therate : rating
      }

      try {
          const res = await axios.post(`http://localhost:3500/user/doctor/rate/${doctorId}`, rate)
          console.log("the rate done")
          setshowrate(true)
      } catch (err) {
          console.log(err)
      }
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
                      <h1>dr : {name}</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="specialcolor">specialization : {specialization}</h5>
                    </div>
                  </div>
                  {(isUser && userType.patient)  && 
                  <>        
                  
                  <div className="row">
                  {!showrate ? 
                  <>
                    <div className="col-md-8">
                      <h5> {!rating ? <span style={{fontSize:'40px'}}>0</span> : <span style={{fontSize:'40px'}}>{rating}</span>}
                      &nbsp; &nbsp;
                        {[...Array(5)].map((star,i) => {
                            const ratingvalue = i+1;
                            return (
                            <label>
                            <input type="radio" name="rating" className="rateradio" value={ratingvalue}
                             onClick={() => setrating(ratingvalue)} />
                            <FaStar onMouseEnter={() => sethover(ratingvalue)} 
                             onMouseLeave = {() => sethover(null)}
                            color={ratingvalue < (hover || rating) || ratingvalue == (hover || rating) ? "yellow" : "grey" } className="star" size="30" />
                            </label>
                            )
                        })}</h5>
                    </div>
                    <div className="col-md-4">
                    <button onClick={handlesubmit} className="btn btn-primary">save your rate</button><br /><br />
                    </div>
                    </> :
                    <div className="col-md-12">
                    <h5>you rated for doctor {name}</h5>   
                    </div>
                     }
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <a href="/messenger"><button className="btn btn-success" style={{padding:'10px',fontSize:'20px'}}><span className="fas fa-comments"></span> &nbsp; chat with doctor</button></a><br /><br />
                    </div>
                  </div>
                   
                  </>
                  }
                  <div className="row">
                    <div className="col-md-12">
                      <h5><span className="fas fa-user"></span> &nbsp;About</h5>
                    </div>
                  </div>
                  <hr />
                  {(isUser && userType.admin)  && 
                  <>
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
                  </>
                  }
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

export default Doctordetails;