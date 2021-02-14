import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';


function PatchEdit() {

    const history = useHistory();
    const dispatch = useDispatch();

    const userID = useSelector((store) => store.user.id)
    const patchDetails = useSelector((store) => store.details)
    let patchLoad = useParams();

    let [patch, setPatch] = useState({
        title: '',
        patch_notes: '',
        patch_image: '',
        user_id: userID
    })

    useEffect(() => {
        console.log('params:', patchLoad)
        let patchLoadID = Number(patchLoad.patch)
        if (patchLoadID === 0) {
            console.log('creating new patch')
            return
        } else {
            console.log('editing patch with ID:', patchLoadID)
            dispatch({
                type: 'FETCH_DETAILS',
                payload: patchLoadID
            })
        }
    }, [])

    useEffect(() => {
        // setInputs isn't run until data is recieved from reducer
        function setInputs() {
            setPatch({...patch,
                title: patchDetails.title,
                patch_notes: patchDetails.patch_notes,
                patch_image: patchDetails.patch_image,
                user_id: userID
            })
        }
        // checking if data has been recieved from reducer
        if (patchDetails.title !== undefined) {
            setInputs()
        }

    }, [patchDetails])

    const handleChange = (event) => {
        const value = event.target.value;
        setPatch({...patch, [event.target.name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: "EDIT_PATCH", payload: patch })
        setPatch({
            title: '',
            patch_notes: '',
            patch_image: '',
            user_id: userID
        })
        history.push('/patch-view')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="title"
                    value={patch?.title}
                    onChange={handleChange}
                    name="title"
                />
                <input
                    type="text"
                    placeholder="patch image url"
                    value={patch?.patch_image}
                    onChange={handleChange}
                    name="patch_image"
                />
                <textarea
                    placeholder="patch notes"
                    value={patch?.patch_notes}
                    onChange={handleChange}
                    name="patch_notes"
                />
                <input
                    type="submit"
                />
            </form>

            <button onClick={
                () => console.log(patchDetails)
            }>console log</button>
        </div>
    )
}

export default PatchEdit;