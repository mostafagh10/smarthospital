import React , {useState} from 'react';
import {Addhospitalpage,Addform} from './style.js'
import {Link} from 'react-router-dom'
import { addhospitalprocess } from '../../APIs/hospitalAPI'
import { failedmessage, successmessage } from "../../helpers/messages";
import {storage} from '../../firebaseload/index'

const Addhospital = () => {

  const [formdata, setformdata] = useState({
    name:"",
    imagefile:null,
    pictureUrl:'',
    phone:'',
    address:'',
    details:'', 
    succesmsg: false,
    failedmsg: false
    });

    //destructure component state
  const {
    name,
    imagefile,
    pictureUrl,
    phone,
    details,
    address,
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

    const {name , pictureUrl , phone , address , details} = formdata;
      const data = {name , pictureUrl , phone , address , details} 
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      addhospitalprocess(data).then((response) => {
        console.log('axios hospital success' , response)
        setformdata({
          name:"",
          imagefile:null,
          pictureUrl:'',
          phone:'',
          address:'',
          details:'',
          succesmsg : "success adding hospital",
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
        <Addhospitalpage>
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Add new hospital</h1>
            <Addform onSubmit={handlesubmit}>
  <div class="form-group">
    <label>hospital Name</label>
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
      <label>hospital address</label>
      <input type="text" class="form-control" placeholder="enter the address" name="address" value={address} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
      <label>Hospital phone</label>
      <input type="text" class="form-control" placeholder="enter the hospital phone" name="phone" value={phone} onChange={handlechange} />
    </div>
  </div>
    <div class="form-group">
      <label>Details</label>
      <input type="text" class="form-control" placeholder="enter the Details of hospital" name="details" value={details} onChange={handlechange} />
    </div>
  <button type="submit" class="btn btn-primary">Add new hospital</button>
</Addform><br />
<p></p><br />
        </div>
        </Addhospitalpage>
    )
  }

  return(
    <div>
    {showtheform()}
    </div>
  )
}

export default Addhospital;