import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Contexts/AuthContext';
import AdminPage from '../AdminPage/AdminPage';
import ErrorPage from '../ErrorPage/InfoPage';
import UserPage from '../UserPage/UserPage';

function ProfilePage() {

    const { checkUser } = useAuthContext();
    const [isUserValid, setIsUserValid] = useState<boolean | null>(null);
    const [roleId, setRoleId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const checkUserStatus = async () => {
        try {
            const result = await checkUser();
            setIsUserValid(result);
            const userInfo = JSON.parse(localStorage.getItem("UserInfo") || "{}");
            setRoleId(userInfo?.roleId || null);
        } catch (error) {
            console.error("Kullanıcı doğrulama hatası:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkUserStatus();
    }, []);


    if (isLoading) {
        return <ErrorPage Type="Bilgi" Message="Veriler Yükleniyor, Lütfen Bekleyin." />;
    }

    if (isUserValid === false || isUserValid === null) {
        return <ErrorPage Type="Hata" Message="Lütfen giriş yapınız ya da yetkiniz olduğundan emin olunuz." />;
    }

    if (roleId === 1) {
        return <AdminPage />;
    } else {
        return <UserPage />;
    }
}

export default ProfilePage;
