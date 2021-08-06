import React , {useState , useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import './style.css';
import {useDispatch} from 'react-redux'
import {GET_DISEASES,DELETE_DISEASE} from '../../../redux/actions/diseaseAction'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import "aos/dist/aos.css"
import {getdiseaseprocess} from '../../admin/APIs/diseaseAPI'

const Diseases = () => {

  /*

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_DISEASES())
      },[dispatch])
    
      const { diseases } = useSelector(state => state.diseases)

    */

      useEffect(()=>{
        AOS.init({
            duration : 1000
        });
    })

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

    const filterContent = (diseases , searchterm) => {
      const result = diseases.filter((disease) => disease.diseaseName.includes(searchterm))
      setdiseases(result)
    }
    const handletextsearch = async e => {
      const searchterm = e.currentTarget.value
      await getdiseaseprocess().then((response) => {
        filterContent(response.data , searchterm)
    }).catch((err) => {
        console.log(err)
    });
  
    }


    return(
    <div>
    <div className="one">
    <div className="container">
    <h1 data-aos="flip-right" className="pagetitle">The diseases</h1>
    <hr className="titlehr" size="20" data-aos="flip-right" />
    <br />
        <div className="row">
        <div className="input-group" style={{width:'80%',margin:'auto'}}>
    <input type="text" className="form-control" placeholder="Search this disease" onChange={handletextsearch} />
    <div className="input-group-append">
      <button className="btn btn-primary" type="button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div><br />
        {diseases && diseases.map(x => (
                <div className="col-md-4" key={x._id} data-aos="flip-right">
                <div className="card" id="servicedisease">
                <img className="card-img-top" src={x.pictureUrl} height="270" /><br />
                <div>
                <a href={`/disease/${x._id}`}><h3>{x.diseaseName}</h3></a>
                    <p>{x.description}</p>
                </div>
                <a href={`/disease/${x._id}`}><button className="more btn btn-info" style={{width:'100%'}}><span className="fas fa-eye"></span> &nbsp;Read More</button></a>
                </div>
              </div>
        ))}
      </div>
      </div>
      </div>
    </div>
    )
}

export default Diseases;