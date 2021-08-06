import React , {useState , useEffect , useContext} from 'react';
import './style.css'
import {  UserContext } from '../../../ContextAPI/User'
import { addfeedbackprocess } from '../../admin/APIs/feedbackAPI'
import {failedmessage , successmessage} from '../../admin/helpers/messages'
import {GET_PATIENT} from '../../../redux/actions/patientAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'

const Feedback = ({ match }) => {

    const {user} = useContext(UserContext)
    const x = JSON.stringify(user)
    const y = JSON.parse(x)

    const patientId = match.params.patientId;

    const dispatch = useDispatch();
    const { patient } = useSelector(state => state.patients)

    //setup component state
  const [formdata, setformdata] = useState({
    userId:"",
    name:"",
    email:"",
    title:"",
    description:"",
    succesmsg: false,
    failedmsg: false
    });

    useEffect(() => {
        if(!patient){
        dispatch(GET_PATIENT(patientId))
        }
        else if(patient){
          setformdata({
              ...formdata,
              userId:patient._id,
              name:patient.name,
    email:patient.email
    })
        }
   },[dispatch,patientId,patient])

    //destructure component state
  const {
    userId,
    name,
    email,
    title,
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

    const handlesubmit = (e) => {
        e.preventDefault();
    
        const {userId, name , email , title , description} = formdata;
          const data = {userId , name , email , title , description}
          setformdata({
            ...formdata,
            failedmsg:false,
            succesmsg:'validation success'
          })
    
          addfeedbackprocess(data).then((response) => {
            console.log('axios feedback success' , response)
            setformdata({
              userId:y._id,
              name:y.name,
              email:y.email,
              title:'',
              description:'',
              succesmsg : "success adding feedback",
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

    const showTheItems = () => (
        <div className="container my-3">
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <div className="row">
        <div className="col-md-8 mx-auto">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">Add Your Feedback</h5>
          </div>
          <form onSubmit = {handlesubmit}>
          <div className="modal-body my-2">
          <div className="form-group">
                <label className="text-secondary">id</label>
                <input type="text" className="form-control" name="userId" value={userId} readOnly />
          </div>
          <div className="form-group">
                <label className="text-secondary">name</label>
                <input type="text" className="form-control" name="name" value={name} readOnly />
              </div>
              <div className="form-group">
                <label className="text-secondary">email</label>
                <input type="text" className="form-control" name="email" value={email} readOnly />
              </div>
              <div className="form-group">
                <label className="text-secondary">Title</label>
                <input type="text" className="form-control" name="title" value={title} onChange={handlechange} />
              </div>
              <div className="form-group">
                <label className="text-secondary">Feedback</label>
                <textarea className="form-control" rows="3" name="description" value={description} onChange={handlechange} ></textarea>
              </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-info text-white">Add Feedback</button>
          </div>
          </form>
        </div>
        </div>
      </div>
    </div>
    )

    return(
        <div>
            {showTheItems()}
        </div>
    )
}

export default Feedback;