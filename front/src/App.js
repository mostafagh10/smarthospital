import React , {useContext , useState} from 'react'
import {BrowserRouter,Route , Link , useHistory} from 'react-router-dom'
import {} from 'react-router'
import logoutUser from './ContextAPI/Node API/logout'
/*    admin     */
import Sidebar from './components/admin/sidebar/index'
import ManageAdmin from './components/admin/manageadmin/index'
import Managespecialization from './components/admin/managespecialization/index'
import Managedisease from './components/admin/managedisease/index'
import Managedoctor from './components/admin/managedoctor/index'
import Managehospital from './components/admin/managehospital/index'
import Managepharmacy from './components/admin/managepharmacy/index'
import Managemedicine from './components/admin/managemedicine/index'
import ManagePatient from './components/admin/managepatient/index'
import ManageRequest from './components/admin/managerequest/index'
import ManageHome from './components/admin/managehome/index'
import AdminProfile from './components/admin/adminprofile/index'
import EditAdminprofile from './components/admin/updateadminprofile/index'

import AddAdmin from './components/admin/manageadmin/addadmin/index'
import Addspecialization from './components/admin/managespecialization/addspecialization/index'
import Adddisease from './components/admin/managedisease/adddisease/index'
import Adddoctor from './components/admin/managedoctor/adddoctor/index'
import Addhospital from './components/admin/managehospital/addhospital/index'
import Addpharmacy from './components/admin/managepharmacy/addpharmacy/index'
import Addmedicine from './components/admin/managemedicine/addmedicine/index'

import Editspecialization from './components/admin/managespecialization/editspecialization/index'
import Editdisease from './components/admin/managedisease/editdisease/index'
import Editdoctor from './components/admin/managedoctor/editdoctor/index'
import Edithospital from './components/admin/managehospital/edithospital/index'
import Editpharmacy from './components/admin/managepharmacy/editpharmacy/index'
import EditAdmin from './components/admin/manageadmin/editadmin/index'
import EditMedicine from './components/admin/managemedicine/editmedicine/index'

/*              user             */
import Navbar from './components/user/navbar/index'
import Home from './components/user/home/index'
import Pharmacies from './components/user/pharmacies/index'
import Hospitals from './components/user/hospitals/index'
import Doctors from './components/user/doctors/index'
import Diseases from './components/user/diseases/index'
import About from './components/user/about/index'
import Medicines from './components/user/medicines/index'
import Loginoptions from './components/user/loginoptions/index'
import PatientLogin from './components/user/patientlogin/index'
import DoctorLogin from './components/user/doctorlogin/index'
import AdminLogin from './components/user/adminlogin/index'
import AddPatient from './components/user/signup/index'
import AddRequest from './components/user/joindoctorteam/index'
import Feedback from './components/user/feedback/index'
import Feedbackview from './components/user/feedback/view/index'
import FeedbackUser from './components/user/userfeedbacks/index'
import PatientProfile from './components/user/patientprofile/index'
import EditPatientprofile from './components/user/updateprofile/index'
import SendEmail from './components/user/forgetpassword/sendemail/index'
import SendVerification from './components/user/forgetpassword/sendvertification/index'
import ChangePassword from './components/user/forgetpassword/confirmpassword/index'
import SendEmailDoctor from './components/user/forgetpassworddoctor/sendemail/index'
import SendVerificationDoctor from './components/user/forgetpassworddoctor/sendvertification/index'
import ChangePasswordDoctor from './components/user/forgetpassworddoctor/confirmpassword/index'

import SendEmailAdmin from './components/user/forgetpasswordadmin/sendemail/index'
import SendVerificationAdmin from './components/user/forgetpasswordadmin/sendvertification/index'
import ChangePasswordAdmin from './components/user/forgetpasswordadmin/confirmpassword/index'
import Footer from './components/user/footer/index'
import App4 from './components/user/chatbot/index'

/*          details          */
import Pharmacydetails from './components/details/pharmacy/index'
import Doctordetails from './components/details/doctor/index'
import Hospitaldetails from './components/details/hospital/index'
import Medicinedetails from './components/details/medicine/index'
import Diseasedetails from './components/details/disease/index'
import Admindetails from './components/details/admin/index'
import Requestdetails from './components/details/request/index'
import Patientdetails from './components/details/patient/index'

/*          doctors         */
import DoctorNavbar from './components/doctor/navbar/index'
import DoctorHome from './components/doctor/home/index'
import DoctorProfile from './components/doctor/doctorprofile/index'
import Editdoctorprofile from './components/doctor/editdoctorprofile/index'

/*             messenger            */
import Messenger from './components/messenger/messenger'
import MessengerDoctor from './components/messengerdoctor/messenger'

import {  UserContext } from './ContextAPI/User'

