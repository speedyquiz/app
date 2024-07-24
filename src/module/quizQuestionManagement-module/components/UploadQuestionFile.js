/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// UserProfileModal.js
import React, { useState, useEffect } from 'react';
// import { Modal, Box, Button, Typography, Grid, c, Input } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Modal,
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
  Paper,
  Input,
  TextField,
  Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { UPLOAD_EXCEL_FILE_REQUEST, uploadQuestionByCategoryData, uploadMultipleImageForCategory } from '../action/action';
//
const UploadQuestionFile = ({ isOpen, onClose, quizCategoryList }) => {
  //
  const [selectedFile, setSelectedFile] = useState(null);
  const [isselectFile, setIsSelectFile] = useState(false);
  const dispatch = useDispatch();
  //
  // const { categoryDataList } = useSelector((state) => state.quizCategoryModule);
  // const [categoryList, setCategoryList] = useState([]);
  const [multipleImageFile, setMultipleImageFile] = useState([]);
  const [selectCategoryId, setSelectCategoryId] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isUploadSelect, setIsUploadSelect] = useState(false);
  const [questionTypes, setQuestionType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  //
  useEffect(() => {
    // if (categoryDataList !== null && categoryDataList !== undefined) {
    //   setCategoryList([...categoryList, ...categoryDataList]);
    // }
  }, [])
  //
  const handleFileDrop = (e) => {
    if (selectCategoryId !== '') {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setIsSelectFile(true)
    }
  };
  //
  const handleFileInputChange = (e) => {
    if (selectCategoryId !== '') {
      const file = e.target.files[0];
      setSelectedFile(file);
      setIsSelectFile(true)
    }
  };
  //
  const uploadMultipleImages = () => {
    setLoading(true)
    //
    const formData = new FormData();
    for (let i = 0; i < multipleImageFile.length; i += 1) {
      formData.append('images', multipleImageFile[i]);
    }
    //
    dispatch(uploadMultipleImageForCategory({
      reqData: {
        catId: selectCategoryId,
        data: formData
      },
      onSuccessData: (responseData) => {
        console.log('====================================');
        console.log(JSON.stringify(responseData));
        console.log('====================================');
        setLoading(false)
        onClose()
      },
      onErrorData: (error) => {
        console.log('====================================');
        console.log(JSON.stringify(error));
        console.log('====================================');
        setLoading(false)
        onClose()
      }
    }))
    // setTimeout(() => {
    //   setLoading(false)
    //   onClose()
    // }, 15000)
  }
  //
  const uploadQuestionUsingFile = () => {
    if (selectedFile) {
      setLoading(true)
      //
      const formData = new FormData();
      formData.append('excelFile', selectedFile);
      formData.append('category', selectCategoryId);
      //
      dispatch(
        uploadQuestionByCategoryData({
          reqData: formData,
          onSuccessData: (responseData) => {

          },
          onErrorData: (error) => {
            alert('File Formate is not supported!')
            setLoading(false)
            onClose()
          }
        })
      )

      setTimeout(() => {
        setLoading(false)
        onClose()
      }, 15000)
    }

  }
  //
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          p: 4,
          width: 700,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {
              questionTypes === '' ?
                <Typography>Upload Section</Typography>
                :
                questionTypes === 'file' ?
                  <Typography>Upload Excel File</Typography>
                  :
                  <Typography>Upload Multiple Images</Typography>
            }
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-type">Select Quiz Type</InputLabel>
              <Select labelId="demo-simple-select-label-type" id="demo-simple-select-type" label="Quiz Type"
                onChange={(event) => {
                  alert(event.target.value)
                }}>
                {[{ text: "Image", value: "image" }, { text: "Text", value: "text" }].map((questionType) => (
                  <MenuItem key={questionType._id} value={questionType._id}>
                    {questionType.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-type">Select Quiz Type</InputLabel>
              <Select
                labelId="demo-simple-select-label-type"
                id="demo-simple-select-type"
                label="value"
                value={questionTypes}
                onChange={(event) => {
                  if (event.target.value === 'text') {
                    setImageUrl('')
                  }
                  setQuestionType(event.target.value)
                }}>
                {
                  [{ name: "Image", value: "image", id: "image" }, { name: "File", value: "file", id: "file" }].map((questionType) => (
                    <MenuItem key={questionType.id} value={questionType.id}>
                      {questionType.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Quiz Category</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Quiz Category"
                onChange={(event) => {
                  setSelectCategoryId(event.target.value)
                  setIsUploadSelect(true)
                }}>
                {quizCategoryList.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {
            (questionTypes === 'file') &&
            <Grid item xs={12}>
              <Paper
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                sx={{
                  padding: '20px',
                  border: '2px dashed #ccc',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                {selectedFile ? (
                  <Typography>Selected File: {selectedFile.name}</Typography>
                ) : (
                  <Typography>Drag & Drop or Click to Upload</Typography>
                )}
                <Input
                  type="file"
                  accept=".xlsx, .xls"
                  id="file-input"
                  onChange={handleFileInputChange}
                  sx={{ display: 'none' }}
                  inputProps={{ tabIndex: -1 }} // This hides the default browser focus indicator
                />
                {
                  isUploadSelect ?
                    <label htmlFor="file-input">
                      <Button variant="contained" color="primary" component="span">
                        Browse
                      </Button>
                    </label>
                    :
                    <Button disabled variant="contained" color="primary" component="span">
                      Browse
                    </Button>
                }
              </Paper>
            </Grid>
          }
          {
            (questionTypes === 'image') &&
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                // label="Outlined"
                variant="outlined"
                accept="image/*"
                type="file"
                inputProps={{
                  multiple: true
                }}
                onChange={(event) => {
                  if (selectCategoryId !== '') {
                    setIsSelectFile(true)
                  }
                  console.log('====================================');
                  console.log(JSON.stringify(event.target.files));
                  console.log(JSON.stringify(event.target.files.length));
                  setMultipleImageFile(event.target.files);
                  console.log('====================================');
                }}
              />
            </Grid>
          }
          <Grid item xs={12}>
            {
              questionTypes === 'file' &&
              <LoadingButton onClick={uploadQuestionUsingFile} disabled={!isselectFile} loading={isLoading} type="submit" variant="contained" color="primary">
                upload
              </LoadingButton>
            }
            {
              questionTypes === 'image' &&
              <LoadingButton onClick={uploadMultipleImages} disabled={!isselectFile} loading={isLoading} type="submit" variant="contained" color="primary">
                upload
              </LoadingButton>
            }
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default UploadQuestionFile;
