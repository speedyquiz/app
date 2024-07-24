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
    Box
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
// components
import { useDispatch, useSelector } from 'react-redux';
//
import CarouselPageHeader from './CarouselPageHeader';
import CarouselToolBar from './CarouselToolBar';
import UploadCarouselImageModal from './UploadCarouselImageModal';
import UpdateCarouselImageModal from './UpdateCarouselImageModal';
import FullImageModal from '../../quizQuestionManagement-module/components/FullImageModal';
//
import Scrollbar from '../../../components/scrollbar';
//
import {
    getCarouselReq,
    deleteCarouselImageReq
} from '../action/action';

//
const TABLE_HEAD = [
    { id: 'image_id', label: 'Image', alignRight: false },
    { id: 'url', label: 'URL', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false },
];
//
export default function CarouselImageComponent() {
    //
    const dispatch = useDispatch();
    //
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('image_id');
    const [order, setOrder] = useState('asc');
    const [isImageUpload, setIsImageUpload] = useState(false);
    const [carouselImageList, setCarouselImageList] = useState([]);
    const [isUploadImageModal, setIsUploadImageModal] = useState(false);
    const [isUpdateImageModal, setIsUpdateImageModal] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [carouselImageId, setCarouselImageId] = useState('');
    const [isFullImageModal, setIsFullImageModal] = useState(false);
    const [fullImageURL, setFullImageURL] = useState('');
    const [carouselData, setCarouselData] = useState('');
    //
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
    };
    const handleSelectAllClick = (event) => {
    };
    //
    const fetchAllCarouselImage = () => {
        dispatch(
            getCarouselReq({
                reqData: {},
                onSuccessData: (responseData) => {
                    console.log('====================================');
                    console.log(JSON.stringify(responseData.data));
                    console.log('====================================');
                    setCarouselImageList(responseData.data)
                },
                onErrorData: (error) => {
                    console.log('====================================');
                    console.log(JSON.stringify(error));
                    console.log('====================================');
                }
            })
        )
    }
    const deleteCarouselImage = (imageID) => {
        dispatch(
            deleteCarouselImageReq({
                reqData: {
                    imageId: imageID
                },
                onSuccessData: (responseData) => {
                    setConfirmPopup(false)
                    fetchAllCarouselImage()
                },
                onErrorData: (error) => {
                    setConfirmPopup(false)
                    fetchAllCarouselImage()
                }
            })
        )
    }
    //
    useEffect(() => {
        fetchAllCarouselImage()
    }, [])
    //
    return (
        <>
            <Helmet>
                <title> Carousel Image | SpeedQuiz </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Carousel Image
                    </Typography>
                </Stack>
                <Card>
                    <CarouselToolBar
                        onBtnClick={() => {
                            setIsUploadImageModal(true)
                        }}
                    />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                {
                                    carouselImageList.length > 0 &&
                                    <CarouselPageHeader
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={0}
                                        numSelected={selected.length}
                                        onRequestSort={handleRequestSort}
                                        onSelectAllClick={handleSelectAllClick}
                                    />
                                }
                                <TableBody>
                                    {
                                        (carouselImageList.length > 0) ?
                                            carouselImageList.map((row) => {
                                                const { _id = "", image = "", url = "" } = row;
                                                return (
                                                    <TableRow hover tabIndex={-1} role="checkbox">
                                                        <TableCell component="th" scope="row" padding="none">
                                                            <Box
                                                                component="img"
                                                                sx={{
                                                                    marginBottom: '10px',
                                                                    marginTop: '10px',
                                                                    height: '80px',
                                                                    marginLeft: '14px',
                                                                    width: '160px',
                                                                    maxHeight: { xs: 233, md: 167 },
                                                                    maxWidth: { xs: 350, md: 250 },
                                                                }}
                                                                alt="The house from the offer."
                                                                src={`https://www.cashquiz.net/api/${image}`} />

                                                        </TableCell>
                                                        <TableCell component="th" scope="row" padding="none">
                                                            <Typography variant="url" sx={{ marginLeft: '0px' }}>
                                                                {url}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Button
                                                                variant='contained'
                                                                onClick={() => {
                                                                    setFullImageURL(`https://www.cashquiz.net/api/${image}`)
                                                                    setIsFullImageModal(true)
                                                                }}>View</Button>
                                                            {/* <Button variant='contained' sx={{ marginLeft: '5px' }} onClick={() => { }} >Update</Button> */}
                                                            <Button variant='contained' sx={{ marginLeft: '5px', marginRight: '0px' }} onClick={() => {
                                                                setCarouselData(row)
                                                                setTimeout(() => {
                                                                    setIsUpdateImageModal(true)
                                                                }, 100);
                                                            }}>
                                                                Update
                                                            </Button>
                                                            <Button variant='contained' sx={{ marginLeft: '5px', marginRight: '10px' }} onClick={() => {
                                                                setCarouselImageId(_id)
                                                                setTimeout(() => {
                                                                    setConfirmPopup(true)
                                                                }, 100);
                                                            }}>
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                            :
                                            <DialogTitle style={{ marginLeft: '38%' }}>
                                                {"No record found"}
                                            </DialogTitle>
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
            {
                isUploadImageModal &&
                <UploadCarouselImageModal
                    isOpen={isUploadImageModal}
                    onCancelClick={() => {
                        setIsUploadImageModal(false)
                        fetchAllCarouselImage()
                    }}
                />
            }
            {
                isUpdateImageModal &&
                <UpdateCarouselImageModal
                    isOpen={isUpdateImageModal}
                    data={carouselData}
                    onCancelClick={() => {
                        setIsUpdateImageModal(false)
                        fetchAllCarouselImage()
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
                            deleteCarouselImage(carouselImageId)
                        }} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            }
            {
                isFullImageModal &&
                <FullImageModal
                    isOpen={isFullImageModal}
                    onClose={() => {
                        setIsFullImageModal(false)
                    }}
                    imageURL={fullImageURL}
                />
            }
        </>
    );
}
