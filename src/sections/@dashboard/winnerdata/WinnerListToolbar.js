/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
// component
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useRef, useState } from 'react';
// import QuizCategoryModal from '../../../pages/QuizCategoryModal';
import { getQuizWinnerTemplateData } from 'src/module/winnerManagement-module/action/action';
import { GET_QUIZ_CATEGORY_REQUEST } from 'src/module/quizCategory-module/action/action';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
//   width: 240,
//   transition: theme.transitions.create(['box-shadow', 'width'], {
//     easing: theme.transitions.easing.easeInOut,
//     duration: theme.transitions.duration.shorter,
//   }),
//   '&.Mui-focused': {
//     width: 320,
//     boxShadow: theme.customShadows.z8,
//   },
//   '& fieldset': {
//     borderWidth: `1px !important`,
//     borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
//   },
// }));

// ----------------------------------------------------------------------

WinnerListToolbar.propTypes = {
  numSelected: PropTypes.number,
  onSelectQuizTemplate: PropTypes.func,
  // onFilterName: PropTypes.func,
};

export default function WinnerListToolbar({ numSelected, onSelectQuizTemplate }) {
  //
  const dispatch = useDispatch();
  const [templateList, setTemplateList] = useState([
    {
      "_id": "-1",
      "title": "Select All",
      "category": "",
      "description": "",
      "userLimit": "",
      "price": "",
      "jackpotPercentage": "",
      "noOfQuestions": "",
      "timeInSeconds": "",
      "createdAt": "",
      "updatedAt": "",
      "__v": 0,
      "points": 0,
      "isDeleted": false,
      "image": ""
    }
  ]);
  const [selectedQuizTemplate, setSelectedQuizTemplate] = useState('');
  //
  useEffect(() => {
    dispatch(
      getQuizWinnerTemplateData({
        reqData: {},
        onSuccessData: (responseData) => {
          
          setTemplateList([...templateList,...responseData])
        },
        onErrorData: (error) => {

        }
      })
    )
  }, [])
  //
  // const { quizDataList } = useSelector((state) => state.winnerManagementModule);
  // const [quizTemplate, setQuizTemplate] = useState([]);
  // //
  // const { categoryDataList } = useSelector((state) => state.quizCategoryModule);
  // const [categoryList, setCategoryList] = useState([]);
  // //
  // const userId = localStorage.getItem('userId');
  // useEffect(() => {
  //   if (userId) {
  //     dispatch({
  //       type: GET_QUIZ_CATEGORY_REQUEST,
  //     });
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   if (categoryDataList !== null && categoryDataList !== undefined) {
  //     setCategoryList(categoryDataList);
  //   }
  // }, [categoryDataList]);

  // const [selectedQuizTemplate, setSelectedQuizTemplate] = useState(''); // State to store the selected value
  // const initialRender = useRef(true);
  // Event handler to update the selected value
  // const handleQuizTemplateChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setSelectedQuizTemplate(selectedValue);

  //   // Pass the selected value to the parent component
  //   onSelectQuizTemplate(selectedValue);
  // };
  // useEffect(() => {
  //   if (userId) {
  //     dispatch({
  //       type: GET_QUIZ_DATA_REQUEST,
  //     });
  //   }
  // }, [dispatch, userId]);
  //
  // useEffect(() => {
  //   if (quizDataList !== null && quizDataList !== undefined) {
  //     setQuizTemplate(quizDataList);

  //     // Set the default option only during the initial render
  //     if (initialRender.current && quizDataList.length > 0) {
  //       setSelectedQuizTemplate(quizDataList[0]._id);
  //       onSelectQuizTemplate(quizDataList[0]._id);
  //       initialRender.current = false;
  //     }
  //   }
  // }, [quizDataList, onSelectQuizTemplate]);
  return (
    <>
      <StyledRoot
        sx={{
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          null
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Quiz Template</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Quiz Template"
                  value={selectedQuizTemplate}
                  onChange={(event) => {
                    setSelectedQuizTemplate(event.target.value);
                    onSelectQuizTemplate(event.target.value)
                  }}
                >
                  {templateList.map((quiz) => (
                    <MenuItem key={quiz._id} value={quiz._id}>
                      {quiz.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        )}
      </StyledRoot>
    </>
  );
}
