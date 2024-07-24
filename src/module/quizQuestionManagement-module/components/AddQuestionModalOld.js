/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// UserProfileModal.js
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
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
  CircularProgress,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GET_QUIZ_CATEGORY_REQUEST } from 'src/module/quizCategory-module/action/action';
import {
  CREATE_QUIZ_QUESTION_REQUEST,
  GET_QUIZ_QUESTION_BY_ID_REQUEST,
  GET_QUIZ_QUESTION_REQUEST,
  UPDATE_QUIZ_QUESTION_BY_ID_REQUEST,
} from '../action/action';

const AddQuestionModal = ({ questionId, isOpen, onClose }) => {
  const { categoryDataList } = useSelector((state) => state.quizCategoryModule);
  const { questionData, isLoading } = useSelector((state) => state.quizQuestionManagementModule);

  const [categoryList, setCategoryList] = useState([]);

  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (questionId) {
      dispatch({
        type: GET_QUIZ_QUESTION_BY_ID_REQUEST,
        payload: questionId,
      });
    }
  }, [questionId]);
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

  const validationSchema = Yup.object({
    question: Yup.string().required('Required'),
    rightOption: Yup.string().required('Option1 Required'),
    wrongOption1: Yup.string().required('Option2 Required'),
    wrongOption2: Yup.string().required('Option3 Required'),
    wrongOption3: Yup.string().required('Option4 Required'),
  });

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        {isLoading ? ( // Display loader if isLoading is true
          <CircularProgress sx={{ margin: '50%' }} /> // Replace with your loader component
        ) : (
          <Formik
            initialValues={{
              category: questionId ? questionData?.category || '' : '',
              question: questionId ? questionData?.question || '' : '',
              rightOption: questionId ? questionData?.rightOption || '' : '',
              wrongOption1: questionId ? questionData?.wrongOption1 || '' : '',
              wrongOption2: questionId ? questionData?.wrongOption2 || '' : '',
              wrongOption3: questionId ? questionData?.wrongOption3 || '' : '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Determine whether it's an update by comparing initial values with current categoryData
              const isUpdating =
                questionId &&
                (questionData?.category !== values.category ||
                  questionData?.question !== values.question ||
                  questionData?.rightOption !== values.rightOption ||
                  questionData?.wrongOption1 !== values.wrongOption1 ||
                  questionData?.wrongOption2 !== values.wrongOption2 ||
                  questionData?.wrongOption3 !== values.wrongOption3);

              if (isUpdating) {
                // If it's an update, dispatch update action
                dispatch({
                  type: UPDATE_QUIZ_QUESTION_BY_ID_REQUEST,
                  payload: {
                    questionId,
                    question: values.question,
                    category: values.category,
                    rightOption: values.rightOption,
                    wrongOption1: values.wrongOption1,
                    wrongOption2: values.wrongOption2,
                    wrongOption3: values.wrongOption3,
                  },
                });
              } else {
                // If it's not an update, dispatch create action
                dispatch({
                  type: CREATE_QUIZ_QUESTION_REQUEST,
                  payload: {
                    question: values.question,
                    category: values.category,
                    rightOption: values.rightOption,
                    wrongOption1: values.wrongOption1,
                    wrongOption2: values.wrongOption2,
                    wrongOption3: values.wrongOption3,
                  },
                });
              }

              // Close the modal after submitting
              onClose();

              // Reset form state
              setSubmitting(false);
              dispatch({
                type: GET_QUIZ_QUESTION_REQUEST,
              });
            }}
          >
            {({ errors, touched, handleChange }) => (
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
                <Form>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography>Add Questions</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Field
                          name="category"
                          render={({ field }) => (
                            <FormControl fullWidth>
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
                            </FormControl>
                          )}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="question"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Add Question"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            id="outlined-basic"
                            name="question"
                            onChange={handleChange}
                            error={touched.question && Boolean(errors.question)}
                            helperText={touched.question && errors.question}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="rightOption"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Option 1[right option]"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            id="outlined-basic"
                            name="rightOption"
                            onChange={handleChange}
                            error={touched.rightOption && Boolean(errors.rightOption)}
                            helperText={touched.rightOption && errors.rightOption}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="wrongOption1"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Option 2"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            id="outlined-basic"
                            name="wrongOption1"
                            onChange={handleChange}
                            error={touched.wrongOption1 && Boolean(errors.wrongOption1)}
                            helperText={touched.wrongOption1 && errors.wrongOption1}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="wrongOption2"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Option 3"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            id="outlined-basic"
                            name="wrongOption2"
                            onChange={handleChange}
                            error={touched.wrongOption2 && Boolean(errors.wrongOption2)}
                            helperText={touched.wrongOption2 && errors.wrongOption2}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="wrongOption3"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Option 4"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            id="outlined-basic"
                            name="wrongOption3"
                            onChange={handleChange}
                            error={touched.wrongOption3 && Boolean(errors.wrongOption3)}
                            helperText={touched.wrongOption3 && errors.wrongOption3}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        {questionId ? 'Update' : 'Submit'}
                      </Button>
                      <Button onClick={onClose} variant="contained" sx={{marginLeft:'10px'}}>
                        Close
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Box>
            )}
          </Formik>
        )}
      </Modal>
    </>
  );
};

export default AddQuestionModal;
