import React from 'react';
import ListElement from '../../ListElement/ListElement';

type linkItemObj = {
    Text: string;
    Href: string;
}

interface ListCompProps {
    Title: string;
    Items: linkItemObj[]
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
                    <div className='col my-2' key={index}>
                        <ListElement text={item.Text} fs="0.9em" href={item.Href} color="#7A7A7A" isHover={true} hoverColor='#E00000' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListComponent;
