import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import TagChip from '../TagChip/TagChip';

import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Container,
    TextField,
    Button,
    Paper
    } from '@material-ui/core'


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
        user_id: userID,
        tags: []
    })

    let [tags, setTags] = useState([])

    let [newTag, setNewTag] = useState('')


    // on page load
    useEffect(() => {
        console.log('params:', patchLoad)
        if (patchLoadID === 0) {
            console.log('creating new patch')
            setPatch({...patch,
                title: '',
                patch_notes: '',
                patch_image: '',
                user_id: userID,
                tags: []
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
                    user_id: userID,
                    tags: patchDetails.tags
                })
            } else {
                // makes sure all inputs are cleared when patch-edit view is empty (creation of new patch)
                setPatch({
                    title: '',
                    patch_notes: '',
                    patch_image: '',
                    user_id: userID,
                    tags: []
                })
            }
        }
        // checking if data has been recieved from reducer
        if (patchDetails.title !== undefined) {
            setInputs()
        }

    }, [patchDetails])


    // when allTags and patchDetails changes
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

        // if creating a new patch, patchDetails will be undefined
        // The second condition will run if editing an existing patch
        if (allTags[0] !== undefined && patchDetails.title === undefined){
            setTags(allTags);
        } else if (allTags[0] !== undefined && patchDetails.title !== undefined) {
            setTagList()
        }
    }, [allTags, patchDetails])


    const handleChange = (event) => {
        const value = event.target.value;
        setPatch({...patch, [event.target.name]: value})
    }
    
    const handleChangeTag = (event) => {
        const value = event.target.value;
        setNewTag(value)
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
            user_id: userID,
            tags: []
        })
    }

    const createTag = (event) => {
        event.preventDefault();

        dispatch({
            type: "CREATE_TAG",
            payload: newTag
        })

        setNewTag('')

        dispatch({
            type: 'FETCH_ALL_TAGS'
        })
    }


    const tagClick = (tagID) => {

        // following logic copies local state into 'shallow state' that can be worked with
        // 'selected' attribute is toggled in shallow state
        let shallowTagList = [...tags];
        let shallowTag;

        for (let i = 0; i < shallowTagList.length; i++) {
            // finds the tag that was clicked on
            if (shallowTagList[i].id === tagID) {
                shallowTag = shallowTagList[i]
                // flips the selected state on click
                shallowTag.selected = !shallowTag.selected
                shallowTagList[i] = shallowTag
                // local state is replaced with shallow state
                setTags(shallowTagList);
                setPatch({...patch, tags: shallowTagList})
            }
        }
    }



    const useStyles = makeStyles((theme) => ({
        FieldStyle: {
            margin: theme.spacing(1),
            width: '40ch'
        },
        TextAreaStyle: {
            margin: theme.spacing(1),
            width: '80ch'
        },
        SaveButtonStyle: {
            margin: theme.spacing(1),
            marginTop: theme.spacing(2)
        },
        TagButtonStyle: {
            margin: theme.spacing(1),
            marginTop: theme.spacing(3)
        },
        alignItemsAndJustifyContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }))

    const classes = useStyles();

    return (
        <Box
            p={15}
            className={classes.alignItemsAndJustifyContent}
        >
            <Paper elevation={5}>
                <Box p={3}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            className={classes.FieldStyle}
                            type="text"
                            label="title"
                            value={patch?.title}
                            onChange={handleChange}
                            name="title"
                        />
                        <TextField
                            className={classes.FieldStyle}
                            type="text"
                            label="patch image url"
                            value={patch?.patch_image}
                            onChange={handleChange}
                            name="patch_image"

                        />
                        <Button
                            className={classes.SaveButtonStyle}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Save Patch
                        </Button>
                        <br/>
                        <TextField
                            className={classes.TextAreaStyle}
                            label="patch notes"
                            multiline
                            rows={8}
                            value={patch?.patch_notes}
                            onChange={handleChange}
                            name="patch_notes"
                            variant="outlined"

                        />
                    </form>
                    {/* <Button
                    onClick={() => setPatch({title: 'BladeGrandma 2077'})}
                    ></Button>
                    <Button
                    onClick={() => setPatch({patch_image: 'https://i.imgur.com/Gj5fDob.jpg'})}
                    ></Button>
                    <Button
                    onClick={() => setPatch({patch_notes: 'adjust mod wheel for extra warble'})}
                    ></Button> */}

                    <br/>

                    <div>
                        {tags?.map(tag => {
                                    return (
                                        <TagChip
                                            key={tag.id}
                                            tag={tag}
                                            selectable={true}
                                            selected={tag.selected}
                                            onClick={() => tagClick(tag.id)}
                                        />
                                    )
                                })}
                    </div>

                    <form onSubmit={createTag}>
                        <TextField
                            className={classes.FieldStyle}
                            type="text"
                            label="new tag"
                            name="name"
                            value={newTag}
                            onChange={handleChangeTag}
                        />

                        <Button
                            type="submit"
                            value="Create Tag"
                            color="secondary"
                            variant="contained"
                            size="small"
                            className={classes.TagButtonStyle}
                        >
                            Create Tag
                        </Button>

                    </form>

                    <br/>


                    <br/>

                    <img src={patch.patch_image} />

                    {/* <button onClick={
                        () => console.log(patch)
                    }>console log patch</button>

                    <button onClick={
                        () => console.log(tags)
                    }>console log tags</button> */}
                    
                </Box>
                
            </Paper>
        </Box>
    )
}

export default PatchEdit;