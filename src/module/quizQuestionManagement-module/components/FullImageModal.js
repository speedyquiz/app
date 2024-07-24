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
//
const FullImageModal = ({ isOpen, onClose, imageURL }) => {
    //
    const dispatch = useDispatch();
    //
    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        p: 4,
                    }}
                >
                    <Box
                        component="img"
                        sx={{ height: "auto", width: "auto" }}
                        alt="The house from the offer."
                        src={`${imageURL}`} />
                </Box>
            </Modal>
        </>
    );
};

export default FullImageModal;
