import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './styles.module.css';
import validationSchema from './ValidationSchema';
import Image from '../../Components/Image/Image';
import img from '../../assets/logos/logo-flexper.png';
import ListElement from '../../Components/ListElement/ListElement';


interface FormProps {
    name: string;
    surname: string;
    email: string;
    phone: string;
    platform: string;
    permission: string;
    otherPlatform: string;
}

const initialValues: FormProps = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    platform: '',
    permission: '',
    otherPlatform: ''
}

const onSubmit = async (values: FormProps, { setSubmitting }: any) => {
    try {
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        }, 2000);
    } catch (error) {
        console.error(error);
    }
    finally {
        setSubmitting(false);
    }
};


function ContactPage() {
    const [isOther, setIsOther] = useState(false);

    const handleOtherField = (e: any) => {
        if (e.target.value == "") {
            setIsOther(true);
            return
        }
        setIsOther(false)
    }

    return (

        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className='container mt-4'>
                            <div className='row'>
                                <div className={`${styles.headerColoring} col-3  d-flex flex-column justify-content-center`}>
                                    <div className='row'>
                                        <div className='text-center'>
                                            <Image Width='250' URL={img} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='text-center mt-4'>
                                            <h1>"Süper Abonelik Sistemi" Bilgi Talep ve İletişim Formu</h1>
                                        </div>
                                    </div>
                                    <div className='row text-center mt-5'>
                                        <div>
                                            <p>
                                                Mevcut araçlarımızı kontrol etmek ve detaylı bilgi almak için yandaki soruları yanıtlayın. <br />Biz size ulaşalım!
                                            </p>
                                            <p>
                                                WhatsApp ve İletişim Hattı:  emptyPhoneNumber
                                            </p>
                                            <p>
                                                E-Posta Adresi: empty
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-9 border-start d-flex flex-column justify-content-center  ${styles.bodyColoring}`}>
                                    <div className='container '>
                                        <div className='row'>
                                            <p>* Zorunlu Alanlar</p>
                                        </div>
                                        <div className='row'>
                                            <div className='col-6'><label htmlFor="name">1. İsim <span className={styles.error}>*</span><span className=''> <ErrorMessage name="name" component="span" className={`${styles.error}`} /></span></label></div>
                                            <div className='col-6'><label htmlFor="surname">2. Soyisim <span className={styles.error}>*</span><span className=''> <ErrorMessage name="surname" component="span" className={`${styles.error}`} /></span></label></div>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-6 d-flex flex-column'><Field className={styles.inputAreas} type="text" id="name" name="name" /></div>
                                            <div className='col-6 d-flex flex-column'><Field className={styles.inputAreas} type="text" id="surname" name="surname" /></div>
                                        </div>
                                        <div className='row mt-4'>
                                            <div className='col-6 '><label htmlFor="email">3. E-Posta <span className={styles.error}>*</span><span className=''>  <ErrorMessage name="email" component="span" className={`${styles.error}`} /></span></label></div>
                                            <div className='col-6 '><label htmlFor="phone">4. Telefon Numarası <span className={styles.error}>*</span><span className=''>  <ErrorMessage name="phone" component="span" className={`${styles.error}`} /></span></label></div>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-6 d-flex flex-column'><Field className={styles.inputAreas} type="email" id="email" name="email" /></div>
                                            <div className='col-6 d-flex flex-column'><Field className={styles.inputAreas} type="tel" id="phone" name="phone" /></div>
                                        </div>
                                        <div className='row mt-4'>
                                            <label>5. Bizi Hangi Platformda Duydunuz <span className={styles.error}>*</span><span className=''> <ErrorMessage name="platform" component="span" className={`${styles.error}`} /></span></label>
                                        </div>
                                        <div className='mt-2'>
                                            <div className='row '><label><Field type="radio" onClick={handleOtherField} value="instagram" name="platform" /> Instagram</label></div>
                                            <div className='row '><label><Field type="radio" onClick={handleOtherField} value="facebook" name="platform" /> Facebook</label></div>
                                            <div className='row '><label><Field type="radio" onClick={handleOtherField} value="linkedin" name="platform" /> LinkedIn</label></div>
                                            <div className='row '><label><Field type="radio" onClick={handleOtherField} value="vodafoneSMS" name="platform" /> Vodafone SMS</label></div>
                                            <div className={`${styles.otherDiv} row `}>
                                                <div>
                                                    <label><Field type="radio" onClick={handleOtherField} value="" name="platform" /> Diğer</label>
                                                </div>
                                                <div>
                                                    {isOther && (<Field className={`${styles.otherInputArea}`} type="text" name="platform" placeholder="Lütfen Belirtin" />)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`row ${styles.permissionTextSize} mt-4`} >
                                            <div className={`${styles.permissionTextColor} row`}>
                                                <p>
                                                    6. Gembox Teknoloji Girişimleri Anonim Şirketi Kişisel Verilerin Flexper Süper Abonelik Sistemi Kapsamında İşlenmesine İlişkin Aydınlatma Metni’ne ulaşmak için:<ListElement color='gray' fs='1 em' href='PPInfo' text='Flexper Aydınlatma Metni' />
                                                </p>
                                            </div>
                                            <div className={`${styles.permissionTextColor} row`}>
                                                <p>
                                                    Tarafıma sunulan Aydınlatma Metni doğrultusunda, kimlik bilgilerimin (ad-soyadı), iletişim bilgilerimin (e-posta adresi ve cep telefonu numarası), araç bilgilerimin (ilgilendiğim araç modeli), abonelik paketi bilgilerimin (kaç aylık kiralama paketi ile ilgilendiğim), Flexper "Süper Abonelik Sistemi" Bilgi Talep ve İletişim Formunda yer alan sorulara ilişkin yanıtlarım, finansal bilgilerim (findeks raporu, vergi levhası, faaliyet belgesi vb. ödeme kabiliyetimi/finansal yeterliliğimi gösteren belgeler) ve işlem güvenliği bilgilerimin (log kayıtları) belirtilen süreçlerin icrası kapsamında kiralama talebi başvurularını almak, taleplerin değerlendirilmesi, iletişim faaliyetlerinin e-posta hizmeti ile yürütülmesi ve saklama faaliyetlerinin yürütülmesi amaçlarıyla bu alanlarda faaliyet gösteren ve sunucuları yurt dışında bulunan bulut tabanlı hizmet sağlayıcı Google LLC ve Microsoft Ireland Operations Limited’e, Gembox ile Whatsapp platformu üzerinden iletişime geçmem halinde bu platform üzerinden paylaşmış olduğum kişisel verilerimin Meta, Inc.’e aktarılmasına ve bu firmalar bünyesinde saklanmasına
                                                    <span className={styles.error}> *</span>
                                                </p>
                                            </div>
                                            <div className='row'>
                                                <label htmlFor="permyes"><Field type="radio" id="permyes" value="evet" name="permission" /> Evet</label>
                                            </div>
                                            <div className='row mt-1'>
                                                <label htmlFor='permno'> <Field type="radio" id="permno" value="hayır" name="permission" /> Hayır</label>
                                            </div>
                                            <ErrorMessage name="permission" component="div" className="error" />
                                        </div>
                                        <div className='container mt-4'>
                                            <div className='row'> <button className={`${styles.btn}`} type="submit" disabled={isSubmitting}>Gönder</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>

    )
}

export default ContactPage