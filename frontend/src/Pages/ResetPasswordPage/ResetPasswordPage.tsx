import styles from "./styles.module.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from "react";
import logo from '../../assets/logos/logo-flexper.png';
import Image from "../../Components/Image/Image";
import apiService from "../../api/apiService";
import { endpoints } from "../../api/apiConfig";
import { StatusHandler } from "../../common/StatusHandler";
import { useToastManagerContext } from "../../Contexts/ToastManagerContext";

interface IResetPasswordForm {

    newPassword: string,
    newPasswordConfirm: string
}

function ResetPasswordPage() {

    const { showToast } = useToastManagerContext();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');


    const handleSubmit = async (values: IResetPasswordForm) => {

        const { newPassword, newPasswordConfirm } = values;

        if (newPassword !== newPasswordConfirm) {
            StatusHandler(400, "Girilen parolalar aynı değil", showToast);
            return
        }
        try {
            const { status, data } = await apiService(endpoints.resetPassword, "POST", values);
            console.log(status, data)
            StatusHandler(200, data, showToast);
            setTimeout(() => {
                navigate("/")
            }, 3000);
        } catch (error: any) {
            const { status, message } = error;
            StatusHandler(status, message, showToast);
        }
    }

    const initialValues = {
        email: email || "",
        token: token || "",
        newPassword: "",
        newPasswordConfirm: ""
    }

    return (
        <div className='container mt-5'>

            <div className='row text-center d-flex justify-content-center'>
                <div className="row">
                    <div className="col pt-1">
                        <Image URL={logo} Width='200px'></Image>
                    </div>
                </div>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <div className='row d-flex justify-content-center mt-4'>
                        <div className='col-5'>Yeni Parola<span className={styles.error}> *</span>
                            <span><ErrorMessage name="newPassword" component="span" className={`${styles.error}`} /></span>
                            <Field className={`${styles.inputs}`} name="newPassword" id="newPassword" />
                        </div>
                    </div>

                    <div className='row d-flex justify-content-center mt-4'>
                        <div className='col-5'>Yeni Parolayı Onayla<span className={styles.error}> *</span>
                            <span><ErrorMessage name="newPasswordConfirm" component="span" className={`${styles.error}`} /></span>
                            <Field className={`${styles.inputs}`} name="newPasswordConfirm" id="newPasswordConfirm" />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mt-4'>
                        <div className='col-5'>
                            <button type="submit" className={`p-1 ${styles.btn}`}> Parolayı Sıfırla </button>
                        </div>
                    </div>
                </Form>

            </Formik>
        </div>
    )
}

export default ResetPasswordPage