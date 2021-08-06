import React , {useState , useEffect , useContext} from 'react';
import {Addadminpage,Addform} from './style.js'
import {GET_PATIENT} from '../../../redux/actions/patientAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {storage} from '../../admin/firebaseload/index'
import axios from 'axios'
import { editpatientprocess } from '../../admin/APIs/patientAPI'
import {useHistory} from 'react-router-dom'
import {  UserContext } from '../../../ContextAPI/User'
import {failedmessage , successmessage} from '../../admin/helpers/messages'

const EditPatientprofile = ({ match }) => {

    const {userLogout , isUser , user, userType} = useContext(UserContext)
    const x = JSON.stringify(user)
    const y = JSON.parse(x)

    let history = useHistory();

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const patientId = match.params.patientId;

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
    weight:"",
    height:"",
    bloodType:"",
    succesmsg: false,
    failedmsg: false
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
    weight:patient.weight,
    height:patient.height,
    bloodType:patient.bloodType
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
    weight,
    height,
    bloodType,
    succesmsg,
    failedmsg
  } = formdata;

  //event handlers

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name] : e.target.value
    })
  }

  const handlechange2 = (e) => {
    if(e.target.files[0]){
      const imagefile = e.target.files[0];
      setformdata({
        ...formdata,
        imagefile:imagefile
      })
    }
  }

  const handleupload = (e) => {
    e.preventDefault();
    const imagefile = formdata.imagefile;
    const uploadtask = storage.ref(`images/${imagefile.name}`).put(imagefile)
    uploadtask.on('state_changed',
    (snapshot) => {

    }, 
    (error) => {
      console.log(error)
    } , 
    () => {
      storage.ref('images').child(imagefile.name).getDownloadURL().then(url => {
        console.log(url);
        setformdata({
          ...formdata,
          pictureUrl : url
        })
      })
    })
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    const { name, email, pictureUrl, address, phoneNumber, dateOfBirth , weight , height , bloodType} = formdata;
      const data = { name, email, pictureUrl, address, phoneNumber, dateOfBirth, weight , height , bloodType}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      editpatientprocess(data,patientId).then((response) => {
        console.log('axios patient success' , response)   
        //history.push(`/profile/${y._id}`)
        setformdata({
          name:name,
          email:email,
          pictureUrl:pictureUrl,
          address:address,
          phoneNumber:phoneNumber,
          dateOfBirth:dateOfBirth,
          weight:weight,
          height: height,
          bloodType:bloodType,
          succesmsg : "success upating your profile",
          failedmsg : false
        })     
        history.push(`/profile/${patientId}`)
    }).catch((err) => {
        console.log(err)
        setformdata({
          ...formdata,
          succesmsg:"",
          failedmsg:"try again"
        })
    })
  }


  const showtheform = () => {
    return(
        <Addadminpage>
        <div className="container">
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>update profile</h1>
            <Addform onSubmit={handlesubmit}>
            <div className="custom-file mb-2">
              <input type="file" className="custom-file-input" onChange={handlechange2} />
              <label className="custom-file-label">choose image</label>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                <button className="btn btn-info text-white" onClick={handleupload}>Upload The image</button>
                </div>
                {pictureUrl && 
                    <div className="form-group col-md-6">
                    <img src={pictureUrl} height="200" width="200" />
                    </div>
              }
        </div>
    <div class="form-row">
    <div class="form-group col-md-6">
      <label>Name</label>
      <input type="text" class="form-control" placeholder="enter the name" name="name" value={name} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
      <label>Email</label>
      <input type="email" class="form-control" placeholder="enter the email" name="email" value={email} onChange={handlechange} />
    </div>
  </div>
  <div class="form-row">
  <div class="form-group col-md-6">
    <label>phone number</label>
    <input type="text" class="form-control" placeholder="enter the phone number" name="phoneNumber" value={phoneNumber} onChange={handlechange} />
  </div>
    <div class="form-group col-md-6">
    <label>address</label>
    <input type="text" class="form-control" placeholder="enter the address" name="address" value={address} onChange={handlechange} />
  </div>
    </div>
    <div class="form-group">
    <label>Date Of Birth</label>
    <input type="date" class="form-control" name="dateOfBirth" value={dateOfBirth} onChange={handlechange} />
    </div>
  <div class="form-row">
    <div class="form-group col-md-6">
    <label>weight</label>
    <input type="number" placeholder="enter the weight" class="form-control" name="weight" value={weight} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
    <label>height</label>
    <input type="number" class="form-control" placeholder="enter the height" name="height" value={height} onChange={handlechange} />
  </div>
    </div>
    <div class="form-group">
    <label>blood type</label>
    <select class="form-control" name="bloodType" value={bloodType} onChange={handlechange}>
    <option value="" disabled selected hidden>select the blood type</option>
    <option>A+</option>
    <option>A-</option>
    <option>B+</option>
    <option>B-</option>
    <option>AB+</option>
    <option>AB-</option>
    <option>O+</option>
    <option>O-</option>
    </select>
  </div>
  <button type="submit" class="btn btn-info">Edit profile</button>
</Addform><br />
<p></p><br />
        </div>
        </Addadminpage>
    )
    }

    return(
      <div>
        {showtheform()}
      </div>
    )
}

export default EditPatientprofile;