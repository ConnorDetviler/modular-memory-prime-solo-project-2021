import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PatchEdit() {

    const history = useHistory();
    const dispatch = useDispatch();

    const userID = useSelector((store) => store.user.id)

    let [patch, setPatch] = useState({
        title: '',
        patch_notes: '',
        patch_image: '',
        user_id: userID
    })

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
                    value={patch.title}
                    onChange={handleChange}
                    name="title"
                />
                <input
                    type="text"
                    placeholder="patch image url"
                    value={patch.patch_image}
                    onChange={handleChange}
                    name="patch_image"
                />
                <textarea
                    placeholder="patch notes"
                    value={patch.patch_notes}
                    onChange={handleChange}
                    name="patch_notes"
                />
                <input
                    type="submit"
                />
            </form>

            {/* <button onClick={
                () => console.log(userID)
            }>console log userID</button> */}
        </div>
    )
}

export default PatchEdit;