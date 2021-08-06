import React , {useState , useEffect} from 'react';
import './style.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {GET_DOCTORS , DELETE_DOCTOR} from '../../../redux/actions/doctorAction'
import { useSelector } from 'react-redux'
import { getdoctorsprocess } from '../APIs/doctorAPI'
import { FaStar } from 'react-icons/fa'

const Managedoctor = () => {

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



    return(
    <div>
        <div className="container" style={{marginTop:'30px' , textAlign:'center'}}>
        <h1 className="pagetitle">list of doctors</h1>
        <hr className="titlehr" size="20" />
            <Link to="/admin/adddoctor" style={{textDecoration:'none'}}>
                <button className="btn btn-outline-info btn-block managedoctorbutton" data-toggle="modal">
                    <i className="fas fa-plus"></i> Add doctor
                </button>
            </Link>

            <select onChange={handletextsearch} className="selectsearch">
            <option value="" disabled selected hidden>search by doctor name</option>
                {doctors2 && doctors2.map((c) => (
                    <option key={c._id}>{c.name}</option>
                ))}
            </select>

        <table className="managesoctortable">
        <thead className="bg-info">
            <th>doctor name</th>
            <th>doctor's last login</th>
            <th>doctor rate</th>
            <th>Delete</th>
            <th>Update</th>
        </thead>
        <tbody>
        {doctors && doctors.map(doctor =>  {
            var avg = 0;
            return (
              <tr key={doctor.Name}>
              <td data-label="doctor Name"><a href={`/doctor/${doctor._id}`}>{doctor.name}</a></td>
              <td data-label="doctor's last login">{new Intl.DateTimeFormat('en-GB', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            }).format(new Date(doctor.lastLogin))}</td>
              <td data-label="doctor rate">
              {doctor.rate.map(rate => {
                avg = avg + rate.therate
            }
            )}
                <div>
                {[...Array(5)].map((star,i) => {
                                const ratingvalue = i+1;
                                return (
                                <label>
                                <input type="radio" name="rating" className="rateradio" value={ratingvalue}
                                 />
                                <FaStar
                                color={ratingvalue < avg / doctor?.rate?.length || ratingvalue == avg / doctor?.rate?.length ? "yellow" : "grey" } className="star" size="30" />
                                </label>
                                )
                })}
                </div>
              </td>
              <td data-label="Delete">
              <form>
                <button className="btn btn-danger text-white" onClick={() => dispatch(DELETE_DOCTOR(doctor._id))}><i className="fas fa-trash-alt"></i></button>    
              </form>           
              </td>
              <td data-label="Update">
              <a href={`/admin/manage/editdoctor/${doctor._id}`}>
                <button className="btn btn-success text-white" ><i className="fas fa-edit"></i></button> 
                </a> 
              </td>
              </tr>
           )
             }
        )}
        </tbody> 
        </table>
        </div>
    </div>
    )
}

export default Managedoctor;