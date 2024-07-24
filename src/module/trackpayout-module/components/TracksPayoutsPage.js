import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    CircularProgress
} from '@mui/material';
// components
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { PayoutListToolbar } from '../../../sections/@dashboard/trackpayouts';
// import Label from '../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead } from '../../../sections/@dashboard/user';
import {
    fetchTrackPayoutData,
    fetchTrackPayoutByTemplateData,
    fetchAllTemplateData
} from "../action/action";
import TrackPayoutLeaderBoard from './TrackPayoutLeaderBoard';
//
const TABLE_HEAD = [
    { id: 'username', label: 'User Name', alignRight: false },
    { id: 'dateTime', label: 'Date / Time', alignRight: false },
    { id: 'caseprice', label: 'Cash Prize', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false },
];
//
function descendingComparator(a, b, orderBy) {
    const dateA = new Date(a.dateTime)
    const dateB = new Date(b.dateTime)
    if (dateB < dateA) {
        return -1;
    }
    if (dateB > dateA) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    if (!Array.isArray(array)) {
        return [];
    }
    const filteredArray = array.filter((quesstionData) =>
        quesstionData.dateTime && quesstionData.dateTime.toLowerCase().includes(query.toLowerCase())
    );
    //
    return filteredArray.sort(comparator);

}
export default function TracksPayoutsPage() {
    //
    const dispatch = useDispatch();
    //
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState([]);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('dateTime');
    const [filterName, setFilterName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [quizTemplate, setQuizTemplate] = useState('');
    const [trackPayoutList, setTrackPayoutList] = useState([]);
    const [templateData, setTemplateData] = useState([]);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [isSortDone, setIsSortDone] = useState(false);
    const [totalData, setTotalData] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [sortField, setSortField] = useState('dateTime');
    const [sortOrder, setSortOrder] = useState('desc');
    const [templateId, setTemplateId] = useState('');
    //
    const getTrackPayoutInfo = (pageNoVal, orderVal = 'desc', orderField = 'createdAt') => {
        dispatch(
            fetchTrackPayoutData({
                reqData: {
                    pageNo: pageNoVal,
                    name: orderField,
                    order: orderVal
                },
                onSuccessData: (responseData) => {
                    // setTrackPayoutList(applySortFilter(responseData, getComparator(order, orderBy), filterName))
                    setIsLoading(false)
                    if (pageNoVal === 1) {
                        setTotalData(responseData.totalCount)
                        setCurrentPage(pageNoVal)
                        setTrackPayoutList(responseData.data);
                    } else {
                        setCurrentPage(pageNoVal)
                        setTrackPayoutList([...trackPayoutList, ...responseData.data]);
                    }
                },
                onErrorData: (onError) => {
                    setIsLoading(false)
                }
            }))
    }
    //
    const fetchTemplatePayoutData = (pageNoVal, orderVal = 'desc', orderField = 'createdAt', templateIds = "") => {
        dispatch(
            fetchTrackPayoutByTemplateData({
                reqData: {
                    'id': (templateIds === '') ? templateId : templateIds,
                    'pageNo': pageNoVal,
                    'name': orderField,
                    'order': orderVal
                },
                onSuccessData: (responseData) => {
                    //
                    setIsLoading(false)
                    //
                    setSortOrder(orderVal)
                    setSortField(orderField)
                    //
                    if (pageNoVal === 1) {
                        setTotalData(responseData.totalCount)
                        setCurrentPage(pageNoVal)
                        setTrackPayoutList(responseData.data);
                    } else {
                        setCurrentPage(pageNoVal)
                        setTrackPayoutList([...trackPayoutList, ...responseData.data]);
                    }
                },
                onErrorData: (error) => {
                    setIsLoading(false)
                }
            })
        )
    }
    //
    const getAllTeplateDataInfo = () => {
        const testData = {
            "_id": "-1",
            "title": "Select All",
            "category": "",
            "description": "",
            "image": "",
            "userLimit": "",
            "price": "",
            "points": 0,
            "jackpotPercentage": "",
            "noOfQuestions": "",
            "timeInSeconds": "",
            "isDeleted": false,
            "createdAt": "",
            "updatedAt": "",
            "__v": 0
        }
        dispatch(fetchAllTemplateData({
            reqData: {},
            onSuccessData: (responseData) => {
                setTemplateData([testData].concat(responseData))
            },
            onErrorData: (onError) => {

            }
        }))
    }
    //

    //
    useEffect(() => {
        // if (trackPayoutList.length === 0) {

        // } else {
        //     setTrackPayoutList(applySortFilter(trackPayoutList, getComparator(order, orderBy), filterName))
        // }
        setIsLoading(true)
        // getTrackPayoutInfo(currentPage)
        getTrackPayoutInfo(currentPage, sortOrder, sortField)
        getAllTeplateDataInfo()
    }, [])// isSortDone
    //
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trackPayoutList.length) : 0;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if (currentPage < (newPage + 1)) {
            // setIsLoading(true)
            // getTrackPayoutInfo((newPage + 1));
            setIsLoading(true)
            if (templateId === '') {
                getTrackPayoutInfo((newPage + 1), sortOrder, sortField);
            } else {
                fetchTemplatePayoutData((newPage + 1), sortOrder, sortField)
            }
        }
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    //
    const handleRequestSort = (event, property) => {
        // if (property === 'username') {
        //     setPage(0);
        //     if (templateId === '') {
        //         //getTrackPayoutInfo(1, (orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc', 'quizTitle')
        //     } else {
        //         // fetchTemplateWinnerData(1, (orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc', 'quizTitle')
        //     }
        // }
        if (property === 'dateTime') {
            setPage(0);
            if (templateId === '') {
                getTrackPayoutInfo(1, (orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc', 'dateTime')
            } else {
                fetchTemplatePayoutData(1, (orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc', 'dateTime')
            }
        }
        //
        setOrder((orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc');
        setOrderBy(property);
        //
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = trackPayoutList.map((n) => n.question);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    return (
        <>
            <Helmet>
                <title> Tracks Payouts | SpeedQuiz </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Tracks Payouts
                    </Typography>
                </Stack>
                <Card>
                    <PayoutListToolbar
                        quizTemplate={'test'}
                        templateData={templateData}
                        onChange={(value) => {
                            if (value === "-1") {
                                setPage(0)
                                setIsSortDone(!isSortDone)
                                setTemplateId('')
                                getTrackPayoutInfo(1, sortOrder, sortField)
                            } else {
                                setPage(0)
                                setTemplateId(value)
                                fetchTemplatePayoutData(1, sortOrder, sortField, value)
                            }
                        }} />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={trackPayoutList.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                {


                                    (true) ?
                                        <DialogTitle style={{ alignSelf: '50%' }}>
                                            {"No record found"}
                                        </DialogTitle>
                                        :
                                        <TableBody>
                                            {trackPayoutList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                const { _id, winnerDetails, dateTime, jackpotPrice, price } = row;
                                                const selectedUser = selected.indexOf(dateTime) !== -1;
                                                const totalWinPrice = parseInt(price, 10) + parseInt(jackpotPrice, 10)
                                                return (
                                                    <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                        <TableCell component="th" scope="row" padding="none">
                                                            <Stack direction="row" alignItems="center" spacing={4}>
                                                                <div className="avtar" style={{ margin: '5%' }}>
                                                                    <Avatar alt={winnerDetails[0]?.name} src={winnerDetails[0]?.profileImage} />
                                                                </div>
                                                                <Typography variant="subtitle2" noWrap>
                                                                    {winnerDetails[0]?.name}
                                                                </Typography>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell align="left">{dateTime}</TableCell>
                                                        <TableCell align="left">{`USD ${parseFloat(totalWinPrice).toFixed(2)}`}</TableCell>
                                                        <TableCell align="left">
                                                            <Button onClick={() => {
                                                                setSelectedId(row)
                                                                setTimeout(() => {
                                                                    setModalOpen(true)
                                                                }, 100);
                                                            }} variant='contained'>View More</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                }
                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        Not found
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results found for &nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br /> Try checking for typos or using complete words.
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={trackPayoutList ? totalData : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
                {
                    isLoading &&
                    <CircularProgress sx={{ position: 'absolute', alignSelf: "center", left: '50%', color: 'black' }} />
                }
            </Container >

            {
                isModalOpen &&
                <TrackPayoutLeaderBoard
                    isOpen={isModalOpen}
                    onClose={() => {
                        setSelectedId('')
                        setModalOpen(false)
                    }}
                    _id={selectedId}
                />
            }
        </>
    );
}
