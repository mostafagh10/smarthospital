import React , {useState , useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { FaStar } from 'react-icons/fa'
import './style.css';
import {useDispatch} from 'react-redux'
import {GET_DOCTORS , DELETE_DOCTOR} from '../../../redux/actions/doctorAction'
import { useSelector } from 'react-redux'
import { getdoctorsprocess } from '../../admin/APIs/doctorAPI'
import { getspecializationprocess } from '../../admin/APIs/specificationAPI'
import AOS from 'aos'
import "aos/dist/aos.css"

const Doctors = () => {

    const [rating , setrating] = useState(null)

    const [hover , sethover] = useState(null)

    const dispatch = useDispatch();

    /*
    useEffect(() => {
        dispatch(GET_DOCTORS())
      },[dispatch])
    
      const { doctors } = useSelector(state => state.doctors)
    */

      const [doctors , setdoctors] = useState(null)

      const loaddoctors = async () => {
          await getdoctorsprocess().then((response) => {
              setdoctors(response.data)
          }).catch((err) => {
              console.log(err)
          });
      }
      useEffect(() => {
          loaddoctors();
      },[])

      const [doctors2 , setdoctors2] = useState(null)

      const loaddoctors2 = async () => {
          await getdoctorsprocess().then((response) => {
              setdoctors2(response.data)
          }).catch((err) => {
              console.log(err)
          });
      }
      useEffect(() => {
          loaddoctors2();
      },[])

      const filterContent = (doctors , searchterm) => {
        const result = doctors.filter((doctor) => doctor.name.includes(searchterm))
        setdoctors(result)
      }
      const handletextsearch = async e => {
        const searchterm = e.currentTarget.value
        await getdoctorsprocess().then((response) => {
          filterContent(response.data , searchterm)
      }).catch((err) => {
          console.log(err)
      });
    
      }


      const [specializations , setspecializations] = useState(null)

      const loadspecializations = async () => {
          await getspecializationprocess().then((response) => {
              setspecializations(response.data)
          }).catch((err) => {
              console.log(err)
          });
      }
      useEffect(() => {
          loadspecializations();
      },[])


      const filterContent2 = (doctors , searchterm) => {
        const result = doctors.filter((doctor) => doctor.specialization.includes(searchterm))
        setdoctors(result)
      }
      const handletextsearch2 = async e => {
        const searchterm = e.currentTarget.value
        await getdoctorsprocess().then((response) => {
          filterContent2(response.data , searchterm)
      }).catch((err) => {
          console.log(err)
      });
    
      }

      useEffect(()=>{
        AOS.init({
            duration : 2000
        });
    })


    return(
    <div>
    <div className="one">
    <div className="container">
    <h1 data-aos="flip-down" className="pagetitle">The doctors</h1>
    <hr className="titlehr" size="20" data-aos="flip-down" />
    <br />
    <div className="input-group" style={{width:'80%',margin:'auto'}}>
    <input type="text" className="form-control" placeholder="Search the doctor" onChange={handletextsearch} />
    <div className="input-group-append">
      <button className="btn btn-primary" type="button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div><br />

    <select onChange={handletextsearch2} className="selectsearch2" data-aos="flip-down">
            <option value="" disabled selected hidden>search by specialization name</option>
                {specializations && specializations.map((c) => (
                    <option key={c._id}>{c.specializationName}</option>
                ))}
            </select>
        <div className="row">
        {doctors && doctors.map(x => {
            var avg = 0;
            return(
                    <div className="col-md-4" key={x._id} data-aos="flip-down">
                    <div className="card" id="servicedoctor">
                    <img className="card-img-top" src={x.pictureUrl} height="300" /><br />
                    <div>
                    <a href={`/doctor/${x._id}`}><h3>{x.name}</h3></a><br />
                        <h6>specialization : {x.specialization}</h6><br />
                        <h6>{x.workHours}</h6><br />
                        <h5>{x.rate.map(rate => {
                            avg = avg + rate.therate
                            console.log(avg)
                       }
                       )}</h5>
                       <div>
                            {[...Array(5)].map((star,i) => {
                                const ratingvalue = i+1;
                                return (
                                <label>
                                <input type="radio" name="rating" className="rateradio" value={ratingvalue}
                                 onClick={() => setrating(ratingvalue)} />
                                <FaStar onMouseEnter={() => sethover(ratingvalue)} 
                                 onMouseLeave = {() => sethover(null)}
                                color={ratingvalue < avg / x?.rate?.length || ratingvalue == avg / x?.rate?.length ? "yellow" : "grey" } className="star" size="30" />
                                </label>
                                )
                            })}
                        </div>
                        </div>
                        <a href={`/doctor/${x._id}`}><button className="btn btn-info" style={{width:'100%'}}><span className="fas fa-eye"></span> &nbsp; view more details</button></a>
                    </div>
                  </div>
            )
        }
        )}
      </div>
      </div>
      </div>
    </div>
    )
}

export default Doctors;