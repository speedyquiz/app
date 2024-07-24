import { Helmet } from 'react-helmet-async';
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  // Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  // IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
} from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import WinnerListToolbar from '../../../sections/@dashboard/winnerdata/WinnerListToolbar';
// import Label from '../components/label';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead } from '../../../sections/@dashboard/user';
// mock
// import WINNERLIST from '../../../_mock/winners';
import { GET_WINNER_DATA_BY_ID_REQUEST } from '../action/action';
// import UserProfileModal from './MemberProfileModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'User Name', alignRight: false },
  { id: 'dateandtime', label: 'Date / Time', alignRight: false },
  { id: 'score', label: 'Score', alignRight: false },
  { id: 'country', label: 'country', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b.dateandtime.toLowerCase() < a.dateandtime.toLowerCase()) {
    return -1;
  }
  if (b.dateandtime.toLowerCase() > a.dateandtime.toLowerCase()) {
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

  const filteredArray = array.filter(
    (_user) => _user.username && _user.username.toLowerCase().includes(query.toLowerCase())
  );

  return filteredArray.sort(comparator);
}
export default function WinnerManagementPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('username');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { quizTemplateDataById, isLoading } = useSelector((state) => state.winnerManagementModule);
  const [winnerData, setWinnerData] = useState();
  const [winnerDataList, setWinnerDataList] = useState([]);
  //
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = winnerDataList.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - winnerDataList.length) : 0;


  // const winnerDataList = applySortFilter(winnerDataListTemp, getComparator(order, orderBy), filterName);
  // const filteredUsers = applySortFilter(winnerDataList, getComparator(order, orderBy), filterName);

  // const isNotFound = !filteredUsers.length && !!filterName;
  const dispatch = useDispatch();
  const handleQuizTemplateSelect = (selectedValue) => {
    if (selectedValue) {
      dispatch({
        type: GET_WINNER_DATA_BY_ID_REQUEST,
        payload: selectedValue,
      });
    }
  };
  useEffect(() => {
    if (quizTemplateDataById !== null && quizTemplateDataById !== undefined) {
      setWinnerData(quizTemplateDataById);
      const winnerTempData = quizTemplateDataById?.player?.map((user) => ({
        username: user.playerName,
        dateandtime: user.playerTime,
        score: user.playerScore,
        country: user.country,
        userId: user.id,
      }));
      //
      setWinnerDataList(applySortFilter(winnerTempData, getComparator(order, orderBy), filterName));
    }
  }, [quizTemplateDataById]);
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
            // filterName={filterName}
            onFilterName={handleFilterByName}
            onSelectQuizTemplate={handleQuizTemplateSelect}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={winnerDataList ? winnerDataList.length : 0}
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
                    {winnerDataList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { userId, username, dateandtime, score, country } = row;
                      // const selectedUser = selected.indexOf(username) !== -1;
                      const selectedUser = selected.indexOf(username) !== -1;
                      return (
                        <TableRow hover key={userId} tabIndex={-1} role="checkbox" selected={selectedUser}>
                          <TableCell component="th" scope="row" padding="none">
                            <Typography variant="subtitle2" sx={{ marginLeft: "5%" }}>
                              {username}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{dateandtime}</TableCell>
                          <TableCell align="left">{score}</TableCell>
                          <TableCell align="left">{country}</TableCell>
                          <TableCell align="left">
                            <Button>Edit</Button>
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
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={winnerDataList ? winnerDataList.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
