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
import { uploadVideoDataReq, updateVideoDataReq } from '../action/action';
//
const UploadVideoModal = ({ isOpen, onClose, videoList }) => {
    //
    const dispatch = useDispatch();
    //
    const [selectedFile, setSelectedFile] = useState(null);
    const [isselectFile, setIsSelectFile] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isUploadSelect, setIsUploadSelect] = useState(false);
    const [videoNames, setVideoNames] = useState('');
    //
    useEffect(() => {
        if (videoList.length > 0) {
            const videoName = videoList[0].url.split('/')
            setVideoNames(videoName[videoName.length - 1])
            setSelectedFile(videoList[0].url);
            // setIsSelectFile(true)
        }
    }, [])
    //
    const handleFileDrop = (e) => {
        // if (selectCategoryId !== '') {
        setVideoNames('')
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        setIsSelectFile(true)
        // }
    };
    //
    const handleFileInputChange = (e) => {
        // if (selectCategoryId !== '') {
        setVideoNames('')
        const file = e.target.files[0];
        setSelectedFile(file);
        setIsSelectFile(true)
        // }
    };
    //
    const uploadQuestionUsingFile = () => {
        if (selectedFile) {
            setLoading(true)
            //
            const formData = new FormData();
            formData.append('video', selectedFile);
            // formData.append('category', selectCategoryId);
            //
            dispatch(
                uploadVideoDataReq({
                    reqData: {
                        data: formData
                    },
                    onSuccessData: (responseData) => {

                    },
                    onErrorData: (error) => {
                        alert('Video Formate is not supported!')
                        setLoading(false)
                        onClose()
                    }
                })
            )

            setTimeout(() => {
                setLoading(false)
                onClose()
            }, 20000)
        }

    }
    //
    const updateVideoFilesById = () => {
        if (selectedFile) {
            setLoading(true)
            //
            const formData = new FormData();
            formData.append('video', selectedFile);
            // formData.append('category', selectCategoryId);
            //
            dispatch(
                updateVideoDataReq({
                    reqData: {
                        video_id: videoList[0]._id,
                        data: formData
                    },
                    onSuccessData: (responseData) => {

                    },
                    onErrorData: (error) => {
                        alert('Video Formate is not supported!')
                        setLoading(false)
                        onClose()
                    }
                })
            )

            setTimeout(() => {
                setLoading(false)
                onClose()
            }, 20000)
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
                        <Typography>Upload Video File</Typography>
                    </Grid>
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
                            {selectedFile ?
                                (videoNames === '') ?
                                    (
                                        <Typography>Selected File: {selectedFile.name}</Typography>
                                    ) :
                                    (
                                        <Typography>Selected File: {videoNames}</Typography>
                                    )
                                : (
                                    <Typography>Drag & Drop or Click to Upload</Typography>
                                )}
                            <Input
                                type="file"
                                // accept=".xlsx, .xls"
                                id="file-input"
                                onChange={handleFileInputChange}
                                sx={{ display: 'none' }}
                                inputProps={{ tabIndex: -1 }} // This hides the default browser focus indicator
                            />
                            {
                                !isUploadSelect ?
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
                    <Grid item xs={12}>
                        <LoadingButton onClick={() => {
                            if (videoList.length === 0) {
                                uploadQuestionUsingFile()
                            } else {
                                updateVideoFilesById()
                            }
                        }} disabled={!isselectFile} loading={isLoading} type="submit" variant="contained" color="primary">
                            upload
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};
export default UploadVideoModal;
