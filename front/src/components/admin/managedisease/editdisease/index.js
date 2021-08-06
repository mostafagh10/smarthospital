import React , {useState , useEffect} from 'react';
import {Adddiseasepage,Addform} from './style.js'
import {Link} from 'react-router-dom'
import {GET_DISEASE} from '../../../../redux/actions/diseaseAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {storage} from '../../firebaseload/index'
import axios from 'axios'
import { editdiseaseprocess } from '../../APIs/diseaseAPI'
import {useHistory} from 'react-router-dom'
import { getspecializationprocess } from '../../APIs/specificationAPI'

const Editdisease = ({ match }) => {

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
    const diseaseId = match.params.diseaseId;

    const dispatch = useDispatch();
    const { disease } = useSelector(state => state.diseases)

    const [formdata, setformdata] = useState({
      diseaseName:"",
      imagefile:null,
      pictureUrl:'',
      description:'',
      specializationName:'',
      Symptoms:'',
      prevention:'',
      Treatment:'',
      });
      useEffect(() => {
        if(!disease){
        dispatch(GET_DISEASE(diseaseId))
        }
        else if(disease){
          setformdata({
              ...formdata,
              diseaseName:disease.diseaseName,
      imagefile:null,
      pictureUrl:disease.pictureUrl,
      description:disease.description,
      specializationName:disease.specializationName,
      Symptoms:disease.Symptoms,
      prevention:disease.prevention,
      Treatment:disease.Treatment,
          })
        }
   },[dispatch,diseaseId,disease])

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

    const {diseaseName , pictureUrl , description , specializationName, Symptoms , prevention , Treatment} = formdata;
      const data = {diseaseName , pictureUrl , description , specializationName, Symptoms , prevention , Treatment}
      setformdata({
        ...formdata
      })

      editdiseaseprocess(data,diseaseId).then((response) => {
        console.log('axios disease success' , response)
        history.push('/admin/managedisease')
        setformdata({
          diseaseName:"",
          imagefile:null,
          pictureUrl:'',
          description:'',
          specializationName:'',
          Symptoms:'',
          prevention:'',
          Treatment:'',
        })     
    }).catch((err) => {
        console.log(err)
        setformdata({
          ...formdata
        })
    })
  }



    return(
        <Adddiseasepage>
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'30px'}}>Edit disease</h1>
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
  <button type="submit" class="btn btn-primary">Edit disease</button>
</Addform><br />
<p></p><br />
        </div>
        </Adddiseasepage>
    )
}

export default Editdisease;