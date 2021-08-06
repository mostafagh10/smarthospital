import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {GET_DISEASE} from '../../../redux/actions/diseaseAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './style.css'
import AOS from 'aos'
import "aos/dist/aos.css"

const Diseasedetails = ({ match }) => {

  useEffect(()=>{
    AOS.init({
        duration : 1000
    });
})


    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const diseaseId = match.params.diseaseId;

    const dispatch = useDispatch();
    const { disease } = useSelector(state => state.diseases)

    const [formdata, setformdata] = useState({
      diseaseName:"",
      imagefile:null,
      pictureUrl:'',
      description:'',
      specializationName:'',
      Symptoms:'',
      prevention:'',
      Treatment:'',
      });
      useEffect(() => {
        if(!disease){
        dispatch(GET_DISEASE(diseaseId))
        }
        else if(disease){
          setformdata({
              ...formdata,
              diseaseName:disease.diseaseName,
      imagefile:null,
      pictureUrl:disease.pictureUrl,
      description:disease.description,
      specializationName:disease.specializationName,
      Symptoms:disease.Symptoms,
      prevention:disease.prevention,
      Treatment:disease.Treatment,
          })
        }
   },[dispatch,diseaseId,disease])



     //destructure component state
  const {
    diseaseName,
    imagefile,
    pictureUrl,
    description,
    specializationName,
    Symptoms,
    prevention,
    Treatment,
  } = formdata;

  const [showname , setshowname] = useState(false)
  const [showdescription , setshowdescription] = useState(false)
  const [showspecialization , setshowspecialization] = useState(false)
  const [showsymptoms , setshowsymptoms] = useState(false)
  const [showprevention , setshowprevention] = useState(false)
  const [showtreatment , setshowtreatment] = useState(false)

  const showthename = () => {
    setshowname(true)
    setshowdescription(false)
    setshowspecialization(false)
    setshowsymptoms(false)
    setshowprevention(false)
    setshowtreatment(false)
  }

  const showthedescription = () => {
    setshowname(false)
    setshowdescription(true)
    setshowspecialization(false)
    setshowsymptoms(false)
    setshowprevention(false)
    setshowtreatment(false)
  }

  const showthespecialization = () => {
    setshowname(false)
    setshowdescription(false)
    setshowspecialization(true)
    setshowsymptoms(false)
    setshowprevention(false)
    setshowtreatment(false)
  }

  const showthesymptopms = () => {
    setshowname(false)
    setshowdescription(false)
    setshowspecialization(false)
    setshowsymptoms(true)
    setshowprevention(false)
    setshowtreatment(false)
  }

  const showtheprevention = () => {
    setshowname(false)
    setshowdescription(false)
    setshowspecialization(false)
    setshowsymptoms(false)
    setshowprevention(true)
    setshowtreatment(false)
  }

  const showthetreatment = () => {
    setshowname(false)
    setshowdescription(false)
    setshowspecialization(false)
    setshowsymptoms(false)
    setshowprevention(false)
    setshowtreatment(true)
  }

    return(
      <div className="container" style={{textAlign:'center',textTransform:'capitalize'}}>
      <div className="row">
        <div className="col-md-5">
          <div className="divtable" onClick={showthedescription}>description</div>
          <div className="divtable" onClick={showthesymptopms}>Symptoms</div>
          <div className="divtable" onClick={showtheprevention}>prevention</div>
          <div className="divtable" onClick={showthetreatment}>Treatment</div>
        </div>
        <div className="col-md-1">

        </div>
        <div className="col-md-6" style={{marginTop:'15px',textAlign:'left'}}>
          <img src={pictureUrl} width="100%" height="300px" /><br /><br />
          <div className="divshow" data-aos="flip-right">
            <h2>disease name</h2>
            <h6>{diseaseName}</h6>
          </div><br />
          {showdescription ? 
          <div className="divshow">
            <h2>description</h2>
            <h6>{description}</h6>
            </div> :
            <div></div>
          }
          {showsymptoms ? 
          <div className="divshow">
            <h2>Symptoms</h2>
            <h6>{Symptoms}</h6>
          </div> :
            <div></div>
          }
          {showprevention ? 
          <div className="divshow">
            <h2>prevention</h2>
            <h6>{prevention}</h6>
          </div> :
            <div></div>
          }
          {showtreatment ? 
          <div className="divshow">
            <h2>Treatment</h2>
            <h6>{Treatment}</h6>
          </div> :
            <div></div>
          }
        </div>
        </div>
        </div>
    )
}

export default Diseasedetails;