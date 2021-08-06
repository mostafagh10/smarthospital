import React , {useState , useEffect} from 'react';
import {Adddoctorpage,Addform} from './style.js'
import {Link} from 'react-router-dom'
import { adddoctorprocess } from '../../APIs/doctorAPI'
import { getspecializationprocess } from '../../APIs/specificationAPI'
import { failedmessage, successmessage } from "../../helpers/messages";
import {storage} from '../../firebaseload/index'

const Adddoctor = () => {

  const [specializations , setspecializations] = useState(null)

    const loadspecialization = async () => {
        await getspecializationprocess().then((response) => {
            setspecializations(response.data)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        loadspecialization();
    },[])

  //setup component state
  const [formdata, setformdata] = useState({
    name:"",
    imagefile:null,
    pictureUrl:'',
    email:'',
    password:'',
    gender:'',
    address:'',
    city:'',
    phoneNumber:'',
    dateOfBirth:'',
    clinicAddress:'',
    clinicName:'',
    clinicPhone:'',
    workHours:'',
    specialization:'',
    status:true,
    succesmsg: false,
    failedmsg: false
    });

    //destructure component state
  const {
    name,
    imagefile,
    pictureUrl,
    email,
    password,
    gender,
    address,
    city,
    phoneNumber,
    dateOfBirth,
    clinicAddress,
    clinicName,
    clinicPhone,
    workHours,
    specialization,
    status,
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

    const { name, pictureUrl, email, password, gender, address, city, phoneNumber, dateOfBirth, clinicAddress, clinicName, clinicPhone, workHours, specialization , status } = formdata;
      const data = { name, pictureUrl, email, password, gender, address, city, phoneNumber, dateOfBirth, clinicAddress, clinicName, clinicPhone, workHours, specialization , status }
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      adddoctorprocess(data).then((response) => {
        console.log('axios doctor success' , response)
        setformdata({
          name:"",
    imagefile:null,
    pictureUrl:'',
    email:'',
    password:'',
    gender:'',
    address:'',
    city:'',
    phoneNumber:'',
    dateOfBirth:'',
    clinicAddress:'',
    clinicName:'',
    clinicPhone:'',
    workHours:'',
    specialization:'',
    status:true,
          succesmsg : "success adding doctor",
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
        <Adddoctorpage>
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Add new doctor</h1>
            <Addform onSubmit={handlesubmit}>
  <div class="form-group">
    <label>doctor Name</label>
    <input type="text" class="form-control" placeholder="enter the name" name="name" value={name} onChange={handlechange} />
  </div>
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
      <label>doctor email</label>
      <input type="email" class="form-control" placeholder="enter the email" name="email" value={email} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
      <label>doctor password</label>
      <input type="password" class="form-control" placeholder="enter the password" name="password" value={password} onChange={handlechange} />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label>doctor address</label>
      <input type="text" class="form-control" placeholder="enter the address" name="address" value={address} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
      <label>work hours</label>
      <input type="text" class="form-control" placeholder="enter the work hours" name="workHours" value={workHours} onChange={handlechange} />
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
      <label>phone number</label>
      <input type="text" class="form-control" placeholder="enter the phone number" name="phoneNumber" value={phoneNumber} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">specialization</label>
      <select class="form-control" name="specialization" value={specialization} onChange={handlechange}>
      <option value="" disabled selected hidden>select the specialization</option>
        {specializations && specializations.map((c) => (
              <option key={c._id}>{c.specializationName}</option>
        ))}
    </select>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label>clinic name</label>
      <input type="text" class="form-control" placeholder="enter the clinic name" name="clinicName" value={clinicName} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
      <label>clinic address</label>
      <input type="text" class="form-control" placeholder="enter the clinic address" name="clinicAddress" value={clinicAddress} onChange={handlechange} />
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Add new doctor</button>
</Addform><br />
<p></p><br />
        </div>
        </Adddoctorpage>
    )
  }

  return(
    <div>
      {showtheform()}
    </div>
  )
}

export default Adddoctor;