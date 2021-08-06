import React , {useState , useEffect , useContext} from 'react';
import './style.css'
import {  UserContext } from '../../../ContextAPI/User'
import {failedmessage , successmessage} from '../../admin/helpers/messages'
import {GET_FEEDBACKS} from '../../../redux/actions/feedbackAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import "aos/dist/aos.css"

const FeedbackUser = ({ match }) => {

    useEffect(() => {
        AOS.init({
            duration:1300
        })
    })

    const {user} = useContext(UserContext)
    const x = JSON.stringify(user)
    const y = JSON.parse(x)

    const patientId = match.params.patientId;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_FEEDBACKS(patientId))
   },[dispatch,patientId])

   const { feedbacks } = useSelector(state => state.feedbacks)

      const showTheItems = () => (
        <div className="feedbackbody">
            <div className="container" style={{marginTop:'30px' , textAlign:'center'}}>
            <h1 className="pagetitle" data-aos="fade-right">The feedbacks</h1>
            <hr className="titlehr" size="20" data-aos="fade-right" />
    
            
            <div className="col-sm-12">
            {feedbacks && feedbacks.map((feedback,i) => (
                <div className="feedback" data-aos="fade-right" key={i}>
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

export default FeedbackUser;