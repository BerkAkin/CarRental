import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Contexts/AuthContext';
import AdminPage from '../AdminPage/AdminPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import UserPage from '../UserPage/UserPage';

function ProfilePage() {

    const { checkUser } = useAuthContext();
    const [isUserValid, setIsUserValid] = useState<boolean | null>(null);
    const [roleId, setRoleId] = useState<number | null>(null);

    useEffect(() => {

        const checkUserStatus = async () => {
            const result = await checkUser();
            setIsUserValid(result);
        };

        const userInfo = JSON.parse(localStorage.getItem("UserInfo") || "{}");
        setRoleId(userInfo?.roleId);
        checkUserStatus();
    }, []);

    if (isUserValid) {
        if (roleId === 1) {
            return <AdminPage />;
        }
        else if (roleId === 2) {
            return <UserPage />;
        }
    }
    return <ErrorPage ErrorMessage='Sayfayı görüntülemek için yetkiniz olduğundan emin olun veya giriş yapın' />;


}

export default ProfilePage