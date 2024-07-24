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
import { useState } from 'react';
// import QuizCategoryModal from '../../../pages/QuizCategoryModal';
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

PayoutListToolbar.propTypes = {
  numSelected: PropTypes.number,
  // filterName: PropTypes.string,
  // onFilterName: PropTypes.func,
};

export default function PayoutListToolbar(props) {
  const [quizTemplate, setQuizTemplate] = useState('');

  const handleChange = (event) => {
    setQuizTemplate(event.target.value);
    props.onChange(event.target.value);
  };
  return (
    <>
      <StyledRoot>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quiz Template</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quizTemplate}
              label="Quiz Template"
              onChange={handleChange}>
              {props.templateData.map((templateData) => (
                <MenuItem key={templateData._id} value={templateData._id}>
                  {templateData.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </StyledRoot>
    </>
  );
}
