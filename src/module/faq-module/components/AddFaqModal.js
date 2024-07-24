/* eslint-disable react/prop-types */
// UserProfileModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Grid, TextField, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
//
const AddFaqModal = (props) => {
    //
    const [question, setQuestion] = useState((Object.keys(props.selectedRow).length === 0) ? '' : props.selectedRow.question)
    const [answer, setAnswer] = useState((Object.keys(props.selectedRow).length === 0) ? '' : props.selectedRow.answer)
    // const [questionError,setQuestionError] = useState(false);
    // const [answerError,setAnswererror] = useState(false);
    //
    return (
        <Modal open={props.isOpen} onClose={props.onCancelModal}>
            <>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        p: 4,
                        width: 1000,
                    }}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                placeholder="Question"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                id="outlined-basic"
                                // name="Question"
                                error={props.questionError}
                                helperText={props.questionError && 'Please enter question'}
                                value={question}
                                onChange={(event)=>{
                                    setQuestion(event.target.value)
                                    props.onQuestionUpdate(event)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                placeholder="Answer"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                id="outlined-basic"
                                multiline
                                rows={5}
                                maxRows={8}
                                // name="Answer"
                                error={props.answerError}
                                helperText={props.answerError && 'Please enter answer'}
                                value={answer}
                                onChange={(event)=>{
                                    setAnswer(event.target.value)
                                    props.onAnswerUpdate(event)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton loading={props.isLoading} type="submit" variant="contained" color="primary" onClick={props.onSubmitData}>
                                {(Object.keys(props.selectedRow).length === 0) ? 'Submit' : 'Update'}
                            </LoadingButton>
                            <Button onClick={props.onCancelModal} variant="contained" sx={{ marginLeft: '10px' }}>
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </>
        </Modal>
    );
};

export default AddFaqModal;
