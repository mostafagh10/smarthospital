import React , {useState} from 'react';
import {Addadminpage,Addform} from './style.js'
import {Link , useHistory} from 'react-router-dom'
import { addpatientprocess } from '../../admin/APIs/patientAPI'
import { failedmessage, successmessage } from "../../admin/helpers/messages";
import {storage} from '../../admin/firebaseload/index'
const AddPatient = () => {

  const history = useHistory();

  //setup component state
  const [formdata, setformdata] = useState({
    name:"",
    email:"",
    password:"",
    gender:"",
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

    //destructure component state
  const {
    name,
    email,
    password,
    gender,
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

    const {name , email , password , gender , pictureUrl , address , phoneNumber , dateOfBirth , weight , height , bloodType} = formdata;
      const data = {name , email , password , gender , pictureUrl , address , phoneNumber , dateOfBirth, weight , height , bloodType}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      addpatientprocess(data).then((response) => {
        console.log('axios patient success' , response)
        setformdata({
          name:"",
          email:"",
          password:"",
          gender:"",
          imagefile:null,
          pictureUrl:'',
          address:"",
          phoneNumber:"",
          dateOfBirth:"",
          weight:"",
          height:"",
          bloodType:"",
          succesmsg : "success adding patient",
          failedmsg : false
        })   
        history.push('/')  
    }).catch((err) => {
        console.log(err)
        setformdata({
          ...formdata,
          succesmsg:"",
          failedmsg:err.response.data.error
        })
    })
  }


  const showtheform = () => {
    return(
      <Addadminpage>
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <div className="container">
        <h1 style={{textAlign:'center',paddingTop:'30px'}}>Register as patient</h1>
            <Addform onSubmit={handlesubmit} style={{textAlign:'center',width:'70%',margin:'20px auto'}}>
            
            <div className="custom-file mb-2">
              <input type="file" className="custom-file-input" onChange={handlechange2} />
              <label className="custom-file-label">choose image</label>
              </div>
                <div className="form-group">
                <button className="btn btn-info text-white" onClick={handleupload}>Upload The image</button>
                </div>
                {pictureUrl && 
                    <div className="form-group">
                    <img src={pictureUrl} height="200" width="200" />
                    </div>
              }
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" placeholder="enter the name" name="name" value={name} onChange={handlechange} />
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" placeholder="enter the email" name="email" value={email} onChange={handlechange} />
    </div>
  <div class="form-group">
    <label>password</label>
    <input type="password" class="form-control" placeholder="enter the password" name="password" value={password} onChange={handlechange} />
  </div>
  <div class="form-group">
    <label>phone number</label>
    <input type="text" class="form-control" placeholder="enter the phone number" name="phoneNumber" value={phoneNumber} onChange={handlechange} />
  </div>
    <div class="form-group">
    <label>address</label>
    <input type="text" class="form-control" placeholder="enter the address" name="address" value={address} onChange={handlechange} />
  </div>
  <fieldset class="form-group">
      <legend>Gender</legend>
      <div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gender" id="gridRadios1" value="Male" onChange={handlechange} />
          <label class="form-check-label" for="gridRadios1">
            Male &nbsp; &nbsp;
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gender" id="gridRadios2" value="Female" onChange={handlechange} />
          <label class="form-check-label" for="gridRadios2">
            Female
          </label>
        </div>
      </div>
  </fieldset>
    <div class="form-group">
    <label>Date Of Birth</label>
    <input type="date" class="form-control" name="dateOfBirth" value={dateOfBirth} onChange={handlechange} />
    </div>
    <div class="form-group">
    <label>weight</label>
    <input type="number" placeholder="enter the weight" class="form-control" name="weight" value={weight} onChange={handlechange} />
    </div>
    <div class="form-group">
    <label>height</label>
    <input type="number" class="form-control" placeholder="enter the height" name="height" value={height} onChange={handlechange} />
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
  <button type="submit" class="btn btn-info">Add new Patient</button>
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

export default AddPatient;