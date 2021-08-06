import React , {useEffect , useState , useContext} from 'react';
import './style.css'
import AOS from 'aos'
import "aos/dist/aos.css"
import { failedmessage , successmessage } from '../../admin/helpers/messages'
import {useHistory} from 'react-router-dom'
import {  UserContext } from '../../../ContextAPI/User'
import loginUser from '../../../ContextAPI/Node API/loginUser'

const DoctorLogin = () => {

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

      loginUser(data,'doctor').then((response) => {
        if(response.status == 200){
        const {doctor , token} = response.data
        console.log(doctor)
        userLogin({doctor , token} , {doctor : true})
        history.push('/doctorpage/home')
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
          failedmsg:"unable to log in"
        })
    })
  }

    const returnform = () => (
            <div className="container">
                {failedmsg && failedmessage(failedmsg)} 
                <div className="login">
                    <div className="row">
                        <div className="d-none d-sm-none d-md-none d-lg-block col-lg-6" style={{textAlign:'center' , marginTop:'10px'}} data-aos="fade-right">
                            <img src="../../../../doctorlogin.jpg" height="350" />
                        </div>
                        <div className="col-lg-6 col-sm-12" data-aos="fade-left">
                            <h1>Sign In (Doctor)</h1>
                            <form onSubmit={handlesubmit}>
                            <label className="loginlabel">User Name</label><br />
                            <input className="form-control logininput" type="text" name="email" value={email} onChange={handlechange}  /> <br />
                            <label className="loginlabel">Password</label><br />
                            <input className="form-control logininput" type="password" name="password" value={password} onChange={handlechange} /><br />
                            <div className="loginforget">
                                <a href="/forgetpassword/doctor/sendemail">
                                <p>forget password</p>
                                </a>
                            </div>
                            <button type="submit" className="btn btn-primary loginbutton">Sign in</button>
                            </form>
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

export default DoctorLogin