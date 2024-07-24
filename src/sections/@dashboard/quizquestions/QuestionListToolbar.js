/* eslint-disable import/no-unresolved */
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
  alpha,
  OutlinedInput,
  InputAdornment,
  Grid,
} from '@mui/material';
// component
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PublishIcon from '@mui/icons-material/Publish';
import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from 'react';
import UploadQuestionFile from 'src/module/quizQuestionManagement-module/components/UploadQuestionFile';
import { useSelector, useDispatch } from 'react-redux';
import AddQuestionModal from '../../../module/quizQuestionManagement-module/components/AddQuestionModal';
import Iconify from '../../../components/iconify';
import { getDownloadFileByCategoryData } from '../../../module/quizQuestionManagement-module/action/action';
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 400,
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

QuestionListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function QuestionListToolbar({ numSelected, quizCategoryList, filterName, onFilterName, onCategorySelect, onClickuploadFile, onClickAddQuestion }) {
  // const [templateData, setTemplateData] = useState([]);
  // const { quizTempateData } = useSelector((state) => state.quizTemplateManagementModule);
  // const { categoryDataList } = useSelector((state) => state.quizCategoryModule);
  const dispatch = useDispatch()
  //
  const [exportLink, setExportLink] = useState('');
  const [categoryList, setCategoryList] = useState([
    { "_id": "-1", "name": "Select All", "description": "Select All", "isDeleted": false, "createdAt": "2023-09-04T13:35:42.585Z", "updatedAt": "2023-09-07T10:51:55.006Z", "__v": 0 }
  ]);
  //
  useEffect(() => {
    setCategoryList([...categoryList, ...quizCategoryList]);
  }, [quizCategoryList]);
  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadQuestionFileOpen, setIsUploadQuestionFileOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  //
  const closeQuestionFileModal = () => {
    setIsUploadQuestionFileOpen(false);
  };

  const fetchExportFileById = (categoryId) => {
    dispatch(
      getDownloadFileByCategoryData({
        reqData: {
          catId: categoryId
        },
        onSuccessData: (responseData) => {
          setExportLink(responseData.url)
        },
        onErrorData: (error) => {
          setExportLink('')
        }
      })
    )
  }

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
            placeholder="Search Question..."
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
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Quiz Category"
                  onChange={(event) => {
                    onCategorySelect(event.target.value)
                    setTimeout(() => {
                      fetchExportFileById(event.target.value)
                    }, 1000)

                    // setSelectedQuizTemplate(event.target.value);
                    // onSelectQuizTemplate(event.target.value)
                  }}>
                  {/* {templateData.map((template) => (
                    <MenuItem key={template._id} value={template._id}>
                      {template.title}
                    </MenuItem>
                  ))} */}
                  {categoryList.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <div>
              <Grid container rowSpacing={1}>
                <Grid item xs={6}>
                  <Button onClick={() => { onClickAddQuestion() }} variant='contained'>
                    Add Question
                    {/* <AddCircleIcon /> */}
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button onClick={() => {
                    // Check if exportLink is present before triggering the download
                    if (exportLink) {
                      // Extract the file name from the exportLink URL
                      const fileName = exportLink.substring(exportLink.lastIndexOf('/') + 1);

                      // Create a hidden anchor element
                      const downloadLink = document.createElement('a');
                      downloadLink.href = exportLink;
                      downloadLink.target = '_blank'; // Open in a new tab/window if needed
                      downloadLink.download = fileName; // Use the extracted file name

                      // Trigger a click event on the anchor element to start the download
                      document.body.appendChild(downloadLink);
                      downloadLink.click();
                      document.body.removeChild(downloadLink);
                    }
                  }}
                    disabled={!exportLink}
                  >
                    <DownloadIcon />
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button onClick={() => { onClickuploadFile() }}>
                    <PublishIcon />
                  </Button>
                </Grid>
              </Grid>
            </div>
            {/* <AddQuestionModal isOpen={isModalOpen} onClose={closeModal} /> */}
            {/* <UploadQuestionFile isOpen={isUploadQuestionFileOpen} onClose={closeQuestionFileModal} /> */}
          </>
        )}
      </StyledRoot>
    </>
  );
}
