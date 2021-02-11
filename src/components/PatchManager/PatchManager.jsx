import { useSelector, useDispatch } from 'react-redux';
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

    const userID = useSelector((store) => store.user.id)
    const allPatches = useSelector((store) => store.allPatches)


    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_PATCHES',
            payload: userID
        });
    }, []);



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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allPatches.map((row) => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>n/a</TableCell>
                                    <TableCell>{row.date_created}</TableCell>
                                    <TableCell>n/a</TableCell>
                                    <TableCell>EDIT</TableCell>
                                    <TableCell>DELETE</TableCell>
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