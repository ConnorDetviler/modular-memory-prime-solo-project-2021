import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import TagChip from '../TagChip/TagChip';


function PatchEdit() {

    const history = useHistory();
    const dispatch = useDispatch();

    const userID = useSelector((store) => store.user.id)
    const patchDetails = useSelector((store) => store.details)
    const allTags = useSelector((store) => store.allTags)

    let patchLoad = useParams();
    let patchLoadID = Number(patchLoad.patch)

    let [patch, setPatch] = useState({
        title: '',
        patch_notes: '',
        patch_image: '',
        user_id: userID
    })

    let [tags, setTags] = useState([])


    // on page load
    useEffect(() => {
        console.log('params:', patchLoad)
        if (patchLoadID === 0) {
            console.log('creating new patch')
            setPatch({...patch,
                title: '',
                patch_notes: '',
                patch_image: '',
                user_id: userID
            })
            // clears reducer of all patch details
            dispatch({
                type: 'CLEAR_DETAILS'
            })
        } else {
            console.log('editing patch with ID:', patchLoadID)
            dispatch({
                type: 'FETCH_DETAILS',
                payload: patchLoadID
            })
        }

        dispatch({
            type: 'FETCH_ALL_TAGS'
        })
    }, [])

    // when patchDetails changes
    useEffect(() => {
        // setInputs doesn't run until data is recieved from reducer
        function setInputs() {
            if (patchLoadID !== 0) {
                setPatch({...patch,
                    title: patchDetails.title,
                    patch_notes: patchDetails.patch_notes,
                    patch_image: patchDetails.patch_image,
                    user_id: userID
                })
            } else {
                // makes sure all inputs are cleared when patch-edit view is empty (creation of new patch)
                setPatch({
                    title: '',
                    patch_notes: '',
                    patch_image: '',
                    user_id: userID
                })
            }
        }
        // checking if data has been recieved from reducer
        if (patchDetails.title !== undefined) {
            setInputs()
        }

    }, [patchDetails])

    // when allTags changes
    useEffect(() => {
        // setTagList doesn't run until data is recieved from both reducers
        function setTagList() {
            // loop through allTagsSelected and add property, selected: {bool} to each object
            // set it to true if tag ID exists within patchDetails.tags
            const allTagsSelected = allTags;
            const tagIdArray = [];

            // creates array of tag IDs that are associated with selected patch
            for (let i = 0; i < patchDetails.tags.length; i++) {
                const tag = patchDetails.tags[i];
                tagIdArray.push(tag.id)
            }

            // compare all tags with those that exist in patch to determine which are selected
            for (let i = 0; i < allTagsSelected.length; i++) {
                // default value is false
                allTagsSelected[i].selected = false;

                for (let j = 0; j < tagIdArray.length; j++) {
                    // if the tag ID is found among those that are associated with the selected patch,
                    // then the selected property is set to true
                    if (allTagsSelected[i].id === tagIdArray[j]) {

                        allTagsSelected[i].selected = true;
                    }
                }
            }
            // tags are stored in local state with newly added 'selected' property
            setTags([...allTagsSelected])
        }

        if (allTags[0] !== undefined && patchDetails.title !== undefined) {
            setTagList()
        }
    }, [allTags])

    const handleChange = (event) => {
        const value = event.target.value;
        setPatch({...patch, [event.target.name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(patchLoadID === 0) {
            dispatch({ type: "CREATE_PATCH", payload: patch })
            // TODO: replace patchLoadID with correct new id
            history.push(`/patch-view/${patchLoadID}`)
        } else {
            dispatch({ type: "EDIT_PATCH", payload: {...patch, patch_id: patchLoadID}})
            history.push(`/patch-view/${patchLoadID}`)
        }
        setPatch({
            title: '',
            patch_notes: '',
            patch_image: '',
            user_id: userID
        })
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

            {tags?.map(tag => {
                        return (
                            <TagChip
                                key={tag.id}
                                tag={tag}
                                selectable={true}
                                selected={tag.selected}
                            />
                        )
                    })}

            <img src={patch.patch_image} />

            <button onClick={
                () => console.log(tags)
            }>console log</button>
        </div>
    )
}

export default PatchEdit;