import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function PatchEdit() {

    const history = useHistory();
    const dispatch = useDispatch();

    let [patch, setPatch] = useState({
        title: '',
        patch_notes: '',
        patch_image: '',
        user_id: 2
        // TODO: user_id should grab the id of the current user
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
            user_id: 2
            // TODO: user_id should grab the id of the current user
        })
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

            <button onClick={
                () => console.log(patch)
            }>console log patch</button>
        </div>
    )
}

export default PatchEdit;