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
    Stack,
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
    CardMedia
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
//
const VideoPlayerModal = ({ videoUrl,isOpen, onClose,onCloseVideo }) => {
    //
    const dispatch = useDispatch();
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
                        <Typography>Video</Typography>
                    </Grid>
                    <CardMedia
                        sx={{ width: '100%', height: 400 }}
                        component='video'
                        image={`https://www.cashquiz.net/api/${videoUrl}`}
                        autoPlay
                    />
                    <Grid item xs={12} container spacing={1} justifyContent="flex-end">
                        <LoadingButton onClick={onCloseVideo} type="submit" variant="contained" color="primary">
                            Close
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};
export default VideoPlayerModal;
