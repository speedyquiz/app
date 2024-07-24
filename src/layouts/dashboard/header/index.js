import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';

// import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const userName = localStorage.getItem('userName')
  const handleLogout  = () =>{
    // localStorage.clear();
    setTimeout(()=>{
      localStorage.clear();
    },[5]);
  }
  return (
    <StyledRoot>
      <StyledToolbar>
        {/* <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton> */}

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />
        <div className="Navbar">
          <span style={{ color: 'black', marginRight: '20px', marginBottom: '10px' }}>{userName}</span>
          <Button component={Link} to="/" onClick={handleLogout}>
            <LogoutIcon sx={{ color: 'black' }} />
          </Button>
        </div>
        {/* <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack> */}
      </StyledToolbar>
    </StyledRoot>
  );
}
