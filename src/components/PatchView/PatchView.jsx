import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './PatchView.css';

function PatchView() {

    // const id = 1 // placeholder - this is the patch's id
    const dispatch = useDispatch();


    const patchDetails = useSelector((store) => store.details)
    const patchNames = useSelector((store) => store.names)

    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: 1
        });

        dispatch({
            type: 'FETCH_PATCH_NAMES'
        });
    }, []);

    const patchClick = (id) => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        });
    }

    return (
        <div>
            <div>
                <ul>
                    {patchNames.map(patch => {
                        return (
                            <li
                                key={patch.id}
                                onClick={() => patchClick(patch.id)}
                            >
                                {patch.title}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <h1>{patchDetails.title}</h1>
            <img src={patchDetails.patch_image} />
            <p>{patchDetails.patch_notes}</p>
        </div>
    )
}

export default PatchView;