/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// UserProfileModal.js
import React, { useEffect,useState } from 'react';
import { Modal, Box, Button, Grid, TextField, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Field, Form, Formik } from 'formik';
// import PersonIcon from '@mui/icons-material/Person';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
    updatePointDataReq
} from '../action/action';

const PointPageModal = ({ isOpen, onClose, categoryId, updatePoint }) => {
    //
    const dispatch = useDispatch();
    const [checkLoader, setCheckLoader] = useState(false);
    //
    const validationSchema = Yup.object({
        point: Yup.string().required('Required'),
    });
    useEffect(() => {
        
    }, []);



    return (
        <Modal open={isOpen} onClose={onClose}>

            <Formik
                initialValues={{
                    point: updatePoint[categoryId.key]
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setCheckLoader(true)
                    dispatch(
                        updatePointDataReq({
                            reqData: {
                                "signup": (categoryId.key === 'signup') ? values.point : updatePoint.signup,
                                "profile_image": (categoryId.key === 'profile_image') ? values.point : updatePoint.profile_image,
                                "bank_account": (categoryId.key === 'bank_account') ? values.point : updatePoint.bank_account,
                                "profile_completion": (categoryId.key === 'profile_completion') ? values.point : updatePoint.profile_completion,
                                "watching_ads": (categoryId.key === 'watching_ads') ? values.point : updatePoint.watching_ads,
                                "winning_quiz": (categoryId.key === 'winning_quiz') ? values.point : updatePoint.winning_quiz,
                                "correct_all_answers": (categoryId.key === 'correct_all_answers') ? values.point : updatePoint.correct_all_answers
                            },
                            onSuccessData: (responseData) => {
                                setCheckLoader(false)
                                onClose()
                                console.log('====================================');
                                console.log(JSON.stringify(responseData.data));
                                console.log('====================================');

                            },
                            onErrorData: (error) => {
                                setCheckLoader(false)
                                console.log('====================================');
                                console.log(JSON.stringify(error));
                                console.log('====================================');
                            }
                        })
                    )
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
                                                label="Point Type"
                                                inputProps={{ readOnly: true }}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                id="outlined-basic"
                                                name="name"
                                                value={categoryId.title}
                                                contentEditable={false}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="point"
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Point Value"
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                id="outlined-basic"
                                                name="point"
                                                onChange={handleChange}
                                                error={touched.description && Boolean(errors.description)}
                                                helperText={touched.description && errors.description}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton loading={checkLoader}  type="submit" variant="contained" color="primary">
                                        {'Update'}
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

        </Modal>
    );
};

export default PointPageModal;
