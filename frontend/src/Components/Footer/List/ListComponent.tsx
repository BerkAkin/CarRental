import { Link } from 'react-router-dom';
import ListElement from '../../ListElement/ListElement';
import styles from './styles.module.css'

type linkItemObj = {
    Text: string;
    Href: string;
}

interface ListCompProps {
    Title: string;
    Items: linkItemObj[]
}

const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}


function ListComponent({ Title, Items }: ListCompProps) {
    return (
        <div className="col-12 col-sm-6 col-md-3 mb-3">
            <div className='row flex-column'>
                <div className='col my-2'>
                    <h5 className='fs-6'>{Title}</h5>
                    <hr />
                </div>
                {Items.map((item, index) => (
                    <div className={`col my-2`} key={index} onClick={scrollTop}>
                        <Link className={`${styles.listColorsOverride}`} to={item.Href}>{item.Text}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListComponent;
