import React , {useContext} from 'react';
import {Link} from 'react-router-dom'
import './style.css'
import {  UserContext } from '../../../ContextAPI/User'
import logoutUser from '../../../ContextAPI/Node API/logout'
import {useHistory} from 'react-router-dom'
import App4 from '../chatbot/index'

const Navbar = ({showchatbot}) => {

    let history = useHistory();

    const {userLogout , isUser , user, userType} = useContext(UserContext)
    /*          navbar             */
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
        } 
        }).catch((err) => {
            console.log(err)
        })
      }

    return(
        <div>
        <div classNameName="Nav">
        <nav class="navbar navbar-expand-xl navbar-dark bg-info">
    <a class="navbar-brand" href="/">smart hospital</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContentXL" aria-controls="navbarSupportedContentXL" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContentXL">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/medicines">medicines</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/pharmacies">pharmacies</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/hospitals">hospitals</Link>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownXL" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    services
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownXL">
                <Link className="dropdown-item" to="#" onClick={showchatbot}><span className="fas fa-question-circle"></span> &nbsp; diagnose</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/doctors"><span className="fas fa-comments"></span> &nbsp; call doctor</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/diseases"><span className="fas fa-virus"></span> &nbsp; infection diseases</Link>
                    {isUser && 
                    <>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/messenger"><span className="fas fa-eye"></span> &nbsp; view chat</a>
                    </>
                    }
                </div>
            </li>
            {isUser && 
            <div>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownXL" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                feedbacks
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownXL">
            {z ? (
            <a className="dropdown-item" href={`/feedbacks/add/${z}`}><span className="fas fa-plus"></span> &nbsp; add</a>
            ) : (
                <a className="dropdown-item" href={`/feedbacks/add/${y._id}`}><span className="fas fa-plus"></span> &nbsp; add</a>
            )}
                <div className="dropdown-divider"></div>
                {z ? (
                <a className="dropdown-item" href={`/feedbacks/view/${z}`}><span className="fas fa-eye"></span> &nbsp; view</a>
                ) : (
                    <a className="dropdown-item" href={`/feedbacks/view/${y._id}`}><span className="fas fa-eye"></span> &nbsp; view</a>
                )}
            </div>
            </li>
            </div>
            }
        </ul>
        <ul className="navbar-nav my-2 my-lg-0">
        {!isUser &&
        <li className="nav-item">
        <Link className="nav-link" to="/loginoptions">log in</Link>
        </li>
        }
        {isUser && 
        <li className="nav-item dropdown">
        {user.patient ? (
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownXL" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src={user?.patient?.pictureUrl} width="35" height="35" style={{borderRadius:'50%'}} /> {user?.patient?.name} 
        </a>
        ) :  (
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownXL" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src={y.pictureUrl} width="35" height="35" style={{borderRadius:'50%'}} /> {y.name} 
        </a>
        )
        }
        <div className="dropdown-menu" aria-labelledby="navbarDropdownXL" style={{padding:'10px'}}>
        {z ? (
        <a className="dropdown-item" href={`/profile/${z}`}><span className="fas fa-eye"></span> &nbsp; view</a>
        ) : (
            <a className="dropdown-item" href={`/profile/${y._id}`}><span className="fas fa-eye"></span> &nbsp; view</a>
        )}
        <div className="dropdown-divider"></div>
        {z ? (
        <a className="dropdown-item" href={`/editprofile/${z}`}><span className="fas fa-user-edit"></span> &nbsp; edit</a>
        ) : (
            <a className="dropdown-item" href={`/editprofile/${y._id}`}><span className="fas fa-user-edit"></span> &nbsp; edit</a>
        )}
            <div className="dropdown-divider"></div>
            <button className="nav-link btn btn-danger" style={{color:'white',margin:'10px',padding:'10px'}} onClick={handlesubmit}><span className="fas fa-sign-out-alt"></span> &nbsp; Log Out</button>
        </div>
        </li>
        }
        <li className="nav-item">
                <Link className="nav-link" to="/about">about us</Link>
        </li>
        </ul>
    </div>
</nav>
      </div>
      </div>
    )
}

export default Navbar;