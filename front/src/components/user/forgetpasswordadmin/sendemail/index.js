import React , {useState , useEffect , useContext} from 'react';
import { adminsendverificationcodeprocess } from '../../../admin/APIs/forgetpasswordAPI'
import {failedmessage , successmessage} from '../../../admin/helpers/messages'
import {useHistory} from 'react-router-dom'

const SendEmailAdmin = () => {

    let history = useHistory();

    //setup component state
  const [formdata, setformdata] = useState({
    email:"",
    failedmsg:"",
    succesmsg:""
    });

    //destructure component state
  const {
    email,
    failedmsg,
    succesmsg
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
    
        const {email} = formdata;
          const data = {email}
          setformdata({
            ...formdata,
            failedmsg:false,
            succesmsg:'validation success'
          })
    
          adminsendverificationcodeprocess(data).then((response) => {
            console.log('axios sendemail success' , response)
            history.push('/forgetpassword/admin/sendvertification')
            setformdata({
              email:'',
              succesmsg : "success send verification code",
              failedmsg : false
            })     
        }).catch((err) => {
            console.log(err)
            setformdata({
              ...formdata,
              succesmsg:"",
              failedmsg:err.response.data
            })
        })
      }

    const showTheItems = () => (
        <div className="container my-3" style={{minHeight:'400px'}}>
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <div className="row">
        <div className="col-md-8 mx-auto">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">Add Your Email</h5>
          </div>
          <form onSubmit = {handlesubmit}>
          <div className="modal-body my-2">
              <div className="form-group">
                <label className="text-secondary">email</label>
                <input type="text" className="form-control" name="email" value={email} onChange={handlechange} />
              </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-info text-white">send verification code</button>
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

export default SendEmailAdmin;