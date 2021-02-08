import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function PatchView() {

    const id = 1 // placeholder - this is the patch's id

    const dispatch = useDispatch();

    const patchDetails = useSelector((store) => store.details)

    const viewDetails = () => {
        console.log(patchDetails);
    }

    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        });
    }, []);

    return (
        <div>
            <h1>{patchDetails.title}</h1>
            <img src={patchDetails.patch_image} />
            <p>{patchDetails.patch_notes}</p>
        </div>
    )
}

export default PatchView;