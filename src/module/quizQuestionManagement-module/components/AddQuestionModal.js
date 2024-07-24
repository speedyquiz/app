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
    Input
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GET_QUIZ_CATEGORY_REQUEST } from 'src/module/quizCategory-module/action/action';
import {
    CREATE_QUIZ_QUESTION_REQUEST,
    GET_QUIZ_QUESTION_BY_ID_REQUEST,
    GET_QUIZ_QUESTION_REQUEST,
    UPDATE_QUIZ_QUESTION_BY_ID_REQUEST,
    updateQuestionByIdData,
    addNewQuestionByIdData
} from '../action/action';

const AddQuestionModal = ({ isFromEdit, questionId, isOpen, onClose }) => {
    //
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    //
    const { categoryDataList } = useSelector((state) => state.quizCategoryModule);
    const [categoryList, setCategoryList] = useState([]);
    const [questionData, setQuestionData] = useState(questionId);
    const [isLoading, setIsLoading] = useState(false);
    const [questionTypes, setQuestionType] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImagefile] = useState('');
    const [isCheckLoader, setIsCheckLoader] = useState(false);
    const [isFormBtnDisable, setIsFormBtnDisable] = useState(false);
    //
    const validationSchema = Yup.object({
        // question: Yup.string().required('Required'),
        rightOption: Yup.string().required('Option1 Required'),
        wrongOption1: Yup.string().required('Option2 Required'),
        wrongOption2: Yup.string().required('Option3 Required'),
        wrongOption3: Yup.string().required('Option4 Required'),
    });
    //
    useEffect(() => {
        if (categoryDataList !== null && categoryDataList !== undefined) {
            setCategoryList([...categoryList, ...categoryDataList]);
        }
        if (isFromEdit) {
            setQuestionType(questionData?.type.toLowerCase())
            setImageUrl(`https://www.cashquiz.net/api/${questionData?.question}`)
            setImagefile(`https://www.cashquiz.net/api/${questionData?.question}`)
        } else {
            setQuestionType('text')
        }

    }, []);
    //
    const updateQuestionData = (reqeustData) => {
        //
        dispatch(updateQuestionByIdData({
            reqData: reqeustData,
            onSuccessData: (responsesData) => {
                onClose()
            },
            onErrorData: (onError) => {

            }
        }))
        //
    }
    //
    const addQuestionUploadData = (reqeustData) => {
        //
        dispatch(addNewQuestionByIdData({
            reqData: reqeustData,
            onSuccessData: (responsesData) => {
                // alert('test')
                onClose()
            },
            onErrorData: (onError) => {
                // alert('test2')
            }
        }))
        //
    }
    //
    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
                {isLoading ? ( // Display loader if isLoading is true
                    <CircularProgress sx={{ margin: '50%' }} /> // Replace with your loader component
                ) : (
                    <Formik
                        initialValues={{
                            questionType: isFromEdit ? questionData?.type : "text",
                            category: isFromEdit ? questionData?.category : '',
                            question: isFromEdit ? questionData?.question : '',
                            rightOption: isFromEdit ? questionData?.rightOption : '',
                            wrongOption1: isFromEdit ? questionData?.wrongOption1 : '',
                            wrongOption2: isFromEdit ? questionData?.wrongOption2 : '',
                            wrongOption3: isFromEdit ? questionData?.wrongOption3 : '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            // Determine whether it's an update by comparing initial values with current categoryData
                            // Close the modal after submitting
                            //
                            console.log('====================================');
                            console.log(JSON.stringify(values.questionType));
                            console.log('====================================');


                            if (values.questionType.toLowerCase() === 'text') {
                                if (values.question && values.category && values.rightOption && values.wrongOption1 && values.wrongOption2 && values.wrongOption3) {
                                    setIsCheckLoader(true)
                                }
                            }
                            if (values.questionType.toLowerCase() === 'image') {
                                if (imageUrl && values.category && values.rightOption && values.wrongOption1 && values.wrongOption2 && values.wrongOption3) {
                                    setIsCheckLoader(true)
                                }
                            }
                            // const updatedData = {
                            // values.questionType
                            //     "question": values.question,
                            //     "category": values.category,
                            //     "rightOption": values.rightOption,
                            //     "wrongOption1": values.wrongOption1,
                            //     "wrongOption2": values.wrongOption2,
                            //     "wrongOption3": values.wrongOption3
                            // }
                            //
                            const formData = new FormData();
                            if ((values.questionType.toLowerCase() === 'image')) {
                                formData.append('question', imageFile);
                                formData.append('type', "Image");
                            } else {
                                formData.append('question', values.question);
                                formData.append('type', "Text");
                            }
                            formData.append('category', values.category);
                            formData.append('rightOption', values.rightOption);
                            formData.append('wrongOption1', values.wrongOption1);
                            formData.append('wrongOption2', values.wrongOption2);
                            formData.append('wrongOption3', values.wrongOption3);

                            //
                            if (isFromEdit) {
                                updateQuestionData({
                                    questionId: questionData._id,
                                    categoryId: values.category,
                                    data: formData
                                })
                            } else {
                                addQuestionUploadData({
                                    categoryId: values.category,
                                    data: formData
                                })
                            }
                        }}
                    >
                        {({ errors, touched, handleChange, setFieldValue }) => (
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
                                            <Field
                                                name="questionType"
                                                render={({ field }) => (
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label-type">Select Quiz Type</InputLabel>
                                                        <Select
                                                            {...field}
                                                            labelId="demo-simple-select-label-type"
                                                            id="demo-simple-select-type"
                                                            label="value"
                                                            value={questionTypes}
                                                            onChange={(event) => {
                                                                if (event.target.value === 'text') {
                                                                    setImageUrl('')
                                                                    setImagefile('')
                                                                }
                                                                setQuestionType(event.target.value)
                                                                setFieldValue("questionType", event.target.value);

                                                            }}>
                                                            {
                                                                [{ name: "Image", value: "image", id: "image" }, { name: "Text", value: "text", id: "text" }].map((questionType) => (
                                                                    <MenuItem key={questionType.id} value={questionType.id}>
                                                                        {questionType.name}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            />
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
                                            {
                                                (questionTypes.toLowerCase() === "image") ?
                                                    <>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            id="file-input"
                                                            name="image" // Ensure the name attribute is set to "image"
                                                            onChange={(event) => {
                                                                setImagefile(event.target.files[0])
                                                                setImageUrl(URL.createObjectURL(event.target.files[0]))
                                                            }}
                                                        />
                                                        {
                                                            imageUrl &&
                                                            <Box
                                                                component="img"
                                                                sx={{
                                                                    height: 180,
                                                                    width: 300,
                                                                    maxHeight: { xs: 188, md: 100 },
                                                                    maxWidth: { xs: 300, md: 200 },
                                                                }}
                                                                alt="The house from the offer."
                                                                src={imageUrl} />
                                                        }
                                                    </>
                                                    :
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
                                            }
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
                                            {/* <Button type="submit" variant="contained" color="primary">
                                                {questionId ? 'Update' : 'Submit'}
                                            </Button> */}
                                            <LoadingButton loading={isCheckLoader} type="submit" variant="contained" color="primary">
                                                {questionId ? 'Update' : 'Submit'}
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
                )}
            </Modal>
        </>
    );
};

export default AddQuestionModal;
