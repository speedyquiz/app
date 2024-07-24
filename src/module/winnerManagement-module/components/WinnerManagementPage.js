/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import WinnerListToolbar from '../../../sections/@dashboard/winnerdata/WinnerListToolbar';
import Scrollbar from '../../../components/scrollbar';
import { UserListHead } from '../../../sections/@dashboard/user';
//
import { getWinnerQuizRequestData, getWinnerQuizByIDRequestData } from '../action/action';
import WinnerManagementModal from './WinnerManagementModal';
//
const TABLE_HEAD = [
  { id: 'quizTitle', label: 'Quiz Title', alignRight: false },
  { id: 'dateTime', label: 'Date / Time', alignRight: false },
  { id: 'jackpotprice', label: 'Prize', alignRight: false },
  // { id: 'wId', label: 'Winner Id', alignRight: false },
  // { id: 'wName', label: 'Winner Name', alignRight: false },
  { id: 'phone', label: 'Phone No', alignRight: false },
  { id: 'wName', label: 'Name', alignRight: false },
  { id: 'wUName', label: 'User Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false }

  // { id: 'action', label: 'Action', alignRight: false },
];
//
function descendingComparator(a, b, orderBy) {
  if (orderBy === 'quizTitle') {
    if (b.quizTitle.toLowerCase() < a.quizTitle.toLowerCase()) {
      return -1;
    }
    if (b.quizTitle.toLowerCase() > a.quizTitle.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  if (orderBy === 'dateTime') {
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

  // Default case, return 0 if orderBy is neither 'quizTitle' nor 'dateTime'.
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function WinnerManagementPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('dateTime');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quizWinnerData, setQuizWinnerData] = useState([]);
  const [isSortDone, setIsSortDone] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [sortField, setSortField] = useState('dateTime');
  const [sortOrder, setSortOrder] = useState('desc');
  const [templateId, setTemplateId] = useState('');
  //
  const handleRequestSort = (event, property) => {
    if (property === 'quizTitle') {
      setPage(0);
      if (templateId === '') {
        fetchAllWinnerData(1, (orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc', 'quizTitle')
      } else {
        fetchTemplateWinnerData(1, (orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc', 'quizTitle')
      }

    }
    if (property === 'dateTime') {
      setPage(0);
      if (templateId === '') {
        fetchAllWinnerData(1, (orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc', 'dateTime')
      } else {
        fetchTemplateWinnerData(1, (orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc', 'dateTime')
      }

    }
    // category
    //
    // setSortOrder((order === 'asc') ? 'desc' : 'asc')
    setOrder((orderBy === property) ? ((order === 'asc') ? 'desc' : 'asc') : 'desc');
    setOrderBy(property);
    //
  };
  //
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = quizWinnerData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  //
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (currentPage < (newPage + 1)) {
      setIsLoading(true)
      if (templateId === '') {
        fetchAllWinnerData((newPage + 1), sortOrder, sortField);
      } else {
        fetchTemplateWinnerData((newPage + 1), sortOrder, sortField)
      }
    }
  };
  //
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  //
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  //
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quizWinnerData.length) : 0;
  //
  useEffect(() => {
    setIsLoading(true)
    fetchAllWinnerData(currentPage, sortOrder, sortField)
    //
  }, []);// isSortDone
  //
  const fetchAllWinnerData = (pageNoVal, orderVal = 'desc', orderField = 'createdAt') => {
    dispatch(
      getWinnerQuizRequestData({
        reqData: {
          pageNo: pageNoVal,
          name: orderField,
          order: orderVal
        },
        onSuccessData: (responseData) => {
          setIsLoading(false)
          //
          setSortOrder(orderVal)
          setSortField(orderField)
          //
          if (pageNoVal === 1) {
            setTotalData(responseData.totalCount)
            setCurrentPage(pageNoVal)
            setQuizWinnerData(responseData.data);
          } else {
            setCurrentPage(pageNoVal)
            setQuizWinnerData([...quizWinnerData, ...responseData.data]);
          }
        },
        onErrorData: (error) => {
          setIsLoading(false)
        }
      })
    );
  }
  //
  const fetchTemplateWinnerData = (pageNoVal, orderVal = 'desc', orderField = 'createdAt', templateIds = "") => {

    dispatch(
      getWinnerQuizByIDRequestData({
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
            setQuizWinnerData(responseData.data);
          } else {
            setCurrentPage(pageNoVal)
            setQuizWinnerData([...quizWinnerData, ...responseData.data]);
          }
        },
        onErrorData: (error) => {
          setIsLoading(false)
        }
      })
    )
  }
  //
  return (
    <>
      <Helmet>
        <title> Winner Management | SpeedQuiz </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Winner Management
          </Typography>
        </Stack>
        <Card>
          <WinnerListToolbar
            numSelected={selected.length}
            onFilterName={handleFilterByName}
            onSelectQuizTemplate={(id) => {
              if (id === '-1') {

                setQuizWinnerData([])
                setIsSortDone(!isSortDone)
                setTemplateId('')
                fetchAllWinnerData(1, sortOrder, sortField)
              } else {
                setPage(0)
                setTemplateId(id)
                fetchTemplateWinnerData(1, sortOrder, sortField, id)
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
                  rowCount={quizWinnerData ? quizWinnerData.length : 0}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {isLoading ? (
                  null
                ) : (
                  (quizWinnerData.length === 0) ?
                    <DialogTitle style={{ alignSelf: '10%' }}>
                      {"No record found"}
                    </DialogTitle>
                    :
                    <>
                      <TableBody>
                        {quizWinnerData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const { _id = "", quizTitle = "", dateTime = "", category = "", winnerName = "", winnerEmail = "", winnerPhone = "", price = "", description = "", username = "" } = row;
                          const selectedUser = selected.indexOf(quizTitle) !== -1;
                          return (
                            <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>

                              <TableCell component="th" scope="row" padding="none">
                                <Typography variant="subtitle2" sx={{ marginLeft: "5%" }}>
                                  {quizTitle}
                                </Typography>
                              </TableCell>
                              <TableCell align="left">{dateTime}</TableCell>
                              <TableCell align="left">{`USD ${parseFloat(price).toFixed(2)}`}</TableCell>
                              <TableCell align="left">{winnerPhone}</TableCell>
                              <TableCell align="left">{winnerName}</TableCell>
                              <TableCell align="left">{username}</TableCell>
                              <TableCell align="left">{winnerEmail}</TableCell>

                              {/* <TableCell align="left">
                            <Button onClick={() => {
                              setSelectedId(row)
                              setTimeout(() => {
                                setModalOpen(true)
                              }, 100);
                            }} variant='contained'>View</Button>
                          </TableCell> */}
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={quizWinnerData ? totalData : 0}
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
      {
        isModalOpen &&
        <WinnerManagementModal
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