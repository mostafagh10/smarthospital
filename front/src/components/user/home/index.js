import React , {useState , useEffect} from 'react';
import About from '../about/index'
import {Link} from 'react-router-dom'
import {Paper , Title , Say , Button1 , Over ,Over2} from './style.js';
import AOS from 'aos'
import "aos/dist/aos.css"
import Footer from '../footer/index'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import './style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers,faTrophy,faCoffee,faFile,faRocket,faCogs,faPencilAlt,faFlask,faGem} from '@fortawesome/free-solid-svg-icons';
library.add(faUsers,faTrophy,faCoffee,faFile,faRocket,faCogs,faPencilAlt,faFlask,faGem);

const Home = () => {

    const [services , setservices] = useState(null)

    const loadservices = () => {
        axios.get('../../../data.json').then((response) => {
            setservices(response.data.services)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        loadservices();
    },[])

    useEffect(()=>{
        AOS.init({
            duration : 1000
        });
    })

    return(
    <div style={{fontFamily:'-moz-initial'}}>
    <Paper>
      <Over>  
      </Over>
      <Over2>
      <div className="container">
      <Title data-aos="flip-right">WE're commited to your health</Title>
      <Say data-aos="flip-left">Protect yourself and your family from preventable infectious diseases</Say>
      <p style={{width:'50%'}}>The goal is to help anyone wishing to consult a doctor online, and to guide them in what they need to know before starting the treatment appropriate for them We work to save people time instead of doing the same themselves through active research and saving their time</p>
      <Link to="/joindoctorteam"><Button1 className="btn btn-success">Join Our Team Doctor</Button1></Link>
      </div>
      </Over2>
    </Paper>
    <div className="one">
    <div className="container">
    <h1 data-aos="fade-right" className="pagetitle">our services</h1>
    <hr className="titlehr" size="20" data-aos="fade-right" />
    <br />
        <div className="row">
        {services && services.map(x => (
                <div className="col-md-4" key={x.id}>
                <div className="card" id="service11" data-aos="flip-up">
                <span className={x.icon} id="service5"></span><br />
                    <h3>{x.type}</h3>
                    <p>{x.des}</p>
                </div>
              </div>
        ))}
      </div>
      </div>
      </div>
      <div className="container">
        <div className="row" style={{textAlign:'center'}}>
          <div className="col-md-6" style={{marginTop:'90px'}} data-aos="fade-right">
              <img src="../../doctor.jpg" width="95%" height="95%" />
          </div>
          <div className="col-md-6" style={{marginTop:'150px' , textAlign:'left'}} data-aos="fade-left">
              <h2 style={{color:'#17a2b8'}}>welcome to smart hospital</h2><br />
              <div style={{width:'70%'}}>
              <h5>This web application supports and helps people with infectious diseases by reducing all costs and efforts, and easily gets the result of initial diagnosis, you only need to select the disease you expect.
We seek to organize everything related to infectious disease patients in terms of providing a group of the best doctors, appropriate isolation methods and how to deal with them, what the patient needs in terms of food and medicine, providing hospitals when the situation is needed , and so on ... which varies from patient to another and from disease to another.</h5>
              </div>
          </div>
      </div>
      </div>
      <About /><br />
    </div>
    )
}

export default Home;