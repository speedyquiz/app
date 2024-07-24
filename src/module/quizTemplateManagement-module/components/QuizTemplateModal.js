/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
// UserProfileModal.js
import React from 'react';
import {
  Modal,
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Input,
  CircularProgress,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { GET_QUIZ_CATEGORY_REQUEST } from 'src/module/quizCategory-module/action/action';
import {
  CREATE_QUIZ_TEMPLATE_REQUEST,
  GET_QUIZ_TEMPLATE_BY_ID_REQUEST,
  GET_QUIZ_TEMPLATE_REQUEST,
  UPDATE_QUIZ_TEMPLATE_BY_ID_REQUEST,
  updateQuizTemplateData,
  createQuizTemplateData
} from '../action/action';

const QuizTemplateModal = ({ isOpen, onClose, templateId, selectedQuizTemplateData }) => {
  const { categoryDataList } = useSelector((state) => state.quizCategoryModule);
  const { templateData, isLoading } = useSelector((state) => state.quizTemplateManagementModule);

  const [categoryList, setCategoryList] = useState([]);
  const [checkLoader, setCheckLoader] = useState(false);
  const [createImage, setCreateImage] = useState('');
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    if (userId) {
      dispatch({
        type: GET_QUIZ_CATEGORY_REQUEST,
      });
    }
  }, [dispatch, userId]);
  useEffect(() => {
    if (categoryDataList !== null && categoryDataList !== undefined) {
      setCategoryList(categoryDataList);
    }
  }, [categoryDataList]);
  //
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is Required'),
    category: Yup.string().required('Category is Required'),
    description: Yup.string().required('Description is Required'),
    image: Yup.mixed().required('Image is Required'),
    userLimit: Yup.string().required('Price Money is Required'),
    price: Yup.string().required('Price Money is Required'),
    jackpotPercentage: Yup.string().required('Jackpot Percentage is Required'),
    noOfQuestions: Yup.string().required('No Of Question is Required'),
    timeInSeconds: Yup.string().required('Total Time is Required'),
    points: Yup.string().required('Points is Required'),
  });
  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Formik
          initialValues={{
            title: templateId ? selectedQuizTemplateData?.title || '' : '',
            category: templateId ? selectedQuizTemplateData?.category || '' : '',
            description: templateId ? selectedQuizTemplateData?.description || '' : '',
            image: templateId ? selectedQuizTemplateData?.image || '' : '',
            userLimit: 99999,// templateId ? templateData?.userLimit || '' : '',
            price: templateId ? selectedQuizTemplateData?.price || '' : '',
            jackpotPercentage: templateId ? selectedQuizTemplateData?.jackpotPercentage || '' : '',
            noOfQuestions: templateId ? selectedQuizTemplateData?.noOfQuestions || '' : '',
            timeInSeconds: templateId ? selectedQuizTemplateData?.timeInSeconds || '' : '',
            points: templateId ? selectedQuizTemplateData?.points || '' : '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const image = typeof values.image === 'string' ? values.image : String(values.image);
            const points = typeof values.points === 'string' ? values.points : String(values.points);
            setCheckLoader(true)
            // const formData = {
            //   title: values.title,
            //   category: values.category,
            //   description: values.description,
            //   image,
            //   userLimit: 99999,// values.userLimit,
            //   price: values.price,
            //   jackpotPercentage: values.jackpotPercentage,
            //   noOfQuestions: values.noOfQuestions,
            //   timeInSeconds: values.timeInSeconds,
            //   points,
            // };
            const isUpdating =
              templateId &&
              (templateData?.title !== values.title ||
                templateData?.category !== values.category ||
                templateData?.description !== values.description ||
                templateData?.image !== values.image ||
                templateData?.userLimit !== values.userLimit ||
                templateData?.price !== values.price ||
                templateData?.jackpotPercentage !== values.jackpotPercentage ||
                templateData?.noOfQuestions !== values.noOfQuestions ||
                templateData?.timeInSeconds !== values.timeInSeconds ||
                templateData?.points !== values.points);

            if (isUpdating) {
              // If it's an update, dispatch update action
              // dispatch({
              //   type: UPDATE_QUIZ_TEMPLATE_BY_ID_REQUEST,
              //   payload: {
              //     id: templateId,
              //     formData,
              //   },
              // });
              const bodyFormData = new FormData();
              //
              bodyFormData.append('title', values.title);
              bodyFormData.append('category', values.category);// yyyy-mm-dd
              bodyFormData.append('description', values.description);
              bodyFormData.append('userLimit', 99999);
              bodyFormData.append('price', values.price);
              bodyFormData.append('points', points);
              bodyFormData.append('jackpotPercentage', values.jackpotPercentage);
              bodyFormData.append('noOfQuestions', values.noOfQuestions);
              bodyFormData.append('timeInSeconds', values.timeInSeconds);
              bodyFormData.append("image", values.image)
              //
              dispatch(
                updateQuizTemplateData({
                  reqData: {
                    'templateId': templateId,
                    'formData': bodyFormData
                  },
                  onSuccessData: (responseData) => {
                    setCheckLoader(false)
                    // onClose();
                    onClose()
                  },
                  onErrorData: (error) => {
                    setCheckLoader(false)
                    onClose()
                  }
                })
              )
            } else {
              //
              const formData = new FormData();
              //

              formData.append('title', values.title);
              formData.append('category', values.category);// yyyy-mm-dd
              formData.append('description', values.description);
              formData.append('userLimit', 99999);
              formData.append('price', values.price);
              formData.append('points', points);
              formData.append('jackpotPercentage', values.jackpotPercentage);
              formData.append('noOfQuestions', values.noOfQuestions);
              formData.append('timeInSeconds', values.timeInSeconds);
              formData.append("image", values.image)
              //
              formData.forEach((value, key) => {
                console.log("key %s: value %s", key, value);
              })
              //
              dispatch(
                createQuizTemplateData({
                  reqData: formData,
                  onSuccessData: (responseData) => {
                    setCheckLoader(false)
                    onClose()
                    // onClose();
                  },
                  onErrorData: (error) => {
                    setCheckLoader(false)
                    onClose()
                  }
                })
              )
            }

            // Close the modal after submitting
            // Reset form state
            setSubmitting(false);
            dispatch({
              type: GET_QUIZ_TEMPLATE_REQUEST,
            });
          }}
        >
          {({ errors, touched, setFieldValue, handleChange }) => (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'white',
                p: 4,
                width: 700,
                maxHeight: 600, // Set the maximum height here
                overflowY: 'auto', // Enable vertical scrolling when content exceeds maxHeight
              }}
            >
              <Form>
                <Grid container spacing={1}>
                  <Typography>Quiz Template</Typography>
                  <Grid item xs={12}>
                    <Field
                      name="title"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Quiz Title"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="outlined-basic"
                          name="title"
                          onChange={handleChange}
                          error={touched.title && Boolean(errors.title)}
                          helperText={touched.title && errors.title}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Field
                        name="category"
                        render={({ field }) => (
                          <FormControl fullWidth error={touched.category && Boolean(errors.category)}>
                            <InputLabel id="demo-simple-select-label">Select Quiz Category</InputLabel>
                            <Select
                              {...field}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Quiz Template"
                            >
                              {categoryList.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                  {category.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.category && errors.category && (
                              <FormHelperText>{errors.category}</FormHelperText>
                            )}
                          </FormControl>
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="description"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Description"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="outlined-basic"
                          name="description"
                          onChange={handleChange}
                          error={touched.description && Boolean(errors.description)}
                          helperText={touched.description && errors.description}
                        />
                      )}
                    />
                    {/* <TextField label="Description" variant="outlined" fullWidth /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="image"
                      render={({ field }) => (
                        <div>
                          {/* <label htmlFor="image">Image</label> */}
                          <input
                            type="file"
                            id="image"
                            name="image" // Ensure the name attribute is set to "image"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              console.log(file);

                              if (file) {
                                setFieldValue('image', file);
                                setCreateImage(file)
                              }
                              // const file = e.target.files[0];
                              // // Use setFieldValue to update the Formik field value
                              // console.log('====================================');
                              // console.log(JSON.stringify(e.target.files));
                              // console.log('====================================');
                              // setFieldValue('image', file);
                            }}
                            onBlur={field.onBlur}
                          />
                          {touched.image && errors.image && <div className="error">{errors.image}</div>}
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="price"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Prize Money"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="outlined-basic"
                          name="price"
                          onChange={handleChange}
                          error={touched.price && Boolean(errors.price)}
                          helperText={touched.price && errors.price}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="jackpotPercentage"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Jackpot Percentage"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="outlined-basic"
                          name="jackpotPercentage"
                          onChange={handleChange}
                          error={touched.jackpotPercentage && Boolean(errors.jackpotPercentage)}
                          helperText={touched.jackpotPercentage && errors.jackpotPercentage}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="noOfQuestions"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="No of questions"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="outlined-basic"
                          name="noOfQuestions"
                          onChange={handleChange}
                          error={touched.noOfQuestions && Boolean(errors.noOfQuestions)}
                          helperText={touched.noOfQuestions && errors.noOfQuestions}
                        />
                      )}
                    />
                    {/* <TextField label="No of questions" variant="outlined" fullWidth /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="timeInSeconds"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Total Time"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="outlined-basic"
                          name="timeInSeconds"
                          onChange={handleChange}
                          error={touched.timeInSeconds && Boolean(errors.timeInSeconds)}
                          helperText={touched.timeInSeconds && errors.timeInSeconds}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="points"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Points"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="outlined-basic"
                          name="points"
                          onChange={handleChange}
                          error={touched.points && Boolean(errors.points)}
                          helperText={touched.points && errors.points}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton loading={checkLoader} type="submit" variant="contained" color="primary">
                      {templateId ? 'Update' : 'Submit'}
                    </LoadingButton>
                    <Button onClick={onClose} variant="contained" sx={{ marginLeft: '10px' }}>
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          )}
        </Formik>
        {/* //)} */}
      </Modal >
    </>
  );
};

export default QuizTemplateModal;
