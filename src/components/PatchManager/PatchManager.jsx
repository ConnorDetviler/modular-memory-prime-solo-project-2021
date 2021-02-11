import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


function PatchManager() {

    const dispatch = useDispatch();

    const userID = useSelector((store) => store.user.id)


    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_PATCHES',
            payload: userID
        });
    }, []);
    return (
        <p>you got to the patch manager</p>
    )
}

export default PatchManager;