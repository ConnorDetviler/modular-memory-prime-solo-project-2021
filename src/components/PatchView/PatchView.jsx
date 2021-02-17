import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './PatchView.css';

import TagChip from '../TagChip/TagChip'

import {
    Box,
    Container,
    List,
    ListItem,
    ListItemText,
    Chip,
    makeStyles
        } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const tagStyle = {
    backgroundColor: '#888392',
    border: '1px solid'
};

function PatchView() {

    const classes = useStyles();

    // const id = 1 // placeholder - this is the patch's id
    const dispatch = useDispatch();

    // TODO: get rid of userID
    const userID = useSelector((store) => store.user.id)
    const patchDetails = useSelector((store) => store.details)
    const patchNames = useSelector((store) => store.names)

    let patchLoad = useParams();
    let patchLoadID = Number(patchLoad.patch)
    const history = useHistory();

    useEffect(() => {
        console.log('params:', patchLoad);
        dispatch({
            type: 'FETCH_DETAILS',
            payload: patchLoadID
        });

        dispatch({
            type: 'FETCH_PATCH_NAMES',
            // TODO: get rid of userID
            payload: userID
        });
    }, []);

    const patchClick = (id) => {
        // switched to history.push, keeping the original commented out for now
        // dispatch({
        //     type: 'FETCH_DETAILS',
        //     payload: id
        // })
        history.push(`/patch-view/${id}`)
    }

    return (
        <div>
            <Container>
                <div>
                    <List>
                        {patchNames.map(patch => {
                            return (
                                <ListItem
                                    key={patch.id}
                                    onClick={() => patchClick(patch.id)}
                                >
                                    {patch.title}
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
                {patchLoadID !== 0
                ?   <>
                    <h1>{patchDetails.title}</h1>
                    <img src={patchDetails.patch_image} />
                    <p>{patchDetails.patch_notes}</p>
                    <div>
                    {patchDetails?.tags?.map(tag => {
                        return (
                            // <Chip
                            //     label={tag.name}
                            //     // style={tagStyle.backgroundColor = `#937287`}
                            //     style={{backgroundColor: `#${tag.color}`}}
                            //     // color="primary"
                            // />
                            <TagChip
                                tag={tag}
                                selectable={false}
                            />
                        )
                    })}
                    {/* <button onClick={() => console.log(patchDetails)}>test</button> */}
                    </div>
                    </>
                : <p>Welcome :)</p>
                }

            </Container>
        </div>
    )
}

export default PatchView;