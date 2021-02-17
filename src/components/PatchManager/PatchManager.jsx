import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
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
        <div>
            {/* <button onClick = {() => console.log(allPatches)} >test</button> */}
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Date Created</TableCell>
                            <TableCell>Last Edited</TableCell>
                            {/* table cells empty for styling */}
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allPatches.map((row) => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell onClick={()=>clickPatch(row.id)} >{row.title}</TableCell>
                                    <TableCell>n/a</TableCell>
                                    <TableCell>{row.date_created}</TableCell>
                                    <TableCell>n/a</TableCell>
                                    <TableCell onClick={()=>editPatch(row.id)} >EDIT</TableCell>
                                    <TableCell onClick={()=>deletePatch(row.id)}>DELETE</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PatchManager;