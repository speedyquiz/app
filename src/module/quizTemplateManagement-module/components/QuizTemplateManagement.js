import { Helmet } from 'react-helmet-async';
// import { sentenceCase } from 'change-case';
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
  Switch
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
// components
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { QuizListToolbar } from '../../../sections/@dashboard/quiztemplate';
// import Label from '../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead } from '../../../sections/@dashboard/user';
import { DELETE_QUIZ_TEMPLATE_BY_ID_REQUEST, GET_QUIZ_TEMPLATE_REQUEST, updateTemplateStatusData } from '../action/action';
import { getQuizWinnerTemplateData } from '../../winnerManagement-module/action/action';
import QuizTemplateModal from './QuizTemplateModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'noofque', label: '# Questions', alignRight: false },
  { id: 'pricemoney', label: 'Prize Money', alignRight: false },
  { id: 'totaltime', label: 'Total Time(In Seconds)', alignRight: false },
  { id: 'action', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

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
    _user.title && _user.title.toLowerCase().includes(query.toLowerCase())
  );

  return filteredArray.sort(comparator);
}
export default function QuizTemplateManagement() {
  const [open, setOpen] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const { quizTempateData, isLoading } = useSelector((state) => state.quizTemplateManagementModule);
  const { categoryDataList } = useSelector((state) => state.quizCategoryModule);
  const { quizTempateData, isLoading: isLoadinChecjk } = useSelector((state) => state.quizTemplateManagementModule);
  const [page, setPage] = useState(0);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [quizTemplateObj, setQuizTemplateObj] = useState('');
  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quizTemplate, setQuizTemplate] = useState([]);
  const [masterQuizTemplate, setMasterQuizTemplate] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateEffect, setIsUpdateEffect] = useState(false);
  const [selectedQuizTemplateData, setSSelectedQuizTemplateData] = useState({});
  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  // useEffect(() => {
  //   if (userId) {
  //     dispatch({
  //       type: GET_QUIZ_TEMPLATE_REQUEST,
  //     });
  //   }
  // }, [dispatch, userId]);

  // useEffect(() => {
  //   if (quizTempateData !== null && quizTempateData !== undefined) {
  //     setQuizTemplate(quizTempateData);
  //   }
  // }, [quizTempateData]);

  // const QuizTemplateList = Array.isArray(quizTemplate)
  //   ? quizTemplate?.map((quiz) => ({
  //     title: quiz.title,
  //     templateId: quiz._id,
  //     category: quiz.category,
  //     noofque: quiz.noOfQuestions,
  //     pricemoney: quiz.price,
  //     totaltime: quiz.timeInSeconds,
  //   }))
  //   : [];
  useEffect(() => {
    setIsLoading(true)
    dispatch(
      getQuizWinnerTemplateData({
        reqData: {},
        onSuccessData: (responseData) => {
          setMasterQuizTemplate(responseData);
          setQuizTemplate(applySortFilter(responseData, getComparator(order, orderBy), filterName));
          setIsLoading(false);
        },
        onErrorData: (error) => {
          setIsLoading(false);
        }
      })
    );
  }, [isLoadinChecjk])
  const handleDelete = (id) => {
    if (id) {
      dispatch({
        type: DELETE_QUIZ_TEMPLATE_BY_ID_REQUEST,
        payload: id,
      });
      setConfirmPopup(false)
      setTimeout(() => {
        setIsUpdateEffect(!isUpdateEffect)
      }, 1000);
    }
  };
  const handleOpenModal = (templateId) => {
    setSelectedTemplateId(templateId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
      const newSelecteds = quizTemplate?.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quizTemplate.length) : 0;

  // const filteredUsers = applySortFilter(QuizTemplateList, getComparator(order, orderBy), filterName);

  const isNotFound = !quizTemplate.length && !!filterName;
  // const openModal = (userData) => {
  //   setIsModalOpen(true);
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
  const onUpdateClose = () => {
    // alert('check this val')
  }
  return (
    <>
      <Helmet>
        <title> Quiz Template Management | SpeedQuiz </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Quiz Template Management
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          <QuizListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onCategorySelect={(categoryId) => {
              if (categoryId === "-1") {
                setQuizTemplate(applySortFilter(masterQuizTemplate, getComparator(order, orderBy), filterName));
              } else {
                const categoryTemplateData = masterQuizTemplate.filter(item => item.category === categoryId);
                setQuizTemplate(applySortFilter(categoryTemplateData, getComparator(order, orderBy), filterName));
              }
            }}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={quizTemplate ? quizTemplate.length : 0}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {isLoading ? (
                  <CircularProgress
                    style={{
                      marginLeft: '400%',
                    }}
                  />
                ) : (
                  (quizTemplate.length === 0) ?
                    <DialogTitle style={{ marginLeft: '10%' }}>
                      {"No record found"}
                    </DialogTitle>
                    :
                    <TableBody>
                      {quizTemplate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                        //
                        const { _id, title, category, noOfQuestions, price, timeInSeconds, isActive = false } = row;
                        const selectedUser = selected.indexOf(title) !== -1;
                        const categoryDataListTemp = categoryDataList !== null ? categoryDataList.filter(item => item._id === category) : []
                        //
                        return (
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell component="th" scope="row" padding="none">
                              <Typography variant="subtitle2" sx={{ marginLeft: '15px' }}>
                                {title}
                              </Typography>
                            </TableCell>
                            {
                              (categoryDataListTemp.length > 0) ?
                                <TableCell align="left">{categoryDataListTemp[0]?.name}</TableCell>
                                :
                                <TableCell align="left">{''}</TableCell>
                            }
                            <TableCell align="left">{noOfQuestions}</TableCell>
                            <TableCell align="left">{`USD ${parseFloat(price).toFixed(2)}`}</TableCell>
                            <TableCell align="left">{timeInSeconds}</TableCell>
                            <TableCell align="left">
                              <Switch
                                checked={isActive}
                                onChange={(e, c) => {
                                  //
                                  quizTemplate[index].isActive = c;
                                  setQuizTemplate(JSON.parse(JSON.stringify(quizTemplate)))
                                  //
                                  dispatch(
                                    updateTemplateStatusData({
                                      reqData: {
                                        templateId: _id,
                                        formData: { "isActive": c }
                                      },
                                      onSuccessData: (responseData) => { },
                                      onErrorData: (error) => { }
                                    })
                                  )
                                }} />
                            </TableCell>
                            <TableCell align="center">
                              <Button variant='contained' onClick={() => {
                                setSSelectedQuizTemplateData(row)
                                handleOpenModal(_id)
                              }}>Update</Button>
                              <Button variant='contained' sx={{ marginLeft: '5px' }} onClick={() => {
                                setConfirmPopup(true)
                                setQuizTemplateObj(_id)

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
            count={quizTemplate ? quizTemplate.length : 0}
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
      {
        isModalOpen &&
        <QuizTemplateModal
          templateId={selectedTemplateId}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
          selectedQuizTemplateData={selectedQuizTemplateData}
        />
      }

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

            handleDelete(quizTemplateObj)
          }} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
