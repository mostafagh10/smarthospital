import React , {useState , useEffect} from 'react';
import './style.css'
import {GET_ALLADMINS} from '../../../redux/actions/adminAction'
import {GET_REQUESTS} from '../../../redux/actions/requestAction'
import {GET_DOCTORS} from '../../../redux/actions/doctorAction'
import {GET_PATIENTS} from '../../../redux/actions/patientAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'


const ManageHome = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_ALLADMINS())
  },[dispatch])

  const { admins } = useSelector(state => state.admins)

  useEffect(() => {
    dispatch(GET_REQUESTS())
  },[dispatch])

  const { requests } = useSelector(state => state.requests)

  useEffect(() => {
    dispatch(GET_DOCTORS())
  },[dispatch])

  const { doctors } = useSelector(state => state.doctors)

  useEffect(() => {
    dispatch(GET_PATIENTS())
  },[dispatch])

  const { patients } = useSelector(state => state.patients)



    return(
    <div>
        <div className="container" style={{marginTop:'70px'}}>
            <div className="row">
                <div className="col-md-6">
                    <div className="adminsnum" style={{textAlign:'center'}}>
                    <h1 className="fas fa-users-cog"></h1>
                     <h1>total admins</h1>
                     {admins && admins.map((admin,i) => {
                       if(i == admins.length-1){
                        return(
                        <h1>{i+1}</h1>
                        )
                        }
                      })}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="adminsnum" style={{textAlign:'center'}}>
                    <h1 className="fas fa-hospital-user"></h1>
                     <h1>total doctors</h1>
                     {doctors ? (
                     <h1>{doctors.length}</h1>
                     ) : (
                       <h1>please wait</h1>
                     )}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="adminsnum" style={{textAlign:'center'}}>
                    <h1 className="fas fa-users"></h1>
                     <h1>total patients</h1>
                     {patients ? (
                     <h1>{patients.length}</h1>
                     ) : (
                       <h1>please wait</h1>
                     )}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="adminsnum" style={{textAlign:'center'}}>
                    <h1 className="fas fa-notes-medical"></h1>
                     <h1>total requests</h1>
                     {requests ? (
                       <h1>{requests.length}</h1>
                     ) : (
                       <h1>please wait</h1>
                     )}
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default ManageHome;