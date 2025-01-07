import { useAuthContext } from '../../Contexts/AuthContext';
import AdminPage from '../AdminPage/AdminPage';
import UserPage from '../UserPage/UserPage';

function ProfilePage() {
    const { userTypeId } = useAuthContext();


    if (userTypeId == "1") {
        return (
            <AdminPage />
        )
    }
    else if (userTypeId == "2") {
        return <> <UserPage /></>
    }
    return <></>
}

export default ProfilePage