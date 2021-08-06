import React , {useState , useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import './style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers,faTrophy,faCoffee,faFile,faRocket,faCogs,faPencilAlt,faFlask,faGem} from '@fortawesome/free-solid-svg-icons';
import {useDispatch} from 'react-redux'
import {GET_PHARMACIES , DELETE_PHARMACY} from '../../../redux/actions/pharmacyAction'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import "aos/dist/aos.css"
import {getpharmaciesprocess} from '../../admin/APIs/pharmacyAPI'
library.add(faUsers,faTrophy,faCoffee,faFile,faRocket,faCogs,faPencilAlt,faFlask,faGem);

const Pharmacies = () => {

    /*
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_PHARMACIES())
      },[dispatch])
    
      const { pharmacies } = useSelector(state => state.pharmacies)
    */

      useEffect(()=>{
        AOS.init({
            duration : 1000
        });
    })

    const [pharmacies , setpharmacies] = useState(null)

      const loadpharmacies = async () => {
          await getpharmaciesprocess().then((response) => {
              setpharmacies(response.data)
          }).catch((err) => {
              console.log(err)
          });
      }
      useEffect(() => {
          loadpharmacies();
      },[])

      const filterContent = (pharmacies , searchterm) => {
        const result = pharmacies.filter((pharmacy) => pharmacy.name.includes(searchterm))
        setpharmacies(result)
      }
      const handletextsearch = async e => {
        const searchterm = e.currentTarget.value
        await getpharmaciesprocess().then((response) => {
          filterContent(response.data , searchterm)
      }).catch((err) => {
          console.log(err)
      });
    
      }


    return(
    <div>
    <div className="one">
    <div className="container" style={{textAlign:'center'}}>
    <h1 data-aos="zoom-in" className="pagetitle">The pharmacies</h1>
    <hr className="titlehr" size="20" data-aos="zoom-in" /><br /><br />
    <div className="input-group" style={{width:'80%',margin:'auto'}}>
    <input type="text" className="form-control" placeholder="Search the pharmacy" onChange={handletextsearch} />
    <div className="input-group-append">
      <button className="btn btn-primary" type="button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div><br />
        <div className="row">
        {pharmacies && pharmacies.map(x => (
                <div className="col-md-4" key={x._id} data-aos="zoom-in">
                <div className="card" id="servicepharmacy">
                <img className="card-img-top" src={x.pictureUrl} height="200" /><br />
                    <div>
                    <a href={`/pharmacy/${x._id}`}><h4>{x.name}</h4></a><br />
                    <h6>phone Number : {x.phoneNumber}</h6><br />
                    <h6>number of branches : {x.numberOfBranches}</h6>
                    </div><br />
                    <a href={`/pharmacy/${x._id}`}><button className="btn btn-info" style={{width:'100%'}}><span className="fas fa-eye"></span> &nbsp; view more details</button></a>
                </div>
              </div>
        ))}
      </div>
      </div>
      </div>
    </div>
    )
}

export default Pharmacies;