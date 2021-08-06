import React , {useState , useEffect} from 'react';
import {Addadminpage,Addform} from './style.js'
import {GET_ADMIN} from '../../../../redux/actions/adminAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {storage} from '../../firebaseload/index'
import axios from 'axios'
import { editadminprocess } from '../../APIs/adminAPI'
import {useHistory} from 'react-router-dom'

const EditAdmin = ({ match }) => {

    let history = useHistory();

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const adminId = match.params.adminId;

    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.admins)

    const [formdata, setformdata] = useState({
    name:"",
    email:"",
    imagefile:null,
    pictureUrl:'',
    address:"",
    city:"",
    phoneNumber:"",
    dateOfBirth:""
      });
      useEffect(() => {
        if(!admin){
        dispatch(GET_ADMIN(adminId))
        }
        else if(admin){
          setformdata({
              ...formdata,
              name:admin.name,
    email:admin.email,
    imagefile:null,
    pictureUrl:admin.pictureUrl,
    address:admin.address,
    city:admin.city,
    phoneNumber:admin.phoneNumber,
    dateOfBirth:admin.dateOfBirth
          })
        }
   },[dispatch,adminId,admin])
  

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

    const { name, email, pictureUrl, address, city, phoneNumber, dateOfBirth} = formdata;
      const data = { name, email, pictureUrl, address, city, phoneNumber, dateOfBirth}
      setformdata({
        ...formdata
      })

      editadminprocess(data,adminId).then((response) => {
        console.log('axios admin success' , response)   
        history.push('/admin/manageadmin')
    }).catch((err) => {
        console.log(err)
    })
  }


  const showtheform = () => {
    return(
      <Addadminpage>
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Edit Admin</h1>
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
  <button type="submit" class="btn btn-info">Edit admin</button>
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

export default EditAdmin;