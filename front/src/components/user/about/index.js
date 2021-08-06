import React , {useState , useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import './style.css';
import AOS from 'aos'
import "aos/dist/aos.css"
import Footer from '../footer/index'

const About = () => {

    const [about , setabout] = useState(null)

    const loadabout = () => {
        axios.get('../../../data.json').then((response) => {
            setabout(response.data.about)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        loadabout();
    },[])

    useEffect(()=>{
        AOS.init({
            duration : 1000
        });
    })



    return(
    <>
    <div>
    <div className="one">
    <div className="container">
    <h1 data-aos="flip-left" className="pagetitle">How it works</h1>
    <hr className="titlehr" size="20" data-aos="flip-left" />
    <br />
        <div className="row">
        {about && about.map(x => (
               <div className="col-md-4" data-aos="flip-left">
               <div className="card">
                   <h1 style={{color:'rgb(75, 131, 156)'}}>{x.title}</h1><br />
                   <h5>{x.body}</h5>
               </div>
             </div>
        ))}
      </div>
      </div>
      </div>
    </div>
    </>
    )
}

export default About;