import React , {useState , useEffect , useContext} from 'react';
import { confirmpasswordprocess } from '../../../admin/APIs/forgetpasswordAPI'
import {failedmessage , successmessage} from '../../../admin/helpers/messages'

const ChangePassword = () => {

    //setup component state
  const [formdata, setformdata] = useState({
    email:"",
    password:"",
    confirmPassword:"",
    failedmsg:"",
    succesmsg:""
    });

    //destructure component state
  const {
    email,
    password,
    confirmPassword,
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
    
        const {email , password , confirmPassword} = formdata;
          const data = {email , password , confirmPassword}
          setformdata({
            ...formdata,
            failedmsg:false,
            succesmsg:'validation success'
          })
    
          confirmpasswordprocess(data).then((response) => {
            console.log('axios confirmpassword success' , response)
            setformdata({
              email:'',
              password:'',
              confirmPassword:'',
              succesmsg : "success change & confirm password",
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
        <div className="container my-3">
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <div className="row">
        <div className="col-md-8 mx-auto">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">change your password</h5>
          </div>
          <form onSubmit = {handlesubmit}>
          <div className="modal-body my-2">
              <div className="form-group">
                <label className="text-secondary">email</label>
                <input type="text" className="form-control" name="email" value={email} onChange={handlechange} />
              </div>
              <div className="form-group">
                <label className="text-secondary">password</label>
                <input type="text" className="form-control" name="password" value={password} onChange={handlechange} />
              </div>
              <div className="form-group">
                <label className="text-secondary">confirm Password</label>
                <input type="text" className="form-control" name="confirmPassword" value={confirmPassword} onChange={handlechange} />
              </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-info text-white">change password</button>
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

export default ChangePassword;