
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Table,
    Stack,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    Modal,
    InputLabel,
    CircularProgress,
    TablePagination
} from '@mui/material';
import { UserListHead } from '../../../sections/@dashboard/user';
import {
    getWinnerQuizPlayerDataRequestData
} from '../action/action';
//
const TABLE_HEAD = [
    { id: 'playerName', label: 'Player Name', alignRight: false },
    { id: 'playerScore', label: 'Player Score', alignRight: false },
    { id: 'playerTime', label: 'Player Time', alignRight: false },
    { id: 'totalTime', label: 'Total Time', alignRight: false },
    { id: 'totalScore', label: 'Total Score', alignRight: false },
    { id: 'isWinner', label: 'Winner', alignRight: false }
];

const WinnerManagementModal = ({ isOpen, onClose, _id }) => {
    //
    const dispatch = useDispatch();
    const [playerData, setPlayerData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(0);
    //
    useEffect(() => {
        setIsLoading(true)
        fetchUserDataForQuiz(currentPage)
    }, [_id])
    //
    const fetchUserDataForQuiz = (pageNoVal) => {
        dispatch(
            getWinnerQuizPlayerDataRequestData({
                reqData: {
                    'id': _id._id,
                    'pageNo': pageNoVal
                },
                onSuccessData: (responseData) => {
                    setIsLoading(false)
                    if (pageNoVal === 1) {
                        setTotalData(responseData?.data.totalCount)
                        setCurrentPage(pageNoVal)
                        setPlayerData(responseData?.data?.player)
                    } else {
                        setCurrentPage(pageNoVal)
                        setPlayerData([...playerData, ...responseData?.data?.player]);
                    }
                },
                onErrorData: (error) => {
                    setIsLoading(false)
                }
            }))
    }
    //
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if (currentPage < (newPage + 1)) {
            setIsLoading(true)
            fetchUserDataForQuiz((newPage + 1));
        }
    };
    //
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    //
    function changePlayTimeFormat(playerTime) {
        if (playerTime === "")
            return playerTime;
        //
        const seconds = playerTime.split(":")
        let minutes = Math.floor(seconds[0] / 60);
        let extraSeconds = seconds[0] % 60;
        minutes = (parseInt(minutes, 10) < 10) ? `0${minutes}` : minutes;
        extraSeconds = (parseInt(extraSeconds, 10) < 10) ? `0${extraSeconds}` : extraSeconds;
        //
        return `${minutes}:${extraSeconds}:${seconds[1]}`;// minutes,":",extraSeconds,":",seconds[1];
    }
    //
    return (
        <Modal open={isOpen} onClose={() => {
            setPlayerData([])
            onClose()
        }}>
            {isLoading ? (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        p: 4,
                        width: 1000,
                        height: '70%'
                    }}
                >
                    <CircularProgress sx={{ marginLeft: '50%', marginTop: '20%', color: 'black' }} />
                </Box>
            ) : (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        p: 4,
                        width: 1000,
                        height: '70%'
                    }}
                >
                    <InputLabel sx={{ fontSize: 15, color: 'black', padding: '2px' }}>{`Quiz Title:    ${_id?.quizTitle}`}</InputLabel>
                    <InputLabel sx={{ fontSize: 15, color: 'black', padding: '2px' }}>{`Quiz Category: ${_id?.category}`}</InputLabel>
                    <InputLabel sx={{ fontSize: 15, color: 'black', padding: '2px' }}>{`Date - Time:\t\t${_id?.dateTime}`}</InputLabel>

                    <TableContainer sx={{ minWidth: 800, maxHeight: '70%', marginTop: '15px', marginBottom: '15px' }}>
                        <Table>
                            <UserListHead
                                headLabel={TABLE_HEAD}
                            />
                            <>
                                <TableBody>
                                    {playerData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id = "", playerName = "", playerScore = "", playerTime = "", totalScore = "", isWinner = false } = row;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={() => { }}>
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Typography variant="subtitle2" sx={{ marginLeft: "5%" }}>
                                                        {playerName}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">{playerScore}</TableCell>
                                                <TableCell align="left">{changePlayTimeFormat(playerTime)}</TableCell>
                                                <TableCell align="left">{_id?.timeInSeconds}</TableCell>
                                                <TableCell align="left">{totalScore}</TableCell>
                                                <TableCell align="left" sx={{ color: (isWinner) ? 'green' : 'red' }}>{(isWinner) ? 'Winner' : 'Not Winner'}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={playerData ? totalData : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Button
                        onClick={() => {
                            setPlayerData([])
                            onClose()
                        }}
                        variant='contained'>
                        Close
                    </Button>
                </Box>
            )}
        </Modal>
    );
};

export default WinnerManagementModal;

