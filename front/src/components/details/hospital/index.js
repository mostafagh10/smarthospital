import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {GET_HOSPITAL} from '../../../redux/actions/hospitalAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './style.css'

const Hospitaldetails = ({ match }) => {

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const hospitalId = match.params.hospitalId;

    const dispatch = useDispatch();
    const { hospital } = useSelector(state => state.hospitals)

    const [formdata, setformdata] = useState({
      name:"",
    imagefile:null,
    pictureUrl:'',
    phone:'',
    address:'',
    details:'', 
      });
      useEffect(() => {
        if(!hospital){
        dispatch(GET_HOSPITAL(hospitalId))
        }
        else if(hospital){
          setformdata({
              ...formdata,
              name:hospital.name,
    imagefile:null,
    pictureUrl:hospital.pictureUrl,
    phone:hospital.phone,
    address:hospital.address,
    details:hospital.details, 
          })
        }
   },[dispatch,hospitalId,hospital])

   //destructure component state
  const {
    name,
    imagefile,
    pictureUrl,
    phone,
    details,
    address
  } = formdata;

    return(
      <div className="container" style={{textTransform:'capitalize',marginTop:'30px'}}>
        <div className="row">
                  <div className="col-md-5">
                  <img src={pictureUrl} width="100%" height="400px" />
                  </div>
                  <div className="col-md-1">
                    
                  </div>
                
                  <div className="col-md-6" style={{marginTop:'15px'}} >
                      <h5><span className="spanhospital">hospital name :</span> {name}</h5><br /><br />
                      <h5><span className="spanhospital">phone :</span> {phone}</h5><br /><br />
                      <h5><span className="spanhospital">details : </span> {details}</h5><br /><br />
                      <h5><span className="spanhospital">address : </span> {address}</h5>
                  </div>
                  <hr style={{transform:'rotate(90deg)',height:'1px',background:'black',width:'30%',position:'relative',top:'-210px',right:'30px'}} />
             
        </div>
    </div>
    )
}

export default Hospitaldetails;