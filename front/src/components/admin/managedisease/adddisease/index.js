import React , {useState , useEffect} from 'react';
import {Adddiseasepage,Addform} from './style.js'
import {Link} from 'react-router-dom'
import { adddiseaseprocess } from '../../APIs/diseaseAPI'
import { getspecializationprocess } from '../../APIs/specificationAPI'
import { failedmessage, successmessage } from "../../helpers/messages";
import {storage} from '../../firebaseload/index'

const Adddisease = () => {

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
    diseaseName:"",
    imagefile:null,
    pictureUrl:'',
    description:'',
    specializationName:'',
    Symptoms:'',
    prevention:'',
    Treatment:'',
    succesmsg: false,
    failedmsg: false
    });

    //destructure component state
  const {
    diseaseName,
    imagefile,
    pictureUrl,
    description,
    specializationName,
    Symptoms,
    prevention,
    Treatment,
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

    const {diseaseName , pictureUrl , description , specializationName , Symptoms , prevention , Treatment} = formdata;
      const data = {diseaseName , pictureUrl , description , specializationName, Symptoms , prevention , Treatment}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      adddiseaseprocess(data).then((response) => {
        console.log('axios disease success' , response)
        setformdata({
          diseaseName:"",
          imagefile:null,
          pictureUrl:'',
          description:'',
          specializationName:'',
          Symptoms:'',
          prevention:'',
          Treatment:'',
          succesmsg : "success adding disease",
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
        <Adddiseasepage>
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Add new disease</h1>
            <Addform onSubmit={handlesubmit}>
  <div class="form-group">
    <label>disease Name</label>
    <input type="text" class="form-control" placeholder="enter the name" name="diseaseName" value={diseaseName} onChange={handlechange} />
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
    <label for="inputAddress">speciality</label>
    <select class="form-control" name="specializationName" value={specializationName} onChange={handlechange}>
    <option value="" disabled selected hidden>select the specialization</option>
        {specializations && specializations.map((c) => (
                    <option key={c._id}>{c.specializationName}</option>
        ))}
    </select>
  </div>
  <div className="form-row">
  <div class="form-group col-md-6">
    <label>information about it (description)</label>
    <textarea class="form-control" rows="5" cols="5" name="description" value={description} onChange={handlechange}>
        
    </textarea>
  </div>
  <div class="form-group col-md-6">
    <label>Treatment</label>
    <textarea class="form-control" rows="5" cols="5" name="Treatment" value={Treatment} onChange={handlechange}>
        
    </textarea>
  </div>
  </div>
  <div className="form-row">
                <div className="form-group col-md-6">
                <label>Symptoms</label>
                <textarea class="form-control" rows="5" cols="5" name="Symptoms" value={Symptoms} onChange={handlechange}>
        
                </textarea>
                </div>
                <div className="form-group col-md-6">
                <label>prevention</label>
                <textarea class="form-control" rows="5" cols="5" name="prevention" value={prevention} onChange={handlechange}>
        
                </textarea>
                </div>
  </div>
  <button type="submit" class="btn btn-primary">Add new disease</button>
</Addform><br />
<p></p><br />
        </div>
        </Adddiseasepage>
    )
  }

  return(
    <div>
      {showtheform()}
    </div>
  )
}

export default Adddisease;