import React , {useState , useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import './style.css';
import {useDispatch} from 'react-redux'
import {GET_HOSPITALS , DELETE_HOSPITAL} from '../../../redux/actions/hospitalAction'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import "aos/dist/aos.css"
import {gethospitalprocess} from '../../admin/APIs/hospitalAPI'

const Hospitals = () => {

  /*
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_HOSPITALS())
      },[dispatch])

      const { hospitals } = useSelector(state => state.hospitals)
  */

      useEffect(()=>{
        AOS.init({
            duration : 1000
        });
    })

    const [hospitals , sethospitals] = useState(null)

    const loadhospitals = async () => {
        await gethospitalprocess().then((response) => {
            sethospitals(response.data)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        loadhospitals();
    },[])

    const filterContent = (hospitals , searchterm) => {
      const result = hospitals.filter((hospital) => hospital.name.includes(searchterm))
      sethospitals(result)
    }
    const handletextsearch = async e => {
      const searchterm = e.currentTarget.value
      await gethospitalprocess().then((response) => {
        filterContent(response.data , searchterm)
    }).catch((err) => {
        console.log(err)
    });
  
    }


    return(
    <div>
    <div className="one">
    <div className="container">
    <h1 data-aos="zoom-out" className="pagetitle">The hospitals</h1>
    <hr className="titlehr" size="20" data-aos="zoom-out" />
    <br />
        <div className="row">
        <div className="input-group" style={{width:'80%',margin:'auto'}}>
    <input type="text" className="form-control" placeholder="Search the hospital" onChange={handletextsearch} />
    <div className="input-group-append">
      <button className="btn btn-primary" type="button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div><br />
        {hospitals && hospitals.map(x => (
                <div className="col-md-4" key={x._id} data-aos="zoom-out">
                <div className="card" id="servicehospital">
                <img className="card-img-top" src={x.pictureUrl} height="200" /><br />
                <div>
                <a href={`/hospital/${x._id}`}><h4>{x.name}</h4></a><br />
                <h6>phone number : {x.phone}</h6>
                <h6>address : {x.address}</h6><br />
                </div>
                <a href={`/hospital/${x._id}`}><button className="more btn btn-info" style={{width:'100%'}}><span className="fas fa-eye"></span> View More Details</button></a>
                </div>
              </div>
        ))}
      </div>
      </div>
      </div>
    </div>
    )
}

export default Hospitals;