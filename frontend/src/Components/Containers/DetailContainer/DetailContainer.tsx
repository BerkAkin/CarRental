import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'

function DetailContainer() {

    const { id } = useParams();


    return (
        <div>{id}</div>
    )
}

export default DetailContainer