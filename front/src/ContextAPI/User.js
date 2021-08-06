import React, { useState } from 'react'
import getMyAccount from './Node API/getMyAccount'

export const UserContext = React.createContext()
const UserProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [isUser, setIsUser]= useState(false)
    const [userType, setUserType]= useState({
        admin: false,
        doctor: false,
        patient: false
    })
    const [loading, setLoading] = useState(false)


    React.useEffect(() => {
        setLoading(true)
        const fetchUserData = async () => {
            const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
            console.log("localstorage");
            console.log(localUser);
            if (localUser) {
                const {
                    token,
                    type
                } = localUser
                
                const actor = type.admin ? 'admin' : type.doctor ? 'doctor' : 'patient'
                const response = await getMyAccount(token, actor)
                if (response.status === 200) {
                    // i use this structure because the BE return just user not token and i have already a token in local storage and i make sure it is available and correct 
                    setUser({ ...response.data, token })
                    setIsUser(true)
                    setUserType({ ...type })
                } else {
                    localStorage.removeItem("user")
                    setIsUser(false)
                    setLoading(false)
                    return {}
                }
            } else {
                setIsUser(false)
                console.log("false");
                return {}
            }
        }
        fetchUserData();
        setLoading(false)
    }, [])


    // type >> ex. { admin: true }
    const userLogin = (user, type)=>{
        setLoading(true)
        setUser(user)
        setIsUser(true)
        setUserType({ ...userType, ...type })
        localStorage.setItem("user", JSON.stringify({ token: user.token, type: { ...userType, ...type }}))
        console.log(type)
        setLoading(false)
    }

    const userLogout = ()=>{
        setLoading(true)
        setUser({})
        setIsUser(false)
        setUserType({ admin: false, doctor: false, patient: false })
        localStorage.removeItem("user")
        setLoading(false)
    }
    
    return (
        <UserContext.Provider value={{
            user,
            isUser,
            userLogin,
            userLogout,
            loading,
            setLoading,
            userType
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
