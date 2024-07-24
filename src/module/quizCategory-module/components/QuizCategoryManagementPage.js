/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
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
//
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
// components
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import CategoryListHead from 'src/sections/@dashboard/quizcategory/CategoryListHead';
import { CategoryListToolbar } from '../../../sections/@dashboard/quizcategory';
// import Label from '../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
// mock
// import CATEGORYLIST from '../../../_mock/category';
import QuizCategoryModal from './QuizCategoryModal';
import { DELETE_QUIZ_CATEGORY_BY_ID_REQUEST, GET_QUIZ_CATEGORY_REQUEST } from '../action/action';
// import UserProfileModal from './MemberProfileModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'categoryName', label: 'Category Name', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  // { id: '' },
];
//

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
    _user.categoryName && _user.categoryName.toLowerCase().includes(query.toLowerCase())
  );

  return filteredArray.sort(comparator);
}
export default function QuizCategoryManagementPage() {
  const { categoryDataList, isLoading } = useSelector((state) => state.quizCategoryModule);
  const [open, setOpen] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [categoryIdObj, setCategoryIdObj] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    if (userId) {
      dispatch({
        type: GET_QUIZ_CATEGORY_REQUEST,
      });
    }
  }, [userId]);

  useEffect(() => {
    if (categoryDataList !== null && categoryDataList !== undefined) {
      setCategoryList(categoryDataList);
    }
  }, [categoryDataList]);
  const CategoryDataList = categoryList?.map((category) => ({
    categoryName: category.name,
    categoryId: category._id,
  }));
  const dispatch = useDispatch();
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = CategoryDataList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleDelete = (id) => {
    if (id) {
      dispatch({
        type: DELETE_QUIZ_CATEGORY_BY_ID_REQUEST,
        payload: id,
      });
      //
      setCategoryIdObj('')
      //
      setTimeout(() => {
        dispatch({
          type: GET_QUIZ_CATEGORY_REQUEST,
        });
      }, 500);
    }
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - CategoryDataList.length) : 0;

  const filteredUsers = applySortFilter(CategoryDataList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };
  return (
    <>
      <Helmet>
        <title> Quiz Category Management | SpeedQuiz </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Quiz Category Management
          </Typography>
        </Stack>

        <Card>
          <CategoryListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CategoryListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={CategoryDataList ? CategoryDataList.length : 0}
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
                  (CategoryDataList.length === 0) ?
                    <DialogTitle style={{ marginLeft: '50%' }}>
                      {"No record found"}
                    </DialogTitle>
                    :
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, categoryName, categoryId } = row;
                        const selectedUser = selected.indexOf(categoryName) !== -1;

                        return (
                          <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell component="th" scope="row" padding="none">
                              <Typography variant="subtitle2" sx={{ marginLeft: '15px' }}>
                                {categoryName}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Button variant='contained' onClick={() => handleOpenModal(categoryId)} >Update</Button>
                              <Button variant='contained' sx={{ marginLeft: '5px' }} onClick={() => {
                                setCategoryIdObj(categoryId)
                                setConfirmPopup(true)
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
            count={CategoryDataList ? CategoryDataList.length : 0}
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
      <QuizCategoryModal categoryId={selectedCategoryId} isOpen={isModalOpen} onClose={closeModal} />
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
            handleDelete(categoryIdObj)
          }} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
