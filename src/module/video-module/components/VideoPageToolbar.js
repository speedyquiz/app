/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
    Toolbar,
    Tooltip,
    IconButton,
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
    Grid,
} from '@mui/material';
// component
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// ----------------------------------------------------------------------
const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));
//
VideoPageToolbar.propTypes = {
    numSelected: PropTypes.number,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
};

export default function VideoPageToolbar(props) {
    //
    const dispatch = useDispatch()
    //
    useEffect(() => {
    }, []);
    //
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploadQuestionFileOpen, setIsUploadQuestionFileOpen] = useState(false);
    //
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    //
    const closeQuestionFileModal = () => {
        setIsUploadQuestionFileOpen(false);
    };

    return (
        <>
            <StyledRoot
                sx={{ color: 'primary.main' }}>
                <div>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={12}>
                            <Button onClick={() => props.onBtnClick()} variant='contained'>
                                Upload Video
                                {/* <AddCircleIcon /> */}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </StyledRoot>
        </>
    );
}
