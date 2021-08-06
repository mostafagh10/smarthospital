import React , {useState , useEffect} from 'react';
import {Addspecializationpage,Addform} from './style.js'
import {GET_SPECIALIZATION} from '../../../../redux/actions/specializationAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {storage} from '../../firebaseload/index'
import axios from 'axios'
import { editspecializationprocess } from '../../APIs/specificationAPI'
import {useHistory} from 'react-router-dom'

const Editspecialization = ({ match }) => {

  let history = useHistory();

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const specializationId = match.params.specializationId;

    const dispatch = useDispatch();
    const { specialization } = useSelector(state => state.specializations)

    const [formdata, setformdata] = useState({
      specializationName:"",
      });
      useEffect(() => {
        if(!specialization){
        dispatch(GET_SPECIALIZATION(specializationId))
        }
        else if(specialization){
          setformdata({
              ...formdata,
              specializationName:specialization.specializationName
          })
        }
   },[dispatch,specializationId,specialization])
  

  //destructure component state
  const {
    specializationName
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

    const { specializationName } = formdata;
      const data = {specializationName}
      setformdata({
        ...formdata
      })

      editspecializationprocess(data,specializationId).then((response) => {
        console.log('axios specialization success' , response)   
        history.push('/admin/managespecialization')
    }).catch((err) => {
        console.log(err)
    })
  }

    return(
        <Addspecializationpage>
        <div className="container">
            <h1 style={{textAlign:'center',paddingTop:'130px'}}>Edit specialization</h1>
            <Addform onSubmit={handlesubmit}>
  <div class="form-group">
    <label for="inputAddress">specialization Name</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="enter the name" name="specializationName" value={specializationName} onChange={handlechange} />
  </div>
  <button type="submit" class="btn btn-primary">Edit specialization</button>
</Addform><br />
<p></p><br /><br /><br /><br /><br /><br /><br />
        </div>
        </Addspecializationpage>
    )
}

export default Editspecialization;