const App = () => {

  const { isUser , userType , userLogout , user } = useContext(UserContext)

    /*          navbar             */
    let history = useHistory();
    const x = JSON.stringify(user)
    const y = JSON.parse(x)
    console.log(user)
    const z = user?.patient?._id

    const handlesubmit = (e) => {
        e.preventDefault();
          console.log(userType);
          logoutUser('patient',user.token).then((response) => {
            if(response.status == 200){
            userLogout()
            history.push('/')  
            console.log("log out done now")
        } 
        }).catch((err) => {
            console.log(err)
        })
      }

      const [showapp4 , setshowapp4] = useState(false)

      const showchatbot = () => {
        setshowapp4({
          showapp4:true
        })
      }
  return (
    <div className="App">
      <BrowserRouter>

      {(!userType.doctor && !userType.admin) && (
       <Navbar showchatbot={showchatbot} />
      )}

      {(isUser && userType.doctor) && (
      <DoctorNavbar />
      
      )}

      {(isUser && userType.admin) && (

      <Sidebar />
      
      )}


      <Route exact path="/admin/manageadmin" component={ManageAdmin} />
      <Route exact path="/admin/addadmin" component={AddAdmin} />
      <Route exact path="/admin/manage/editadmin/:adminId" component={EditAdmin} />
      <Route exact path="/admin/managespecialization" component={Managespecialization} />
      <Route exact path="/admin/addspecialization" component={Addspecialization} />
      <Route exact path="/admin/manage/editspecialization/:specializationId" component={Editspecialization} />
      <Route exact path="/admin/managedisease" component={Managedisease} />
      <Route exact path="/admin/adddisease" component={Adddisease} />
      <Route exact path="/admin/manage/editdisease/:diseaseId" component={Editdisease} />
      <Route exact path="/admin/managedoctor" component={Managedoctor} />
      <Route exact path="/admin/adddoctor" component={Adddoctor} />
      <Route exact path="/admin/manage/editdoctor/:doctorId" component={Editdoctor} />
      <Route exact path="/admin/managehospital" component={Managehospital} />
      <Route exact path="/admin/addhospital" component={Addhospital} />
      <Route exact path="/admin/manage/edithospital/:hospitalId" component={Edithospital} />
      <Route exact path="/admin/managepharmacy" component={Managepharmacy} />
      <Route exact path="/admin/addpharmacy" component={Addpharmacy} />
      <Route exact path="/admin/manage/editpharmacy/:pharmacyId" component={Editpharmacy} />
      <Route exact path="/admin/managemedicine" component={Managemedicine} />
      <Route exact path="/admin/addmedicine" component={Addmedicine} />
      <Route exact path="/admin/manage/editmedicine/:medicineId" component={EditMedicine} />
      <Route exact path="/admin/profile/:adminId" component={AdminProfile} />
      <Route exact path="/admin/editprofile/:adminId" component={EditAdminprofile} />
      <Route exact path="/admin/feedbacks" component={Feedbackview} />

      <Route exact path="/admin/managepatient" component={ManagePatient} />
      <Route exact path="/admin/managerequest" component={ManageRequest} />
      <Route exact path="/admin/home" component={ManageHome} />

      <Route exact path="/" component={Home} />
      <Route exact path="/pharmacies" component={Pharmacies} />
      <Route exact path="/hospitals" component={Hospitals} />
      <Route exact path="/doctors" component={Doctors} />
      <Route exact path="/diseases" component={Diseases} />
      <Route exact path="/about" component={About} />
      <Route exact path="/medicines" component={Medicines} />
      <Route exact path="/feedbacks/add/:patientId" component={Feedback} />
      <Route exact path="/feedbacks/view/:patientId" component={FeedbackUser} />
      <Route exact path="/loginoptions" component={Loginoptions} />
      <Route exact path="/login" component={PatientLogin} />
      <Route exact path="/login/doctor" component={DoctorLogin} />
      <Route exact path="/login/admin" component={AdminLogin} />
      <Route exact path="/signup" component={AddPatient} />
      <Route exact path="/joindoctorteam" component={AddRequest} />
      <Route exact path="/profile/:patientId" component={PatientProfile} />
      <Route exact path="/editprofile/:patientId" component={EditPatientprofile} />
      <Route exact path="/forgetpassword/sendemail" component={SendEmail} />
      <Route exact path="/forgetpassword/sendvertification" component={SendVerification} />
      <Route exact path="/forgetpassword/changepassword" component={ChangePassword} />
      <Route exact path="/forgetpassword/doctor/sendemail" component={SendEmailDoctor} />
      <Route exact path="/forgetpassword/doctor/sendvertification" component={SendVerificationDoctor} />
      <Route exact path="/forgetpassword/doctor/changepassword" component={ChangePasswordDoctor} />
      <Route exact path="/forgetpassword/admin/sendemail" component={SendEmailAdmin} />
      <Route exact path="/forgetpassword/admin/sendvertification" component={SendVerificationAdmin} />
      <Route exact path="/forgetpassword/admin/changepassword" component={ChangePasswordAdmin} />


      <Route exact path="/pharmacy/:pharmacyId" component={Pharmacydetails} />
      <Route exact path="/doctor/:doctorId" component={Doctordetails} />
      <Route exact path="/hospital/:hospitalId" component={Hospitaldetails} />
      <Route exact path="/medicine/:medicineId" component={Medicinedetails} />
      <Route exact path="/disease/:diseaseId" component={Diseasedetails} />
      <Route exact path="/admin/admin/:adminId" component={Admindetails} />
      <Route exact path="/request/:doctorId" component={Requestdetails} />
      <Route exact path="/patient/:patientId" component={Patientdetails} />
      <Route exact path="/messenger" component={Messenger} />

      <Route exact path="/doctorpage/home" component={DoctorHome} />
      <Route exact path="/messengerdoctor" component={MessengerDoctor} />
      <Route exact path="/doctorpage/profile/:doctorId" component={DoctorProfile} />
      <Route exact path="/doctorpage/editprofile/:doctorId" component={Editdoctorprofile} />

      

      {(!userType.doctor && !userType.admin) &&
      <div>
      {showapp4 ? (
      <App4 />
      ) : (
        <p></p>
      )}
      <Footer />
      </div>
      }
      
      </BrowserRouter>
    </div>
  );
}

export default App;
