// @mui
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, Button, OutlinedInput, alpha, InputAdornment } from '@mui/material';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));
//
export default function ToolBar(props) {

    return (
        <>
            <StyledRoot
                sx={{
                    // color: 'primary.main',
                    // bgcolor: 'primary.lighter',
                }}
            >
                <Tooltip title="Add Faq">
                    <Button onClick={props.onClick} variant='contained'>
                        Add Faq
                        {/* <AddCircleIcon /> */}
                    </Button>
                </Tooltip>
            </StyledRoot>
        </>
    );
}
