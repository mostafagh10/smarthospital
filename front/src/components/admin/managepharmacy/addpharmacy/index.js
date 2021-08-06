import React , {useState} from 'react';
import {Addpharmcaypage,Addform} from './style.js'
import {Link} from 'react-router-dom'
import { addpharmacyprocess } from '../../APIs/pharmacyAPI'
import { failedmessage, successmessage } from "../../helpers/messages";
import {storage} from '../../firebaseload/index'

const Addpharmacy = () => {

  const [formdata, setformdata] = useState({
    name:"",
    imagefile:null,
    pictureUrl:'',
    phoneNumber:'',
    numberOfBranches:'', 
    email:'',
    facebookUrl:'',
    websiteUrl:'',
    succesmsg: false,
    failedmsg: false
    });

    //destructure component state
  const {
    name,
    imagefile,
    pictureUrl,
    phoneNumber,
    numberOfBranches,
    email,
    facebookUrl,
    websiteUrl,
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

    const { name, pictureUrl, phoneNumber, numberOfBranches, email, facebookUrl, websiteUrl } = formdata;
      const data = { name, pictureUrl, phoneNumber, numberOfBranches, email, facebookUrl, websiteUrl } 
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      addpharmacyprocess(data).then((response) => {
        console.log('axios pharmacy success' , response)
        setformdata({
          name:"",
    imagefile:null,
    pictureUrl:'',
    phoneNumber:'',
    numberOfBranches:'',
    email:'',
    facebookUrl:'',
    websiteUrl:'',
          succesmsg : "success adding pharmacy",
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
        <Addpharmcaypage>
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Add new pharmacy</h1>
            <Addform onSubmit={handlesubmit}>
  <div class="form-group">
    <label for="inputAddress">Pharmacy Name</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="enter the name" name="name" value={name} onChange={handlechange} />
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
      <label for="inputPassword4">Pharmacy phoneNumber (main branch)</label>
      <input type="text" class="form-control" placeholder="enter the hospital phoneNumber" name="phoneNumber" value={phoneNumber} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">number of branches</label>
      <input type="number" class="form-control" placeholder="enter the number of branches" name="numberOfBranches" value={numberOfBranches} onChange={handlechange} />
  </div>
  </div>
    <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">email</label>
      <input type="text" class="form-control" placeholder="enter the email" name="email" value={email} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">facebook URL</label>
      <input type="text" class="form-control" placeholder="enter the facebook URL" name="facebookUrl" value={facebookUrl} onChange={handlechange} />
    </div>
  </div>
  <div class="form-group">
      <label for="inputPassword4">website URL</label>
      <input type="text" class="form-control" placeholder="enter the website URL" name="websiteUrl" value={websiteUrl} onChange={handlechange} />
    </div>
  <button type="submit" class="btn btn-primary">Add new pharmacy</button>
</Addform><br />
<p></p><br />
        </div>
        </Addpharmcaypage>
    )
  }

  return(
    <div>
      {showtheform()}
    </div>
  )
}

export default Addpharmacy;