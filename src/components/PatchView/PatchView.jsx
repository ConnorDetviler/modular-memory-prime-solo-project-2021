import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './PatchView.css';

import TagChip from '../TagChip/TagChip'

import {
    Box,
    Button,
    Container,
    List,
    ListItem,
    ListItemText,
    Chip,
    Drawer,
    CssBaseline,
    makeStyles,
    Typography,
    Paper
        } from '@material-ui/core';

const drawerWidth = 1000;

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        // maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    editButton: {
        margin: theme.spacing(1),

    },
    ListItemStyle: {
        padding: theme.spacing(1.5)
    }
}));


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
        <div className={classes.root}>
            <Container>
                <div>
                    <Drawer
                        variant="permanent"
                        anchor="left"
                        style={{position:'fixed', zIndex: 1}}
                    >
                        <List
                            position="static"
                            style={{paddingTop: '120px'}}
                        >
                            {patchNames.map(patch => {
                                return (
                                    <ListItem
                                        className={classes.ListItemStyle}
                                        button
                                        key={patch.id}
                                        onClick={() => patchClick(patch.id)}
                                    >
                                        <ListItemText primary={patch.title} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Drawer>
                </div>
                {patchLoadID !== 0
                ?   <Box
                        pt={15}
                        pl={15}
                    >
                        <Paper>
                            <Box
                                p={2}
                            >
                                <h1>{patchDetails.title}</h1>
                                <img src={patchDetails.patch_image} />
                                <Typography multiline variant="body1" display="inline" >{patchDetails.patch_notes}</Typography>
                                <div>
                                {patchDetails?.tags?.map(tag => {
                                    return (
                                        <TagChip
                                            key={tag.id}
                                            tag={tag}
                                            selectable={false}
                                            selected={true}
                                        />
                                    )
                                })}
                                {/* <button onClick={() => console.log(patchDetails)}>test</button> */}
                                </div>
                                <Button
                                onClick={() => history.push(`/patch-edit/${patchLoadID}`)}
                                variant="contained"
                                color="primary"
                                className={classes.editButton}
                                >Edit
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                :
                <Box
                    p={15}
                    pt={30}
                    textAlign="center"
                >
                    <Typography
                        variant="h3"
                    >Welcome to Modular Memory
                    </Typography>
                </Box>
                }

            </Container>
        </div>
    )
}

export default PatchView;