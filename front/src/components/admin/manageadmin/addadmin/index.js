import React , {useState} from 'react';
import {Addadminpage,Addform} from './style.js'
import {Link} from 'react-router-dom'
import { addadminprocess } from '../../APIs/adminAPI'
import { failedmessage, successmessage } from "../../helpers/messages";
import {storage} from '../../firebaseload/index'
const AddAdmin = () => {

  //setup component state
  const [formdata, setformdata] = useState({
    name:"",
    email:"",
    password:"",
    gender:"",
    imagefile:null,
    pictureUrl:'',
    address:"",
    city:"",
    phoneNumber:"",
    dateOfBirth:"",
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
    city,
    phoneNumber,
    dateOfBirth,
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

    const {name , email , password , gender , pictureUrl , address , city , phoneNumber , dateOfBirth} = formdata;
      const data = {name , email , password , gender , pictureUrl , address , city , phoneNumber , dateOfBirth}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      addadminprocess(data).then((response) => {
        console.log('axios admin success' , response)
        setformdata({
          name:"",
          email:"",
          password:"",
          gender:"",
          imagefile:null,
          pictureUrl:'',
          address:"",
          city:"",
          phoneNumber:"",
          dateOfBirth:"",
          succesmsg : "success adding admin",
          failedmsg : false
        })     
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
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Add new Admin</h1>
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
  <div class="form-group">
    <label>password</label>
    <input type="password" class="form-control" placeholder="enter the password" name="password" value={password} onChange={handlechange} />
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
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gender" id="gridRadios1" value="Male" onChange={handlechange} />
          <label class="form-check-label" for="gridRadios1">
            Male
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gender" id="gridRadios2" value="Female" onChange={handlechange} />
          <label class="form-check-label" for="gridRadios2">
            Female
          </label>
        </div>
      </div>
    </div>
  </fieldset>
  <div class="form-row">
    <div class="form-group col-md-6">
    <label>Date Of Birth</label>
    <input type="date" class="form-control" name="dateOfBirth" value={dateOfBirth} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
    <label>city</label>
    <input type="text" class="form-control" placeholder="enter the city" name="city" value={city} onChange={handlechange} />
  </div>
    </div>
  <button type="submit" class="btn btn-info">Add new admin</button>
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

export default AddAdmin;