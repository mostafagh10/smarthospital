import React , {useState , useEffect} from 'react';
import {Addmedicinepage,Addform} from './style.js'
import {Link} from 'react-router-dom'
import { addmedicineprocess } from '../../APIs/medicineAPI'
import { failedmessage, successmessage } from "../../helpers/messages";
import {storage} from '../../firebaseload/index'
import { getdiseaseprocess } from '../../APIs/diseaseAPI'

const Addmedicine = () => {

  const [diseases , setdiseases] = useState(null)

    const loaddiseases = async () => {
        await getdiseaseprocess().then((response) => {
            setdiseases(response.data)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        loaddiseases();
    },[])

  const [formdata, setformdata] = useState({
    name:"",
    imagefile:null,
    pictureUrl:'',
    price:'',
    howToTake:'', 
    diseaseName:'',
    manufacturer:'',
    description:'',
    succesmsg: false,
    failedmsg: false
    });

    //destructure component state
  const {
    name,
    imagefile,
    pictureUrl,
    price,
    howToTake,
    diseaseName,
    manufacturer,
    description,
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

    const { name, pictureUrl, price , howToTake , diseaseName , manufacturer , description } = formdata;
      const data = { name, pictureUrl, price , howToTake , diseaseName , manufacturer , description } 
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      addmedicineprocess(data).then((response) => {
        console.log('axios medicine success' , response)
        setformdata({
          name:"",
    imagefile:null,
    pictureUrl:'',
    price:'',
    howToTake:'',
    diseaseName:'',
    manufacturer:'',
    description:'',
          succesmsg : "success adding medicine",
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
        <Addmedicinepage>
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Add new medicine</h1>
            <Addform onSubmit={handlesubmit}>
  <div class="form-group">
    <label for="inputAddress">medicine Name</label>
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
      <label for="inputEmail4">How to take</label>
      <input type="text" class="form-control" placeholder="enter the details of how to take" name="howToTake" value={howToTake} onChange={handlechange} />
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">price</label>
      <input type="number" class="form-control" placeholder="enter the price" name="price" value={price} onChange={handlechange} />
    </div>
  </div>
  <div className="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Disease</label>
      <select class="form-control" name="diseaseName" value={diseaseName} onChange={handlechange}>
      <option value="" disabled selected hidden>select the disease</option>
      {diseases && diseases.map((c) => (
            <option key={c._id}>{c.diseaseName}</option>
        ))}
      </select>
    </div>
    <div class="form-group col-md-6">
      <label for="inputEmail4">manufacturer</label>
      <input type="text" class="form-control" placeholder="enter the manufacturer" name="manufacturer" value={manufacturer} onChange={handlechange} />
    </div>

    </div>
  <div class="form-group">
      <label for="inputPassword4">description</label>
      <textarea class="form-control" rows="5" cols="5" name="description" name="description" value={description} onChange={handlechange}>
        
    </textarea>
    </div>
  <button type="submit" class="btn btn-primary">Add new medicine</button>
</Addform><br />
<p></p><br />
        </div>
        </Addmedicinepage>
    )
  }

  return(
    <div>
      {showtheform()}
    </div>
  )
}

export default Addmedicine;