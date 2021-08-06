import React , {useState , useEffect} from 'react';
import {Addpharmcaypage,Addform} from './style.js'
import {Link} from 'react-router-dom'
import Edithospital from '../../managehospital/edithospital/index.js';
import {GET_PHARMACY} from '../../../../redux/actions/pharmacyAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {storage} from '../../firebaseload/index'
import axios from 'axios'
import { editpharmacyprocess } from '../../APIs/pharmacyAPI'
import {useHistory} from 'react-router-dom'

const Editpharmacy = ({ match }) => {

  let history = useHistory();

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const pharmacyId = match.params.pharmacyId;

    const dispatch = useDispatch();
    const { pharmacy } = useSelector(state => state.pharmacies)

    const [formdata, setformdata] = useState({
    name:"",
    imagefile:null,
    pictureUrl:'',
    phoneNumber:'',
    numberOfBranches:'', 
    email:'',
    facebookUrl:'',
    websiteUrl:''
      });
      useEffect(() => {
        if(!pharmacy){
        dispatch(GET_PHARMACY(pharmacyId))
        }
        else if(pharmacy){
          setformdata({
              ...formdata,
              name:pharmacy.name,
              imagefile:null,
              pictureUrl:pharmacy.pictureUrl,
              phoneNumber:pharmacy.phoneNumber,
              numberOfBranches:pharmacy.numberOfBranches, 
              email:pharmacy.email,
              facebookUrl:pharmacy.facebookUrl,
              websiteUrl:pharmacy.websiteUrl
          })
        }
   },[dispatch,pharmacyId,pharmacy])

   //destructure component state
  const {
    name,
    imagefile,
    pictureUrl,
    phoneNumber,
    numberOfBranches,
    email,
    facebookUrl,
    websiteUrl
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
        ...formdata
      })

      editpharmacyprocess(data,pharmacyId).then((response) => {
        console.log('axios pharmacy success' , response)
        history.push('/admin/managepharmacy')
        setformdata({
          name:"",
    imagefile:null,
    pictureUrl:'',
    phoneNumber:'',
    numberOfBranches:'',
    email:'',
    facebookUrl:'',
    websiteUrl:''
        })     
    }).catch((err) => {
        console.log(err)
        setformdata({
          ...formdata
        })
    })
  }

    return(
        <Addpharmcaypage>
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Edit pharmacy</h1>
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
  <button type="submit" class="btn btn-primary">Edit pharmacy</button>
</Addform><br />
<p></p><br />
        </div>
        </Addpharmcaypage>
    )
}

export default Editpharmacy;