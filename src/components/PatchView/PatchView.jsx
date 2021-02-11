import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './PatchView.css';

import {
    Box,
    Container,
    List,
    ListItem,
    ListItemText,
    makeStyles
        } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function PatchView() {

    const classes = useStyles();

    // const id = 1 // placeholder - this is the patch's id
    const dispatch = useDispatch();

    const userID = useSelector((store) => store.user.id)
    const patchDetails = useSelector((store) => store.details)
    const patchNames = useSelector((store) => store.names)

    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: 1
        });

        dispatch({
            type: 'FETCH_PATCH_NAMES',
            payload: userID
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
                <h1>{patchDetails.title}</h1>
                <img src={patchDetails.patch_image} />
                <p>{patchDetails.patch_notes}</p>
            </Container>
        </div>
    )
}

export default PatchView;