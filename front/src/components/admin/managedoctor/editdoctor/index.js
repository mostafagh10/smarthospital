import React , {useState , useEffect} from 'react';
import {Adddoctorpage,Addform} from './style.js'
import {Link} from 'react-router-dom'
import { editdoctorprocess } from '../../APIs/doctorAPI'
import { getspecializationprocess } from '../../APIs/specificationAPI'
import {storage} from '../../firebaseload/index'
import {GET_DOCTOR} from '../../../../redux/actions/doctorAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Editdoctor = ({ match }) => {

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

    let history = useHistory();

    //match.params.adviceId => this adviceId which i wrote it in app.js 
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

    const { name, pictureUrl, email, address, phoneNumber, clinicAddress, clinicName, workHours, specialization } = formdata;
      const data = { name, pictureUrl, email, address, phoneNumber, clinicAddress, clinicName, workHours, specialization }
      setformdata({
        ...formdata
      })

      editdoctorprocess(data,doctorId).then((response) => {
        console.log('axios doctor success' , response)
        history.push('/admin/managedoctor')
        setformdata({
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
        })     
    }).catch((err) => {
        console.log(err)
        setformdata({
          ...formdata
        })
    })
  }

  const showtheform = () => {
    return(
        <Adddoctorpage>
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Edit Doctor</h1>
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
    <div class="form-group">
      <label>doctor email</label>
      <input type="email" class="form-control" placeholder="enter the email" name="email" value={email} onChange={handlechange} />
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
  <button type="submit" class="btn btn-primary">Edit Doctor</button>
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

export default Editdoctor;