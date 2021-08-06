import React , {useState , useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import './style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers,faTrophy,faCoffee,faFile,faRocket,faCogs,faPencilAlt,faFlask,faGem} from '@fortawesome/free-solid-svg-icons';
import {useDispatch} from 'react-redux'
import {GET_MEDICINES , DELETE_MEDICINE} from '../../../redux/actions/medicineAction'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import "aos/dist/aos.css"
import $ from 'jquery'
import {getmedicinesprocess} from '../../admin/APIs/medicineAPI'
import { getdiseaseprocess } from '../../admin/APIs/diseaseAPI'
library.add(faUsers,faTrophy,faCoffee,faFile,faRocket,faCogs,faPencilAlt,faFlask,faGem);

const Medicines = () => {
  /*
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_MEDICINES())
      },[dispatch])
  
    const { medicines } = useSelector(state => state.medicines)
    */

      useEffect(()=>{
        AOS.init({
            duration : 1000
        });
    })

    const [medicines , setmedicines] = useState(null)

      const loadmedicines = async () => {
          await getmedicinesprocess().then((response) => {
              setmedicines(response.data)
          }).catch((err) => {
              console.log(err)
          });
      }
      useEffect(() => {
          loadmedicines();
      },[])

      const filterContent = (medicines , searchterm) => {
        const result = medicines.filter((medicine) => medicine.name.includes(searchterm))
        setmedicines(result)
      }
      const handletextsearch = async e => {
        const searchterm = e.currentTarget.value
        await getmedicinesprocess().then((response) => {
          filterContent(response.data , searchterm)
      }).catch((err) => {
          console.log(err)
      });
    
      }

      const [diseases , setdiseases] = useState(null)

    const loaddiseases = async () => {
        await getdiseaseprocess().then((response) => {
            setdiseases(response.data)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        loaddiseases();
    },[])

    const filterContent2 = (medicines , searchterm) => {
      const result = medicines.filter((medicine) => medicine.diseaseName.includes(searchterm))
      setmedicines(result)
    }
    const handletextsearch2 = async e => {
      const searchterm = e.currentTarget.value
      await getmedicinesprocess().then((response) => {
        filterContent2(response.data , searchterm)
    }).catch((err) => {
        console.log(err)
    });
  
    }



    return(
    <div>
    <div className="one">
    <div className="container">
    <h1 data-aos="flip-down" className="pagetitle">The medicines</h1>
    <hr className="titlehr" size="20" data-aos="flip-down" />
    <br />
    <div className="input-group" style={{width:'80%',margin:'auto'}}>
    <input type="text" className="form-control" placeholder="Search the medicine" onChange={handletextsearch} />
    <div className="input-group-append">
      <button className="btn btn-primary" type="button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div><br />
   <select onChange={handletextsearch2} className="selectsearch2" data-aos="flip-down">
            <option value="" disabled selected hidden>search by disease name</option>
                {diseases && diseases.map((c) => (
                    <option key={c._id}>{c.diseaseName}</option>
                ))}
            </select>
        <div className="row">
        {medicines && medicines.map(x => (
                <div className="col-md-4" key={x._id} data-aos="flip-down">
                <div className="card" id="servicemedicine">
                    <img className="card-img-top" src={x.pictureUrl} height="200" /><br />
                    <div id="servicemedicine2">
                    <a href={`/medicine/${x._id}`}><h3>{x.name}</h3></a><br />
                    <h5>{x.description} $</h5>
                    </div><br />
                    <a href={`/medicine/${x._id}`}>
                    <button className="more btn btn-info" style={{width:'100%'}}><span className="fas fa-eye"></span> &nbsp; Read more</button>
                    </a>
                </div>
              </div>
        ))}
      </div>
      </div>
      </div>
    </div>
    )
}

export default Medicines;