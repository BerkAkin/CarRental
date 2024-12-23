import React, { useContext } from 'react'
import { useAuthContext } from '../../../Contexts/AuthContext'
import AdminProfile from './Admin/AdminProfile';
import UserProfile from './User/UserProfile';


function Profile() {
    const { userTypeId } = useAuthContext();

    if (userTypeId == "1") {
        return <> <AdminProfile /></>
    }
    else if (userTypeId == "2") {
        return <> <UserProfile /></>
    }
    return <>userTypeid:{userTypeId}</>

}

export default Profile