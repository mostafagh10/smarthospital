import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {GET_MEDICINE} from '../../../redux/actions/medicineAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Medicinedetails = ({ match }) => {

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const medicineId = match.params.medicineId;

    const dispatch = useDispatch();
    const { medicine } = useSelector(state => state.medicines)

    const [formdata, setformdata] = useState({
        name:"",
        imagefile:null,
        pictureUrl:'',
        price:'',
        howToTake:'', 
        diseaseName:'',
        manufacturer:'',
        description:''
      });
      useEffect(() => {
        if(!medicine){
        dispatch(GET_MEDICINE(medicineId))
        }
        else if(medicine){
          setformdata({
              ...formdata,
        name:medicine.name,
        imagefile:null,
        pictureUrl:medicine.pictureUrl,
        price:medicine.price,
        howToTake:medicine.howToTake, 
        diseaseName:medicine.diseaseName,
        manufacturer:medicine.manufacturer,
        description:medicine.description
          })
        }
   },[dispatch,medicineId,medicine])


    //destructure component state
  const {
    name,
    imagefile,
    pictureUrl,
    price,
    howToTake,
    diseaseName,
    manufacturer,
    description
  } = formdata;

    return(
      <div className="profilebody1">
      <div className="container" style={{textAlign:'center'}}>
      <div className="row">
            <div className="col-md-4 mt-1 padding-0">
              <div className="card text-center sidebarcard1">
                <div className="card-body">
                  <img src={pictureUrl} width="100%" height="300px" />
                  <div className="mt-3">
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1">

            </div>
            <div className="col-md-7 mt-1 padding-0">
              <div className="card mb-3 content1">
                <div className="card-body" style={{textAlign:'left'}}>
                  <div className="row">
                    <div className="col-md-12">
                      <h1>{name}</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="specialcolor">disease : {diseaseName}</h5>
                    </div>
                  </div><br />
                  <div className="row">
                    <div className="col-md-12">
                      <h5><span className="fas fa-window-maximize"></span> &nbsp;info</h5>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5 className="specialcolor">price</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {price} $
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5 className="specialcolor">howToTake</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {howToTake}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="specialcolor">manufacturer</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {manufacturer}
                    </div>         
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="specialcolor">description</h5>
                    </div>  
                    <div className="col-md-9 text-secondary">
                      {description}
                    </div>         
                  </div>   
                  <hr />
                </div>
              </div>  
            </div>
          </div>
          </div>
          </div>
    )
}

export default Medicinedetails;