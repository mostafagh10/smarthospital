import React , {useContext} from 'react';
import {Link} from 'react-router-dom'
import './style.css'
import {  UserContext } from '../../../ContextAPI/User'
import logoutUser from '../../../ContextAPI/Node API/logout'
import {useHistory} from 'react-router-dom'

const DoctorNavbar = () => {

    let history = useHistory();

    const {userLogout , isUser , user, userType} = useContext(UserContext)
    const x = JSON.stringify(user)
    const y = JSON.parse(x)
    const z = user?.doctor?._id

    const handlesubmit = (e) => {
        e.preventDefault();
            console.log(userType);
          logoutUser('doctor',user.token).then((response) => {
            if(response.status == 200){
            history.push('/')  
            userLogout()
        } 
        }).catch((err) => {
            console.log(err)
        })
      }

    return(
        <div classNameName="Nav">
        <nav class="navbar navbar-expand-xl navbar-dark bg-info">
    <a class="navbar-brand" href="/doctorpage/home">smart hospital</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContentXL" aria-controls="navbarSupportedContentXL" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContentXL">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/doctorpage/home">home</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/messengerdoctor">view chats</a>
            </li>
            <li className="nav-item">
                {z ? (
                <a className="nav-link" href={`/doctorpage/profile/${z}`}>my profile</a>
                ) : (
                    <a className="nav-link" href={`/doctorpage/profile/${y._id}`}>my profile</a>
                )}
            </li>
        </ul>
        <ul className="navbar-nav my-2 my-lg-0">
        <li className="nav-item">
        <button className="btn btn-danger" onClick={handlesubmit}><span className="fas fa-sign-out-alt"></span> logout</button>
        </li>
        </ul>
    </div>
</nav>
      </div>
    )
}

export default DoctorNavbar;