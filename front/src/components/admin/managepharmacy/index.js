import React , {useState , useEffect} from 'react';
import './style.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {GET_PHARMACIES , DELETE_PHARMACY} from '../../../redux/actions/pharmacyAction'
import { useSelector } from 'react-redux'
import { getpharmaciesprocess } from '../APIs/pharmacyAPI'

const Managepharmacy = () => {

    const dispatch = useDispatch();

    /*
    useEffect(() => {
        dispatch(GET_PHARMACIES())
      },[dispatch])
    
      const { pharmacies } = useSelector(state => state.pharmacies)
    
    */

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

      const [pharmacies2 , setpharmacies2] = useState(null)

      const loadpharmacies2 = async () => {
          await getpharmaciesprocess().then((response) => {
              setpharmacies2(response.data)
          }).catch((err) => {
              console.log(err)
          });
      }
      useEffect(() => {
          loadpharmacies2();
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
        <div className="container" style={{marginTop:'30px' , textAlign:'center'}}>
            <Link to="/admin/addpharmacy" style={{textDecoration:'none'}}>
                <button className="btn btn-outline-info btn-block managepharmacybutton" data-toggle="modal">
                    <i className="fas fa-plus"></i> Add pharmacy
                </button>
            </Link>

            <select onChange={handletextsearch} className="selectsearch">
            <option value="" disabled selected hidden>search by pharmacy name</option>
                {pharmacies2 && pharmacies2.map((c) => (
                    <option key={c._id}>{c.name}</option>
                ))}
            </select>


        <table className="managepharmacytable">
        <thead className="bg-info">
            <th>pharmacy name</th>
            <th>Delete</th>
            <th>Update</th>
        </thead>
        <tbody>
        {pharmacies && pharmacies.map(pharmacy => (
              <tr key={pharmacy.Name}>
              <td data-label="pharmacy Name"><a href={`/pharmacy/${pharmacy._id}`}>{pharmacy.name}</a></td>
              <td data-label="Delete">
              <form>
                <button className="btn btn-danger text-white" onClick={() => dispatch(DELETE_PHARMACY(pharmacy._id))}><i className="fas fa-trash-alt"></i></button>    
              </form>         
              </td>
              <td data-label="Update">
              <a href={`/admin/manage/editpharmacy/${pharmacy._id}`}>
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

export default Managepharmacy;