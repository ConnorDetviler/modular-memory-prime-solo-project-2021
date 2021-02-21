import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TagChip from '../TagChip/TagChip';
import { makeStyles } from '@material-ui/core/styles';
import { palette } from '@material-ui/system';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box
} from '@material-ui/core'


function PatchManager() {

    const dispatch = useDispatch();
    const history = useHistory();

    const userID = useSelector((store) => store.user.id)
    const allPatches = useSelector((store) => store.allPatches)


    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_PATCHES',
        });
    }, []);


    const clickPatch = (id) => {
        console.log(id)
        history.push(`/patch-view/${id}`)
    }

    const editPatch = (id) => {
        console.log(id)
        history.push(`/patch-edit/${id}`)
    }

    const deletePatch = (id) => {
        console.log(id)
        dispatch({
            type: 'DELETE_PATCH',
            payload: {id, userID}
        });
        dispatch({
            type: 'FETCH_ALL_PATCHES'
        });
    }



    return (
        <Box>
            {/* <button onClick = {() => console.log(allPatches)} >test</button> */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Date Created</TableCell>
                            {/* <TableCell>Last Edited</TableCell> */}
                            {/* table cells empty for styling */}
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allPatches?.map((row) => {

                            let date = row.date_created.slice(0, 10);

                            return (
                                <TableRow key={row.id}>
                                    <TableCell onClick={()=>clickPatch(row.id)} >{row.title}</TableCell>
                                    <TableCell>
                                        {row.tags?.map((tag) => {
                                            return (
                                                <TagChip
                                                    tag = {tag}
                                                    key = {tag.id}
                                                    selected = {true}
                                                />
                                            )
                                        })}
                                    </TableCell>
                                    <TableCell>{date}</TableCell>
                                    {/* <TableCell>n/a</TableCell> */}
                                    <TableCell onClick={()=>editPatch(row.id)} >EDIT</TableCell>
                                    <TableCell onClick={()=>deletePatch(row.id)}>DELETE</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PatchManager;