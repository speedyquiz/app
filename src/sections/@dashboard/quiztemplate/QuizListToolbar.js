import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  alpha,
  InputAdornment,
} from '@mui/material';
// component
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import QuizTemplateModal from '../../../module/quizTemplateManagement-module/components/QuizTemplateModal';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

QuizListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function QuizListToolbar({ numSelected, filterName, onFilterName, onCategorySelect }) {
  const { categoryDataList } = useSelector((state) => state.quizCategoryModule);
  const [categoryList, setCategoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templateList, setTemplateList] = useState([
    {
      "_id": "-1",
      "name": "Select All",
      "description": "Select All",
      "isDeleted": false,
      "createdAt": "",
      "updatedAt": "",
      "__v": 0
    }
  ]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (categoryDataList !== null && categoryDataList !== undefined) {
      // setCategoryList(categoryDataList);
      setCategoryList([...templateList, ...categoryDataList]);
    }
  }, [categoryDataList]);
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
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder="Search Quiz Template..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Box sx={{ minWidth: 200, }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Quiz Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Quiz Template"
                  onChange={(event) => {
                    // alert(event.target.value)
                    onCategorySelect(event.target.value)
                  }}
                >
                  {categoryList.map((category) => (
                    <MenuItem
                      key={category._id}
                      value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <div>
              <Button onClick={() => openModal()} variant='contained'>
                Add Quiz Template
                {/* <AddCircleIcon /> */}
              </Button>
            </div>
            <QuizTemplateModal isOpen={isModalOpen} onClose={closeModal} />
          </>
        )}
      </StyledRoot>
    </>
  );
}
