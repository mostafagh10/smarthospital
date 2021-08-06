import React , {useState} from 'react';
import {Addspecializationpage,Addform} from './style.js'
import {Link} from 'react-router-dom'
import { addspecificationprocess } from '../../APIs/specificationAPI'
import { failedmessage, successmessage } from "../../helpers/messages";
import {storage} from '../../firebaseload/index'

const Addspecialization = () => {

  //setup component state
  const [formdata, setformdata] = useState({
    specializationName:"",
    imagefile:null,
    pictureUrl:'',
    succesmsg: false,
    failedmsg: false
    });

    //destructure component state
  const {
    specializationName,
    imagefile,
    pictureUrl,
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

    const {specializationName , pictureUrl} = formdata;
      const data = {specializationName , pictureUrl}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      addspecificationprocess(data).then((response) => {
        console.log('axios specialization success' , response)
        setformdata({
          specializationName:"",
          imagefile:null,
          pictureUrl:'',
          succesmsg : "success adding specialization",
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
        <Addspecializationpage>
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Add new specialization</h1>
            <Addform onSubmit={handlesubmit}>
  <div class="form-group">
    <label for="inputAddress">specialization Name</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="enter the name" name="specializationName" value={specializationName} onChange={handlechange} />
  </div>
  <button type="submit" class="btn btn-primary">Add new specialization</button>
</Addform><br />
<p></p><br /><br /><br /><br /><br /><br /><br />
        </div>
        </Addspecializationpage>
    )
  }

  return(
    <div>
      {showtheform()}
    </div>
  )
}

export default Addspecialization;