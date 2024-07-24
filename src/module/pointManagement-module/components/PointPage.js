
//
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
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
    CircularProgress,
    CardMedia,
    Grid
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

// components
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import PointPageHeader from './PointPageHeader';
import PointPageModal from './PointPageModal';
//
import {
    getAllPointsDataReq,
    updatePointDataReq
} from '../action/action';
//
const TABLE_HEAD = [
    { id: 'pointName', label: 'Point Type', alignRight: false },
    { id: 'pointVal', label: 'Point Value', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false },
    // { id: 'status', label: 'Status', alignRight: false },
    // { id: '' },
];

export default function PointPage() {
    //
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
    };
    //
    const handleSelectAllClick = (event) => {
    };
    //
    const dispatch = useDispatch()
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('video_id');
    const [pointList, setPointList] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedObject, setSelectedObject] = useState({});
    const [updatePoint, setUpdatePoint] = useState(0);
    //
    useEffect(() => {
        fetchAllPointData()
    }, []);
    //
    const fetchAllPointData = () => {
        dispatch(
            getAllPointsDataReq({
                reqData: {},
                onSuccessData: (responseData) => {
                    console.log('====================================');
                    console.log(JSON.stringify(responseData.data));
                    console.log('====================================');
                    setPointList(responseData.data)
                },
                onErrorData: (error) => {
                    console.log('====================================');
                    console.log(JSON.stringify(error));
                    console.log('====================================');
                }
            })
        )
    }
    //
    return (
        <>
            <Helmet>
                <title> Point Management | SpeedQuiz </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Point System Management
                    </Typography>
                </Stack>
                <Card>
                    {/* <PointListToolbar
                        onBtnClick={() => {

                        }}
                    /> */}
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <PointPageHeader
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={0}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {
                                        Object.keys(pointList).length !== 0 &&
                                        [
                                            { 'title': 'Sign up', 'key': 'signup' },
                                            { 'title': 'Profile Image', 'key': 'profile_image' },
                                            { 'title': 'Bank Account', 'key': 'bank_account' },
                                            { 'title': 'Profile Completion', 'key': 'profile_completion' },
                                            { 'title': 'Ad View', 'key': 'watching_ads' },
                                            { 'title': 'Quiz Win', 'key': 'winning_quiz' },
                                            { 'title': '100% Correct', 'key': 'correct_all_answers' }
                                        ].map((row) => {
                                            return (
                                                <TableRow hover tabIndex={-1} role="checkbox" sx={{ marginLeft: '15px', marginRight: '15px' }}>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Grid item container sx={{ paddingLeft: '30px' }} >
                                                            <Typography variant="subtitle2">
                                                                {row.title}
                                                            </Typography>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Grid item container sx={{ paddingRight: '50px' }} justifyContent="center" >
                                                            <Typography variant="subtitle2" >
                                                                {pointList[row.key]}
                                                            </Typography>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell align="right" >
                                                        <Grid item container justifyContent="center">
                                                            <Button variant='contained' onClick={() => {
                                                                setSelectedObject(row)
                                                                setUpdatePoint(pointList)
                                                                setTimeout(() => {
                                                                    setIsModalOpen(true)
                                                                }, 100);
                                                            }}>Update</Button>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
            {
                isModalOpen &&
                <PointPageModal updatePoint={updatePoint} categoryId={selectedObject} isOpen={isModalOpen} onClose={() => {
                    fetchAllPointData()
                    setIsModalOpen(false)
                }} />
            }

        </>
    );
}