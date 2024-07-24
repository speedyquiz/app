import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography } from '@mui/material';
// component
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
//   width: 240,
//   transition: theme.transitions.create(['box-shadow', 'width'], {
//     easing: theme.transitions.easing.easeInOut,
//     duration: theme.transitions.duration.shorter,
//   }),
//   '&.Mui-focused': {
//     width: 320,
//     boxShadow: theme.customShadows.z8,
//   },
//   '& fieldset': {
//     borderWidth: `1px !important`,
//     borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
//   },
// }));

// ----------------------------------------------------------------------

AccountToolbar.propTypes = {
  numSelected: PropTypes.number,
  // filterName: PropTypes.string,
  // onFilterName: PropTypes.func,
};

export default function AccountToolbar({ numSelected }) {
  return (
    <>
      <StyledRoot
        sx={{
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography>Account</Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )}
      </StyledRoot>
    </>
  );
}
