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
// mock
// import QUESTIONLIST from '../../../_mock/category';
import { DELETE_QUIZ_QUESTION_BY_ID_REQUEST, GET_QUIZ_QUESTION_REQUEST, getQuesstionSetByCategoryId, getQuesstionSetAllData } from '../action/action';
import AddQuestionModal from './AddQuestionModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'questions', label: 'Questions', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
];

// ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   if (!Array.isArray(array)) {
//     // Handle the case where 'array' is not an array (or undefined)
//     return [];
//   }

//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   if (query) {
//     return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }

//   return stabilizedThis.map((el) => el[0]);
// }
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
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

  const filteredArray = array.filter((_user) =>
    _user.questions && _user.questions.toLowerCase().includes(query.toLowerCase())
  );

  return filteredArray.sort(comparator);
}
export default function QuizQuestionManagementPage() {
  // const { getQuizQuestionData, isLoading } = useSelector((state) => state.quizQuestionManagementModule);

  const [open, setOpen] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [questionIdObj, setQuestionIdObj] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('question');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [quizQuestion, setQuizQuestion] = useState();
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [questionList, setQuestionList] = useState([]);
  const [masterQuestionList, setMasterQuestionList] = useState([]);

  const dispatch = useDispatch();
  // const userId = localStorage.getItem('userId');
  // useEffect(() => {
  //   if (userId) {
  //     dispatch({
  //       type: GET_QUIZ_QUESTION_REQUEST,
  //     });
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   if (getQuizQuestionData !== null && getQuizQuestionData !== undefined) {
  //     setQuizQuestion(getQuizQuestionData);
  //   }
  // }, [getQuizQuestionData]);

  // const QuizQuestionList = quizQuestion?.map((quiz) => ({
  //   questions: quiz.question,
  //   questionsId: quiz._id,
  // }));

  useEffect(() => {
    setIsLoading(true)
    dispatch(
      getQuesstionSetAllData({
        reqData: {},
        onSuccessData: (responseData) => {
          setQuestionList(responseData);
          setMasterQuestionList(responseData)
          setIsLoading(false)
        },
        onErrorData: (error) => {
          setIsLoading(false)
        }
      })
    )
  }, [])

  const handleDelete = (id) => {
    if (id) {
      dispatch({
        type: DELETE_QUIZ_QUESTION_BY_ID_REQUEST,
        payload: id,
      });
    }
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = questionList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questionList.length) : 0;

  // const filteredUsers = applySortFilter(QuizQuestionList, getComparator(order, orderBy), filterName);

  const isNotFound = !questionList.length && !!filterName;
  const handleOpenModal = (questionsId) => {
    setSelectedQuestionId(questionsId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
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
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          <QuestionListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onCategorySelect={(categoryId)=>{
              setQuestionList(masterQuestionList.filter(item=> item.category === categoryId))
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
                {isLoading ? (
                  <CircularProgress
                    style={{
                      marginLeft: '70%',
                    }}
                  />
                ) : (
                  <TableBody>
                    {questionList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { _id, question, category } = row;
                      const selectedUser = selected.indexOf(question) !== -1;

                      return (
                        <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                          <TableCell component="th" scope="row" padding="none">
                            <Typography variant="subtitle2" sx={{ marginLeft: '15px' }}>
                              {question}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Button onClick={() => handleOpenModal(_id)}>Update</Button>
                            <Button onClick={() => {
                              setConfirmPopup(true)
                              setQuestionIdObj(_id)
                            }}>Delete</Button>
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
                )}
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
            count={questionList ? questionList.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <AddQuestionModal questionId={selectedQuestionId} isOpen={isModalOpen} onClose={closeModal} />
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
    </>
  );
}
