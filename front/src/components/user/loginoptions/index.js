import React , {useState , useEffect} from 'react';
import './style.css';
import AOS from 'aos'
import "aos/dist/aos.css"
import {Link} from 'react-router-dom'

const Loginoptions = () => {

    return(
    <div>
    <div className="one">
    <div className="container">
    <h1 data-aos="zoom-in" className="pagetitle">Log in As</h1>
    <hr className="titlehr" size="20" data-aos="zoom-in" />
    <br />
        <div className="row">
                <div className="col-md-6" data-aos="zoom-in">
                <div className="card" id="servicepharmacy" style={{width:'80%',marginLeft:'70px'}}>
                <img className="card-img-top" src="../../loginpatient.png" height="200" /><br />
                    <div>
                    <h4>as user</h4><br />
                    <h6>notes : you must at first have an account to sign in your account ... if you haven't one you can register here <Link to="/signup">Register</Link></h6><br />
                    </div><br />
                    <Link to="/login"><button className="btn btn-info" style={{width:'100%'}}><span className="fas fa-sign-in-alt"></span> &nbsp; sign in here</button></Link>
                </div>
              </div>

              <div className="col-md-6" data-aos="zoom-in">
                <div className="card" id="servicepharmacy" style={{width:'80%',marginLeft:'40px'}}>
                <img className="card-img-top" src="../../logindoctor.png" height="200" /><br />
                    <div>
                    <h4>as doctor</h4><br />
                    <h6>notes : you must at first have an account to sign in your account ... if you haven't one you can send request to join our team here <Link to="/joindoctorteam">join our team</Link></h6><br />
                    </div><br />
                    <Link to="/login/doctor"><button className="btn btn-info" style={{width:'100%'}}><span className="fas fa-sign-in-alt"></span> &nbsp; sign in here</button></Link>
                </div>
              </div>
      </div>
      </div>
      </div>
    </div>
    )
}

export default Loginoptions;