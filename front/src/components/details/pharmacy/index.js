import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {GET_PHARMACY} from '../../../redux/actions/pharmacyAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './style.css'

const Pharmacydetails = ({ match }) => {

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const pharmacyId = match.params.pharmacyId;

    const dispatch = useDispatch();
    const { pharmacy } = useSelector(state => state.pharmacies)

    const [formdata, setformdata] = useState({
        name:"",
        imagefile:null,
        pictureUrl:'',
        phoneNumber:'',
        numberOfBranches:'', 
        email:'',
        facebookUrl:'',
        websiteUrl:''
          });
          useEffect(() => {
            if(!pharmacy){
            dispatch(GET_PHARMACY(pharmacyId))
            }
            else if(pharmacy){
              setformdata({
                  ...formdata,
                  name:pharmacy.name,
                  imagefile:null,
                  pictureUrl:pharmacy.pictureUrl,
                  phoneNumber:pharmacy.phoneNumber,
                  numberOfBranches:pharmacy.numberOfBranches, 
                  email:pharmacy.email,
                  facebookUrl:pharmacy.facebookUrl,
                  websiteUrl:pharmacy.websiteUrl
              })
            }
       },[dispatch,pharmacyId,pharmacy])

        //destructure component state
  const {
    name,
    imagefile,
    pictureUrl,
    phoneNumber,
    numberOfBranches,
    email,
    facebookUrl,
    websiteUrl
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
                      <h5><span className="spanpharmacy">pharmacy name :</span> {name}</h5><br />
                      <h5><span className="spanpharmacy">phoneNumber :</span> {phoneNumber}</h5><br />
                      <h5><span className="spanpharmacy">number Of Branches : </span> {numberOfBranches}</h5><br />
                      <h6><a style={{color:'black'}} href={email} target="_blank"><span style={{fontSize:'30px'}} className="fas fa-envelope spanpharmacy"></span></a> &nbsp; &nbsp; <a style={{color:'black'}} href={facebookUrl} target="_blank"><span style={{fontSize:'30px'}} className="fab fa-facebook spanpharmacy"></span></a> &nbsp; &nbsp; <a style={{color:'black'}} href={websiteUrl} target="_blank"><span style={{fontSize:'30px'}} className="fas fa-globe spanpharmacy"></span></a>    </h6><br />
                      <h6> &nbsp; </h6><br />
                      <h6> </h6>
                  </div>
                  <hr style={{transform:'rotate(90deg)',height:'1px',background:'black',width:'30%',position:'relative',top:'-210px',right:'30px'}} />
             
        </div>
    </div>
    )
}

export default Pharmacydetails;