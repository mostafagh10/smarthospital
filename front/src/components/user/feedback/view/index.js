import React , {useState , useEffect} from 'react';
import './style.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { getfeedbacksprocess } from '../../../admin/APIs/feedbackAPI'
import AOS from 'aos'
import "aos/dist/aos.css"

import { useSelector } from 'react-redux'

const Feedbackview = () => {

    useEffect(() => {
        AOS.init({
            duration:1300
        })
    })

  
  const dispatch = useDispatch();

  const [feedbacks , setfeedbacks] = useState(null)

    const loadfeedbacks = async () => {
        await getfeedbacksprocess().then((response) => {
            setfeedbacks(response.data)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        loadfeedbacks();
    },[])

    const showTheItems = () => (
    <div>
        <div className="container" style={{marginTop:'30px' , textAlign:'center'}}>
        <h1 className="pagetitle" data-aos="fade-right">The feedbacks</h1>
        <hr className="titlehr" size="20" data-aos="fade-right" />

        
        <div className="col-sm-12">
        {feedbacks && feedbacks.map(feedback => (
            <div className="feedback" data-aos="fade-right">
                <h7><span className="fas fa-comments" style={{color:'rgb(0, 112, 204)',fontSize:'25px'}}></span> &nbsp; {feedback.name} <span style={{fontFamily:'cursive',color:'rgb(0, 112, 204)'}}>{new Intl.DateTimeFormat('en-GB', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            }).format(new Date(feedback.createdAt))}</span></h7><br />
                <h5 style={{fontFamily:'serif',fontStyle:'italic'}}>title : {feedback.title}</h5>
                <h4>{feedback.description}</h4>
            </div>
           ))}
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

export default Feedbackview;