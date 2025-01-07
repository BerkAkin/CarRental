import React from 'react'
import { useParams } from 'react-router-dom'



function BlogDetailPage() {

    const { id } = useParams();
    return (
        <>
            <div className='container mt-4 pt-3'>
                <div className='row'>
                    {id}
                </div>
            </div>
        </>
    )
}

export default BlogDetailPage