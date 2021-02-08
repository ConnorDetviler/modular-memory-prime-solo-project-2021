import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function PatchView() {

    const id = 1 // placeholder - this is the patch's id

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        });
    }, []);

    return (
        <p>you made it to patchview</p>
    )
}

export default PatchView;