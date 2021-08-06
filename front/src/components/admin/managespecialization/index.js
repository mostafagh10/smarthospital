import React , {useState , useEffect} from 'react';
import './style.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {GET_SPECIALIZATIONS,DELETE_SPECIALIZATION} from '../../../redux/actions/specializationAction'
import { useSelector } from 'react-redux'
import { getspecializationprocess } from '../APIs/specificationAPI'

const Managespecialization = () => {

    const dispatch = useDispatch();

    /*
    useEffect(() => {
        dispatch(GET_SPECIALIZATIONS())
      },[dispatch])
    
      const { specializations } = useSelector(state => state.specializations)
      */

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

    const [specializations2 , setspecializations2] = useState(null)

    const loadspecializations2 = async () => {
        await getspecializationprocess().then((response) => {
            setspecializations2(response.data)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        loadspecializations2();
    },[])

    const filterContent = (specializations , searchterm) => {
        const result = specializations.filter((specialization) => specialization.specializationName.includes(searchterm))
        setspecializations(result)
      }
      const handletextsearch = async e => {
        const searchterm = e.currentTarget.value
        await getspecializationprocess().then((response) => {
          filterContent(response.data , searchterm)
      }).catch((err) => {
          console.log(err)
      });
    
      }

    return(
    <div>
        <div className="container" style={{marginTop:'30px',textAlign:'center'}}>
        <h1 className="pagetitle" data-aos="fade-right">list of specializations</h1>
        <hr className="titlehr" size="20" data-aos="fade-right" />
            <Link to="/admin/addspecialization" style={{textDecoration:'none'}}>
                <button className="btn btn-outline-info btn-block managespecializationbutton" data-toggle="modal">
                    <i className="fas fa-plus"></i> Add specialization
                </button>
            </Link>

            <select onChange={handletextsearch} className="selectsearch">
            <option value="" disabled selected hidden>search by specialization name</option>
                {specializations2 && specializations2.map((c) => (
                    <option key={c._id}>{c.specializationName}</option>
                ))}
            </select>
        
        <table className="managespectable">
        <thead className="bg-info">
            <th>specialization name</th>
            <th>Delete</th>
            <th>Update</th>
        </thead>
        <tbody>
        {specializations && specializations.map(specialization => (
              <tr key={specialization.Name}>
              <td data-label="specialization Name">{specialization.specializationName}</td>
              <td data-label="Delete">
              <form>
                <button className="btn btn-danger text-white" onClick={() => dispatch(DELETE_SPECIALIZATION(specialization._id))}><i className="fas fa-trash-alt"></i></button>    
              </form>          
              </td>
              <td data-label="Update">
              <a href={`/admin/manage/editspecialization/${specialization._id}`}>
                <button className="btn btn-success text-white" ><i className="fas fa-edit"></i></button> 
                </a> 
              </td>
              </tr>
           ))}
        </tbody> 
        </table>
        </div>
    </div>
    )
}

export default Managespecialization;