/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
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
  Box
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
// components
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../../sections/@dashboard/user';
import UserProfileModal from './MemberProfileModal';
import { DELETE_MEMBER_BY_ID_REQUEST, getMemberListData, deleteMemberFromList, getUserBySearchData } from '../action/action';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'User Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'register', label: 'Register', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b.username.toLowerCase() < a.username.toLowerCase()) {
    return -1;
  }
  if (b.username.toLowerCase() > a.username.toLowerCase()) {
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
    _user.username && _user.username.toLowerCase().includes(query.toLowerCase()) ||
    _user.email && _user.email.toLowerCase().includes(query.toLowerCase())
  );

  return filteredArray.sort(comparator);
}
export default function MemberManagementPage() {
  const { memberData } = useSelector((state) => state.memberManagementModule);
  const dispatch = useDispatch();
  //
  const [open, setOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [memberIdObj, setMemberIdObj] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('register');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [memberList, setMemberList] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isSortDone, setIsSortDone] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  // const handleOpenMenu = (event) => {  
  //   setOpen(event.currentTarget);
  // };

  const userId = localStorage.getItem('userId');
  useEffect(() => {
    // if (memberList.length === 0) {
    //   fetchAllMemberList(currentPage)
    // } else {
    //   setMemberList(applySortFilter(memberList, getComparator(order, orderBy), filterName));
    // }
    setIsLoading(true)
    fetchAllMemberList(currentPage, sortOrder, sortField)
  }, [])// isSortDone

  const fetchAllMemberList = (pageNoVal, orderVal = 'desc', orderField = 'createdAt') => {
    dispatch(
      getMemberListData({
        reqData: {
          pageNo: pageNoVal,
          name: orderField,
          order: orderVal
        },
        onSuccessData: (responseData) => {
          setIsLoading(false)
          //
          setSortOrder((order === 'asc') ? 'desc' : 'asc')
          setSortField(orderField)
          //
          if (pageNoVal === 1) {
            setTotalData(responseData.totalCount)
            setCurrentPage(pageNoVal)
            setMemberList(responseData.data);
          } else {
            setCurrentPage(pageNoVal)
            setMemberList([...memberList, ...responseData.data]);
          }
        },
        onErrorData: (error) => {
          setIsLoading(false);
        }
      })
    )
  }
  const fetchAllMemberBySearchText = (pageNoVal, orderVal = 'desc', orderField = 'createdAt', searchTextVal = "") => {
    dispatch(
      getUserBySearchData({
        reqData: {
          searchText: searchTextVal,
          pageNo: pageNoVal,
          name: orderField,
          order: orderVal
        },
        onSuccessData: (responseData) => {
          setIsLoading(false)
          //
          setSortOrder((order === 'asc') ? 'desc' : 'asc')
          setSortField(orderField)
          //
          if (pageNoVal === 1) {
            setTotalData(responseData.totalCount)
            setCurrentPage(pageNoVal)
            setMemberList(responseData.data);
          } else {
            setCurrentPage(pageNoVal)
            setMemberList([...memberList, ...responseData.data]);
          }
        },
        onErrorData: (error) => {
          setIsLoading(false);
        }
      })
    )
  }
  // useEffect(() => {
  //   if (userId) {
  //     dispatch({
  //       type: GET_MEMBER_DATA_REQUEST,
  //     });
  //   }
  // }, [dispatch, userId]);
  // useEffect(() => {
  //   if (memberData !== null && memberData !== undefined) {
  //     setMemberList(memberData);
  //   }
  // }, [memberData]);
  // const MemberDataList = memberList?.map((member) => {
  //   // Parse the ISO date string to a Date object
  //   const registerDate = new Date(member.createdAt);

  //   // Get the day, month, and year components
  //   const day = registerDate.getDate();
  //   const month = registerDate.getMonth() + 1; // Months are zero-based
  //   const year = registerDate.getFullYear();

  //   // Format the date as 'dd/mm/yyyy'
  //   const formattedDate = `${day}/${month}/${year}`;

  //   // Determine the status based on isDeleted
  //   const status = member.isDeleted ? 'Inactive' : 'Active';

  //   return {
  //     username: member.username,
  //     email: member.email,
  //     status: status,
  //     register: formattedDate,
  //     memberId: member._id,
  //   };
  // });
  const handleDelete = (id) => {

    dispatch(
      deleteMemberFromList({
        reqData: {
          'id': id
        },
        onSuccessData: (responseData) => {
          const updatedList = memberList.filter(item => item._id !== id)
          setMemberList(applySortFilter(updatedList, getComparator(order, orderBy), filterName));
          setTotalData(totalData - 1)
        },
        onErrorData: (error) => {

        }
      })
    )
    if (id) {
      dispatch({
        type: DELETE_MEMBER_BY_ID_REQUEST,
        payload: id,
      });
    }
  };
  const handleOpenModal = (memberId) => {
    setSelectedMemberId(memberId);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 100);

  };
  const handleCloseMenu = () => {
    setOpen(null);

  };

  const handleRequestSort = (event, property) => {
    // setIsSortDone(!isSortDone)
    // const isAsc = orderBy === property && order === 'asc';
    //
    if (filterName === '') {
      if (property === 'username') {
        // setSortField('username')
        setPage(0);
        fetchAllMemberList(1, (orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc', 'username')
      }
      if (property === 'register') {
        setSortField('createdAt')
        // fetchAllMemberList(1)
        setPage(0);
        fetchAllMemberList(1, (orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc', 'createdAt')
      }
      //
      // setSortOrder((order === 'asc') ? 'desc' : 'asc')
      setOrder((orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc');
      setOrderBy(property);
    }

    //
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = memberList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    //
    if (currentPage < (newPage + 1)) {
      setIsLoading(true)
      fetchAllMemberList((newPage + 1), sortOrder, sortField);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    // setPage(0);
    setFilterName(event.target.value);
    // setIsSortDone(!isSortDone)
    if (event.target.value === "") {
      fetchAllMemberList(1, sortOrder, sortField)
    } else {
      fetchAllMemberBySearchText(1, sortOrder, sortField, event.target.value)
    }

  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - memberList.length) : 0;

  // const filteredUsers = applySortFilter(memberList, getComparator(order, orderBy), filterName);

  const isNotFound = !memberList.length && !!filterName;
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  const closeModal = (value) => {
    if (value === 1) {
      setMemberList([])
      setIsSortDone(!isSortDone)
      setIsModalOpen(false);
      setPage(0);
      fetchAllMemberList(1, sortOrder, sortField)
    } else {
      setIsModalOpen(false);
    }
  };
  return (
    <>
      <Helmet>
        <title> Member Management | SpeedQuiz </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Member Management
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            openModal={() => {
              setIsModalEdit(true)
              setSelectedMemberId(null);
              setTimeout(() => {
                setIsModalOpen(true);
              }, 100);
            }}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={memberList ? memberList.length : 0}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {isLoading ? (
                  null
                ) : (
                  (memberList.length === 0) ?
                    <DialogTitle style={{ marginLeft: '50%' }}>
                      {"No record found"}
                    </DialogTitle>
                    :
                    <TableBody>
                      {memberList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, username, email, _id, isDeleted, createdAt
                        } = row;
                        const selectedUser = selected.indexOf(username) !== -1;
                        const status = isDeleted ? 'Inactive' : 'Active';

                        const register = `${new Date(createdAt).getDate()}/${(new Date(createdAt).getMonth()) + 1}/${new Date(createdAt).getFullYear()}`;
                        return (
                          <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell component="th" scope="row" padding="none">
                              <Typography variant="subtitle2" sx={{ marginLeft: '20px' }}>
                                {username}
                              </Typography>

                            </TableCell>
                            <TableCell align="left">
                              {/* <Label color={status === 'Active' ? 'success' : 'error'}>{status}</Label> */}
                              <TableCell align="left">{email}</TableCell>
                            </TableCell>
                            <TableCell align="left">
                              {/* <Label color={status === 'Active' ? 'success' : 'error'}>{status}</Label> */}
                              <TableCell align="left">{status}</TableCell>
                            </TableCell>
                            {/* <TableCell align="left">{status}</TableCell> */}
                            <TableCell align="left">{register}</TableCell>
                            <TableCell align="left">
                              <Button variant='contained' onClick={() => {
                                setIsModalEdit(false)
                                handleOpenModal(_id)
                              }}>View</Button>
                              <Button variant='contained' sx={{ marginLeft: '5px' }} onClick={() => {
                                setIsModalEdit(true)
                                handleOpenModal(_id)
                              }}>Edit</Button>
                              <Button variant='contained' sx={{ marginLeft: '5px' }} onClick={() => {
                                // handleDelete(memberId)
                                setConfirmPopup(true)
                                setMemberIdObj(_id)
                              }}>Remove</Button>
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
            count={memberList ? totalData : 0}
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
        (isModalOpen === true) &&
        <UserProfileModal
          isEdit={isModalEdit}
          memberId={selectedMemberId}
          isOpen={isModalOpen}
          onClose={(value) => closeModal(value)}
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
            setConfirmPopup(false)
            handleDelete(memberIdObj)
          }} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
