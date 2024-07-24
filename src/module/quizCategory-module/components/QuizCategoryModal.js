/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// UserProfileModal.js
import React, { useEffect } from 'react';
import { Modal, Box, Button, Grid, TextField, CircularProgress } from '@mui/material';
import { Field, Form, Formik } from 'formik';
// import PersonIcon from '@mui/icons-material/Person';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  CREATE_QUIZ_CATEGORY_REQUEST,
  GET_QUIZ_CATEGORY_BY_ID_REQUEST,
  GET_QUIZ_CATEGORY_REQUEST,
  UPDATE_QUIZ_CATEGORY_BY_ID_REQUEST,
} from '../action/action';

const QuizCategoryModal = ({ isOpen, onClose, categoryId }) => {
  const { categoryData, isLoading } = useSelector((state) => state.quizCategoryModule);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });
  useEffect(() => {
    if (categoryId) {
      dispatch({
        type: GET_QUIZ_CATEGORY_BY_ID_REQUEST,
        payload: categoryId,
      });
    }
  }, [categoryId]);
  
  return (
    <Modal open={isOpen} onClose={onClose}>
      {isLoading ? ( // Display loader if isLoading is true
        <CircularProgress sx={{ margin: '50%' }} /> // Replace with your loader component
      ) : (
        <Formik
          initialValues={{
            name: categoryId ? categoryData?.name || '' : '', // Use categoryData for initial values
            description: categoryId ? categoryData?.description || '' : '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Determine whether it's an update by comparing initial values with current categoryData
            const isUpdating =
              categoryId &&
              (categoryData?.name !== values.name || categoryData?.description !== values.description);

            if (isUpdating) {
              // If it's an update, dispatch update action
              dispatch({
                type: UPDATE_QUIZ_CATEGORY_BY_ID_REQUEST,
                payload: {
                  categoryId,
                  name: values.name,
                  description: values.description,
                },
              });
            } else {
              // If it's not an update, dispatch create action
              dispatch({
                type: CREATE_QUIZ_CATEGORY_REQUEST,
                payload: {
                  name: values.name,
                  description: values.description,
                },
              });
            }

            // Close the modal after submitting
            onClose();

            // Reset form state
            setSubmitting(false);
            dispatch({
              type: GET_QUIZ_CATEGORY_REQUEST,
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
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Field
                      name="name"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Category Name"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="outlined-basic"
                          name="name"
                          onChange={handleChange}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="description"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Category Description"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="outlined-basic"
                          name="description"
                          onChange={handleChange}
                          // value={initialValues.description}
                          error={touched.description && Boolean(errors.description)}
                          helperText={touched.description && errors.description}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                    {categoryId ? 'Update' : 'Submit'}
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
  );
};

export default QuizCategoryModal;
