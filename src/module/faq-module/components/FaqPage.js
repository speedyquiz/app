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
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
// components
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
//
import ToolBar from './ToolBar';
import Header from './Header';
import AddFaqModal from './AddFaqModal';
import {
    getAllFaqData,
    deleteFAQData,
    createFAQdata,
    updateFAQdata
} from '../action/action';

//
const TABLE_HEAD = [
    { id: 'question', label: 'Question', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false }
];
//
export default function FaqPage() {
    //
    const dispatch = useDispatch()
    //
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [faqData, setFaqData] = useState([]);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [selectedRow, setSelectedRow] = useState({});
    const [isLoading, setIsLoading] = useState({});
    //
    const [questionText, setQuestionText] = useState('')
    const [answerText, setAnswerText] = useState('')
    //
    const [questionError,setQuestionError] = useState(false);
    const [answerError,setAnswererror] = useState(false);
    //
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    //
    useEffect(() => {
        fetchAllFaQData()
    }, [])
    //
    const fetchAllFaQData = () => {
        dispatch(
            getAllFaqData({
                reqData: {},
                onSuccessData: (responseData) => {
                    setFaqData(responseData.data)
                    setIsModalOpen(false)
                    setIsLoading(false)
                    setConfirmPopup(false)
                    setSelectedId('')
                    setAnswerText('')
                    setQuestionText('')
                },
                onErrorData: (error) => {
                    setIsModalOpen(false)
                    setIsLoading(false)
                    setConfirmPopup(false)
                    setSelectedId('')
                    setAnswerText('')
                    setQuestionText('')
                }
            })
        )
    }
    //
    const deleteFaqById = () => {
        dispatch(
            deleteFAQData({
                reqData: { faqId: selectedId },
                onSuccessData: (responseData) => {
                    fetchAllFaQData()
                },
                onErrorData: (error) => {
                    setIsModalOpen(false)
                    setIsLoading(false)
                    setConfirmPopup(false)
                    setSelectedId('')
                    setAnswerText('')
                    setQuestionText('')
                }
            })
        )
    }
    //
    const createNewFaqData = () => {
        dispatch(
            createFAQdata({
                reqData: {
                    "question": questionText,
                    "answer": answerText
                },
                onSuccessData: (responseData) => {
                    fetchAllFaQData()
                },
                onErrorData: (error) => {
                    setIsModalOpen(false)
                    setIsLoading(false)
                    setConfirmPopup(false)
                    setSelectedId('')
                    setAnswerText('')
                    setQuestionText('')
                }
            })
        )
    }
    //
    const updateFaqDataApi = (data) => {
        dispatch(
            updateFAQdata({
                reqData: {
                    faqId: selectedRow._id,
                    bodyData: data
                },
                onSuccessData: (responseData) => {
                    fetchAllFaQData()
                },
                onErrorData: (error) => {
                    setIsModalOpen(false)
                    setIsLoading(false)
                    setConfirmPopup(false)
                    setSelectedId('')
                    setAnswerText('')
                    setQuestionText('')
                }
            })
        )
    }

    //
    return (
        <>
            <Helmet>
                <title> FAQ | SpeedQuiz </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        FAQ
                    </Typography>
                </Stack>
                <Card>
                    <ToolBar
                        onClick={() => {
                            setSelectedRow({})
                            setTimeout(() => {
                                setIsModalOpen(true)
                            }, 100);
                        }}
                    />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <Header
                                    headLabel={TABLE_HEAD}
                                    rowCount={0}
                                />
                                <TableBody>
                                    {faqData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { _id, question } = row;
                                        const selectedUser = selected.indexOf(question) !== -1;
                                        return (
                                            <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Typography variant="subtitle2" sx={{ marginLeft: '20px' }}>
                                                        {question}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button variant='contained' sx={{ marginLeft: '5px' }} onClick={() => {
                                                        setSelectedRow(row)
                                                        setTimeout(() => {
                                                            setIsModalOpen(true)
                                                        }, 100);
                                                    }}>Edit</Button>
                                                    <Button variant='contained' sx={{ marginLeft: '5px' }} onClick={() => {
                                                        setSelectedId(_id)
                                                        setTimeout(() => {
                                                            setConfirmPopup(true)
                                                        }, 100);
                                                    }}>Remove</Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={faqData ? faqData.length : 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
            {
                isModalOpen &&
                <AddFaqModal
                    isLoading={isLoading}
                    selectedRow={selectedRow}
                    isOpen={isModalOpen}
                    questionError={questionError}
                    answerError={answerError}
                    onAnswerUpdate={(event) => {
                        setAnswerText(event.target.value)
                        setAnswererror(false)
                    }}
                    onQuestionUpdate={(event) => {
                        setQuestionText(event.target.value)
                        setQuestionError(false)
                    }}
                    onSubmitData={() => {
                        if (Object.keys(selectedRow).length !== 0) {
                            // for update
                            // alert('check this')
                            setIsLoading(true)
                            let quesstion = questionText;
                            let anssweeers = answerText;
                            if (!questionText) {
                                quesstion = selectedRow.question
                            }
                            if (!answerText) {
                                anssweeers = selectedRow.answer
                                // setAnswerText(selectedRow.answer)
                            }
                            setTimeout(() => {
                                updateFaqDataApi({
                                    "question": quesstion,
                                    "answer": anssweeers
                                })
                            }, 300);

                        } else if (questionText && answerText) {
                            setIsLoading(true)
                            createNewFaqData()
                        } else {
                            if(!questionText){
                                setQuestionError(true)
                            }
                            if(!answerText){
                                setAnswererror(true)
                            }
                            
                            
                            // alert('please enter question and answer both!')
                        }
                    }}
                    onCancelModal={() => {
                        setIsModalOpen(false)
                        setAnswerText('')
                        setQuestionText('')
                    }}
                />
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
                            deleteFaqById()

                        }} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            }


        </>
    );
}

