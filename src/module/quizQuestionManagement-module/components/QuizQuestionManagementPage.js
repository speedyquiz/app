/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from 'react-helmet-async';
// import { sentenceCase } from 'change-case';
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
  Box
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
// components
import { useDispatch, useSelector } from 'react-redux';
import QuestionListToolbar from '../../../sections/@dashboard/quizquestions/QuestionListToolbar';
// import Label from '../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead } from '../../../sections/@dashboard/user';
//
import { getquestionPaginationReqData, fetchquestionByCategoryId, deleteQuestionByIdData, fetchQuizCategoryData, fetchQuestionByText } from "../action/action";
import AddQuestionModal from './AddQuestionModal';
import UploadQuestionFile from './UploadQuestionFile';
import FullImageModal from './FullImageModal';
//
const TABLE_HEAD = [
  { id: 'questions', label: 'Questions', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
];
//
function descendingComparator(a, b, orderBy) {
  if (b.question.toLowerCase() < a.question.toLowerCase()) {

    return -1;
  }
  if (b.question.toLowerCase() > a.question.toLowerCase()) {
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
    quesstionData.question && quesstionData.question.toLowerCase().includes(query.toLowerCase())
  );

  return filteredArray.sort(comparator);
}
//
export default function QuizQuestionManagementPage() {
  //
  const dispatch = useDispatch();
  //
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [questionList, setQuestionList] = useState([]);
  const [masterQuestionList, setMasterQuestionList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [filterName, setFilterName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isQuesstionUpload, setIsQuesstionUpload] = useState(false);
  const [isCategorySelected, setCategorySelected] = useState(false);
  const [selectedcategoryId, setselectedCategoryId] = useState('');
  //
  const [isaddquestionModal, setIsAddquestionModal] = useState(false);
  const [isFullImageModal, setIsFullImageModal] = useState(false);
  const [selectedquestionObj, setSelectedquestionObj] = useState({})
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [isFromEdit, setIsFromEdit] = useState(false);
  const [questionIdObj, setQuestionIdObj] = useState('');
  const [quizCategoryList, setQuizCategoryList] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [fullImageURL, setFullImageURL] = useState('');
  //
  const fetchAllQuizCategoryFromApi = () => {
    dispatch(fetchQuizCategoryData({
      reqData: {},
      onSuccessData: (responseData) => {
        setQuizCategoryList(responseData)
      },
      onErrorData: (onError) => {

      }
    }))
  }
  //
  const fetchQuestionByTextFromApi = (text) => {
    dispatch(fetchQuestionByText({
      reqData: {
        queryText: text
      },
      onSuccessData: (responseData) => {
        setQuestionList(applySortFilter(responseData, getComparator(order, orderBy), filterName));
        setMasterQuestionList(responseData)

      },
      onErrorData: (onError) => {

      }
    }))
  }
  //
  const fetchQuestionDataByPage = (pageNoVal) => {
    dispatch(getquestionPaginationReqData({
      reqData: {
        pageNo: pageNoVal
      },
      onSuccessData: (responseData) => {
        if (pageNoVal === 1) {
          setTotalQuestion(responseData.totalCount)
          setCurrentPage(pageNoVal)
          setQuestionList(applySortFilter(responseData.data, getComparator(order, orderBy), filterName));
          setMasterQuestionList(responseData.data)
        } else {
          setCurrentPage(pageNoVal)
          setQuestionList(applySortFilter([...questionList, ...responseData.data], getComparator(order, orderBy), filterName));
          setMasterQuestionList([...masterQuestionList, ...responseData.data])
        }

      },
      onErrorData: (error) => {
        console.log(JSON.stringify(error));
      }
    }))
  }
  //
  useEffect(() => {
    fetchAllQuizCategoryFromApi();
    fetchQuestionDataByPage(currentPage);
  }, [])
  //
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questionList.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    //
    if (currentPage < (newPage + 1) && filterName === '') {
      if (isCategorySelected) {
        fetchquestionByCateogryIdRequest(selectedcategoryId, (newPage + 1));
      } else {
        fetchQuestionDataByPage((newPage + 1));

      }
    }

  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  //
  const handleRequestSort = (event, property) => {
    // const isAsc = orderBy === property && order === 'asc';
    // setOrder(isAsc ? 'desc' : 'asc');
    // setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = questionList.map((n) => n.question);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  //
  const fetchquestionByCateogryIdRequest = (categoryId, pageNoVal) => {
    dispatch(fetchquestionByCategoryId({
      reqData: {
        categoryid: categoryId,
        pageNo: pageNoVal
      },
      onSuccessData: (responseData) => {
        if (pageNoVal === 1) {
          setTotalQuestion(responseData.totalCount)
          setCurrentPage(pageNoVal)
          setQuestionList(applySortFilter(responseData.data, getComparator(order, orderBy), filterName));
          setMasterQuestionList(responseData.data)
        } else {
          setCurrentPage(pageNoVal)
          setQuestionList(applySortFilter([...questionList, ...responseData.data], getComparator(order, orderBy), filterName));
          setMasterQuestionList([...masterQuestionList, ...responseData.data])
        }
      },
      onErrorData: (error) => {
        console.log(JSON.stringify(error));
      }
    }))
  }
  //
  const handleDelete = (id) => {
    dispatch(deleteQuestionByIdData({
      reqData: {
        questionId: id
      },
      onSuccessData: (responseData) => {
        setTotalQuestion(totalQuestion - 1)
        setQuestionList(applySortFilter(questionList.filter(item => item._id !== questionIdObj), getComparator(order, orderBy), filterName));
        setMasterQuestionList(applySortFilter(masterQuestionList.filter(item => item._id !== questionIdObj), getComparator(order, orderBy), filterName));
      },
      onErrorData: (error) => {
        console.log(JSON.stringify(error));
      }
    }))

  };
  //
  return (
    <>
      <Helmet>
        <title> Quiz Question Management | SpeedQuiz </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Quiz Question Management
          </Typography>
        </Stack>
        <Card>
          <QuestionListToolbar
            numSelected={selected.length}
            filterName={filterName}
            quizCategoryList={quizCategoryList}
            onFilterName={(event) => {
              setFilterName(event.target.value);

              if (event.target.value === '') {
                fetchQuestionDataByPage(1);
                // setQuestionList(applySortFilter(masterQuestionList, getComparator(order, orderBy), filterName));
              } else {
                fetchQuestionByTextFromApi(event.target.value)
                // ssetQuestionList(applySortFilter(masterQuestionList.filter(item => item.question.toLowerCase().includes(event.target.value.toLowerCase())), getComparator(order, orderBy), filterName));
              }

            }}
            onCategorySelect={(categoryId) => {
              //
              if (categoryId === '-1') {
                setCategorySelected(false)
                setCurrentPage(1)
                setQuestionList([]);
                setMasterQuestionList([]);
                //
                setTimeout(() => {
                  fetchQuestionDataByPage(1);
                }, 100);
              } else {
                //
                setCategorySelected(true)
                setselectedCategoryId(categoryId)
                setCurrentPage(1)
                setQuestionList([]);
                setMasterQuestionList([]);
                //
                setTimeout(() => {
                  fetchquestionByCateogryIdRequest(categoryId, 1)
                }, 100);
              }
            }}
            onClickuploadFile={() => {
              setIsQuesstionUpload(true)
            }}
            onClickAddQuestion={() => {
              setIsAddquestionModal(true)
            }}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={questionList ? questionList.length : 0}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {

                  (questionList.length === 0) ?
                    <DialogTitle style={{ marginLeft: '50%' }}>
                      {"No record found"}
                    </DialogTitle>
                    :
                    <TableBody>
                      {questionList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { _id, question, category, type = "text" } = row;
                        const selectedQuestion = selected.indexOf(question) !== -1;
                        console.log(question);
                        return (
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedQuestion}>
                            <TableCell component="th" scope="row" padding="none">
                              {
                                (type.toLowerCase() === 'text') ?
                                  <Typography variant="subtitle2" sx={{ marginLeft: '15px' }}>
                                    {question}
                                  </Typography>
                                  :
                                  <Button onClick={() => {
                                    setFullImageURL(`https://www.cashquiz.net/api/${question}`)
                                    setIsFullImageModal(true)
                                  }}>
                                    <Box
                                      component="img"
                                      sx={{
                                        height: '60px',
                                        marginLeft: '14px',
                                        width: '150px',
                                        maxHeight: { xs: 233, md: 167 },
                                        maxWidth: { xs: 350, md: 250 },
                                      }}
                                      alt="The house from the offer."
                                      src={`https://www.cashquiz.net/api/${question}`} />
                                  </Button>
                              }
                            </TableCell>
                            <TableCell align="left">
                              <Button onClick={() => {
                                setIsFromEdit(true)
                                setSelectedquestionObj(row)
                                setTimeout(() => {
                                  setIsAddquestionModal(true)
                                }, 100);
                              }}>Update</Button>
                              <Button onClick={() => {
                                setConfirmPopup(true)
                                setQuestionIdObj(_id)
                              }}>Delete</Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                }
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={questionList ? totalQuestion : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {
        isQuesstionUpload &&
        <UploadQuestionFile
          isOpen={isQuesstionUpload}
          onClose={() => {
            setIsQuesstionUpload(false)
            fetchquestionByCateogryIdRequest(selectedcategoryId, 1)
          }}
          quizCategoryList={quizCategoryList}
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
              setConfirmPopup(false)
              handleDelete(questionIdObj)
            }} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      }
      {
        isaddquestionModal &&
        <AddQuestionModal
          isFromEdit={isFromEdit}
          questionId={selectedquestionObj}
          isOpen={isaddquestionModal}
          onClose={() => {
            setIsAddquestionModal(false)
            setTimeout(() => {
              setIsFromEdit(false)
              fetchquestionByCateogryIdRequest(selectedcategoryId, 1)
            }, 100);
          }}
        />
      }
      <FullImageModal
        isOpen={isFullImageModal}
        onClose={() => {
          setIsFullImageModal(false)
        }}
        imageURL={fullImageURL}
      />
    </>
  );
}
