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
import { createCarouselImageReq } from '../action/action';
//
const UploadCarouselImageModal = (props) => {
    //

    const dispatch = useDispatch();
    const [multipleImageFile, setMultipleImageFile] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isUploadSelect, setIsUploadSelect] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isselectFile, setIsSelectFile] = useState(false);
    const [link, setLink] = useState('')
    //
    useEffect(() => {

    }, [])
    //
    const handleFileDrop = (e) => {

        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        setIsSelectFile(true)

    };
    //
    const handleFileInputChange = (e) => {

        const file = e.target.files[0];
        setSelectedFile(file);
        setIsSelectFile(true)

    };
    //
    const uploadMultipleImages = () => {
        //
        setLoading(true)
        //
        const formData = new FormData();
        for (let i = 0; i < multipleImageFile.length; i += 1) {
            formData.append('images', multipleImageFile[i]);
        }
        formData.append('url', link);
        //
        dispatch(
            createCarouselImageReq({
                reqData: formData,
                onSuccessData: (responseData) => {
                    props.onCancelClick()
                    setLoading(false)
                },
                onErrorData: (error) => {
                    props.onCancelClick()
                    setLoading(false)
                }
            })
        )
        //
    }
    //
    return (
        <Modal
            open={props.isOpen}
            onClose={props.onCancelClick}
        >
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
                        <Typography>Add Multiple Images</Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: '20px' }}>
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
                                if (event.target.files.length === 0) {
                                    setIsSelectFile(false)
                                } else {
                                    setIsSelectFile(true)
                                }
                                setMultipleImageFile(event.target.files);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Add Link"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            id="outlined-basic"
                            name="link"
                            onChange={(event) => {
                                console.log(event.target.value);
                                setLink(event.target.value)
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: '20px' }}>
                        <LoadingButton
                            onClick={uploadMultipleImages}
                            disabled={!isselectFile}
                            loading={isLoading}
                            type="submit"
                            variant="contained"
                            color="primary">
                            upload
                        </LoadingButton>
                        <LoadingButton
                            sx={{ marginLeft: '10px' }}
                            onClick={props.onCancelClick}
                            //  disabled={!isselectFile}
                            // loading={isLoading}
                            type="submit"
                            variant="contained"
                            color="primary">
                            Cancel
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};
export default UploadCarouselImageModal;
