import React , {useContext , Fragment} from 'react';
import $ from 'jquery'
import {Link} from 'react-router-dom'
import './style.css'
import {  UserContext } from '../../../ContextAPI/User'
import logoutUser from '../../../ContextAPI/Node API/logout'
import {useHistory} from 'react-router-dom'

const Sidebar = () => {

    let history = useHistory();

    const {userLogout , isUser , user, userType} = useContext(UserContext)
    const x = JSON.stringify(user)
    const y = JSON.parse(x)
    const z = user?.admin?._id


    const handlesubmit = (e) => {
        e.preventDefault();
            console.log(userType);
          logoutUser('admin',user.token).then((response) => {
            if(response.status == 200){
            userLogout()
            history.push('/')  
        } 
        }).catch((err) => {
            console.log(err)
        })
      }

    $('document').ready(function(){
        $('.filter').click(function(){
            $('.filtertable').fadeToggle(400);
        })
    })

    const togglemenu = () => {
        let navigation = document.querySelector('.navigation');
        let toggle = document.querySelector('.toggle');
        navigation.classList.toggle('active');
        toggle.classList.toggle('active');
    }

    return(
    <div>
    <div class="navigation">
    <ul>
        <li>
            <Link to="/admin/home">
                <span class="icon"><i class="fas fa-home" aria-hidden="true"></i></span>
                <span class="title">Home</span>
            </Link>
        </li>
        <li>
            {z ? (
            <a href={`/admin/profile/${z}`}>
                <span class="icon"><i class="fas fa-user" aria-hidden="true"></i></span>
                <span class="title">My Profile</span>
            </a>
            ) : (
            <a href={`/admin/profile/${y._id}`}>
                <span class="icon"><i class="fas fa-user" aria-hidden="true"></i></span>
                <span class="title">My Profile</span>
            </a>
            )}
        </li>
        <li>
            <a href="/admin/feedbacks">
                <span class="icon"><i class="fas fa-comments" aria-hidden="true"></i></span>
                <span class="title">feedbacks</span>
            </a>
        </li>
        <li>
            <Link to="/admin/manageadmin">
                <span class="icon"><i class="fas fa-tasks" aria-hidden="true"></i></span>
                <span class="title">Manage Admins</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/managespecialization">
                <span class="icon"><i class="fas fa-newspaper" aria-hidden="true"></i></span>
                <span class="title">Manage Specializations</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/managedisease">
                <span class="icon"><i class="fas fa-virus" aria-hidden="true"></i></span>
                <span class="title">Manage Diseases</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/managedoctor">
                <span class="icon"><i class="fas fa-user-nurse" aria-hidden="true"></i></span>
                <span class="title">Manage Doctors</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/managerequest">
                <span class="icon"><i class="fas fa-reply-all" aria-hidden="true"></i></span>
                <span class="title">Manage Requests</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/managepatient">
                <span class="icon"><i class="fa fa-user-injured" aria-hidden="true"></i></span>
                <span class="title">manage Patients</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/managehospital">
                <span class="icon"><i class="fa fa-hospital-user" aria-hidden="true"></i></span>
                <span class="title">manage Hospitals</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/managepharmacy">
                <span class="icon"><i class="fa fa-laptop-medical" aria-hidden="true"></i></span>
                <span class="title">manage Pharmacies</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/managemedicine">
                <span class="icon"><i class="fa fa-capsules" aria-hidden="true"></i></span>
                <span class="title">manage Medicines</span>
            </Link>
        </li>
        <li>
            <Link>
                <span class="icon"><span className="fas fa-sign-out-alt" aria-hidden="true"></span></span>
                <button className="btn btn-info" onClick={handlesubmit}>Log Out</button>
            </Link>
        </li>
    </ul>
</div>
<div class="toggle" onClick={togglemenu}></div>
</div>
    )
}

export default Sidebar;