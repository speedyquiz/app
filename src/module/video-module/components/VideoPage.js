
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
    CardMedia
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

// components
import { useDispatch, useSelector } from 'react-redux';
import VideoPageHeader from './VideoPageHeader';
import VideoPageToolbar from './VideoPageToolbar';
import UploadVideoModal from './UploadVideoModal';
import VideoPlayerModal from './VideoPlayerModal';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
//
import {
    getVideoDataReq,
    deleteFVideoDataReq
} from '../action/action';
//
const TABLE_HEAD = [
    { id: 'video_id', label: 'Video', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false },
];

export default function VideoPage() {
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
    const [isVideoUpload, setIsVideoUpload] = useState(false);
    const [isVideoPlay, setIsVideoPlay] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [videoId, setVideoId] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoList, setVideoList] = useState([]);
    //
    useEffect(() => {
        fetchAllVideo()
    }, []);
    //
    const fetchAllVideo = () => {
        dispatch(
            getVideoDataReq({
                reqData: {},
                onSuccessData: (responseData) => {
                    console.log('====================================');
                    console.log(JSON.stringify(responseData.data));
                    console.log('====================================');
                    setVideoList(responseData.data)
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
    const deleteVideoById = () => {
        dispatch(
            deleteFVideoDataReq({
                reqData: { video_Id: videoId },
                onSuccessData: (responseData) => {
                    fetchAllVideo()
                },
                onErrorData: (error) => {

                }
            })
        )
    }
    //
    return (
        <>
            <Helmet>
                <title> Video | SpeedQuiz </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Video
                    </Typography>
                </Stack>
                <Card>
                    <VideoPageToolbar
                        onBtnClick={() => {
                            setIsVideoUpload(true)
                        }}
                    />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <VideoPageHeader
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={0}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {videoList.map((row) => {
                                        const { _id = "", url = "" } = row;
                                        return (
                                            <TableRow hover tabIndex={-1} role="checkbox">
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Typography variant="subtitle2" sx={{ marginLeft: '15px' }}>
                                                        {`Video 1`}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button variant='contained' onClick={() => {
                                                        setVideoUrl(url)
                                                        setTimeout(() => {
                                                            setIsVideoPlay(true)
                                                        }, 100);
                                                    }}>View</Button>
                                                    {/* <Button variant='contained' sx={{ marginLeft: '5px' }} onClick={() => { }} >Update</Button> */}
                                                    <Button variant='contained' sx={{ marginLeft: '5px',marginRight:'50px' }} onClick={() => {
                                                        setVideoId(_id)
                                                        setTimeout(() => {
                                                            setConfirmPopup(true)
                                                        }, 100);
                                                    }}>
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    {/* <video width="750" height="500" controls>
                        <source src={''} type="video/mp4" />
                    </video> */}
                </Card>
            </Container>
            {
                isVideoUpload &&
                <UploadVideoModal
                    videoList={videoList}
                    isOpen={isVideoUpload}
                    onClose={() => {
                        setIsVideoUpload(false)
                        setTimeout(() => {
                            fetchAllVideo()
                        }, 100);
                    }}
                />
            }
            {
                isVideoPlay &&
                <VideoPlayerModal
                    videoUrl={videoUrl}
                    isOpen={isVideoPlay}
                    onCloseVideo={() => {
                        setIsVideoPlay(false)
                    }}
                    onClose={() => {
                        setIsVideoPlay(false)
                    }} />
            }
            {
                confirmPopup &&
                <Dialog
                    open={confirmPopup}
                    onClose={() => {
                        setConfirmPopup(false)
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are You sure you want to delete?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => {
                            setConfirmPopup(false)
                        }}>Cancel</Button>
                        <Button onClick={() => {
                            setConfirmPopup(false)
                            deleteVideoById()
                        }} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            }

        </>
    );
}

