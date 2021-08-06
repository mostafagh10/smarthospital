import React , {useEffect , useState , useContext} from 'react';
import './style.css'
import {Link} from 'react-router-dom'
import AOS from 'aos'
import "aos/dist/aos.css"
import { loginpatientprocess } from '../../admin/APIs/patientAPI'
import { failedmessage , successmessage } from '../../admin/helpers/messages'
import {useHistory} from 'react-router-dom'
import {  UserContext } from '../../../ContextAPI/User'
import loginUser from '../../../ContextAPI/Node API/loginUser'

const PatientLogin = () => {

    let history = useHistory();

    const { userLogin } = useContext(UserContext)

    useEffect(()=>{
        AOS.init({
            duration : 2000
        });
    })

    //setup component state
  const [formdata, setformdata] = useState({
    email:"",
    password:"",
    succesmsg: false,
    failedmsg: false
    });

    //destructure component state
  const {
    email,
    password,
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

    const {email , password} = formdata;
      const data = {email , password}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      loginUser(data,'patient').then((response) => {
        if(response.status == 200){
        const {patient , token} = response.data
        console.log(patient)
        userLogin({patient , token} , {patient : true})
        history.push('/')
        setformdata({
          email:"",
          password:"",
          succesmsg : "success log in",
          failedmsg : false
        })    
    } 
    }).catch((err) => {
        console.log(err)
        setformdata({
          ...formdata,
          succesmsg:"",
          failedmsg:err.response.data.error
        })
    })
  }

    const returnform = () => (
            <div className="container"> 
            {failedmsg && failedmessage(failedmsg)}
                <div className="login">
                    <div className="row">
                        <div className="d-none d-sm-none d-md-none d-lg-block col-lg-6" style={{textAlign:'center' , marginTop:'10px'}} data-aos="fade-left">
                            <img src="patientlogin.jpg" height="390" />
                        </div>
                        <div className="col-lg-6 col-sm-12" data-aos="fade-right">
                            <h1>Sign In</h1>
                            <form onSubmit={handlesubmit}>
                            <label className="loginlabel">User Email</label><br />
                            <input className="form-control logininput" type="text" name="email" value={email} onChange={handlechange} /> <br />
                            <label className="loginlabel">Password</label><br />
                            <input className="form-control logininput" type="password" name="password" value={password} onChange={handlechange} /><br />
                            <div className="loginforget">
                                <a href="/forgetpassword/sendemail">
                                <p>forget password</p>
                                </a>
                            </div>
                            <button type="submit" className="btn btn-primary loginbutton">Sign in</button>
                            </form><br /><br />
                            <h8>you don't have an account ? <Link to="/signup">Register here</Link> </h8>
                        </div>
                    </div>
                </div>
            </div>
    )

    return(
        <div className="loginbody"><br />
        {returnform()}<br />
        </div>
    )
}

export default PatientLogin