import LoginIcon from '@mui/icons-material/Login';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { navlinks } from '../../config/navlinks';
import useCurrentUser from '../../features/auth/hooks/useCurrentUser';
import useSignout from '../../features/auth/hooks/useSignout';
import AppButton from '../AppButton';
import AppLink from '../CustomLink';

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  menuLinks?: { label: string; to: string }[];
  logoutRedirectPath?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  open,
  onOpen,
  onClose,
  menuLinks = navlinks.userMenuLinks,
  logoutRedirectPath = '/',
}) => {
  const navigate = useNavigate();

  const { data: currentUser } = useCurrentUser();
  const { mutate: signout, isPending } = useSignout();

  const handleSignout = () => {
    onClose();
    signout(undefined, {
      onSuccess: () => {
        navigate(logoutRedirectPath);
      },
      onError: () => {
        console.log('signout error');
      },
    });
  };

  if (!currentUser) {
    return (
      <AppButton
        variant="contained"
        size="small"
        startIcon={<LoginIcon />}
        to="/signin"
        sx={{ ml: 1, px: 2 }}
      >
        <Typography sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
          Login
        </Typography>
      </AppButton>
    );
  }

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={onOpen} sx={{ p: 0 }}>
          <Avatar 
            alt={currentUser.name || 'User'} 
            sx={{ 
              bgcolor: 'primary.main',
              width: 36,
              height: 36,
            }}
          >
            {(currentUser.name || currentUser.email || 'U')[0].toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={onClose}
      >
        {menuLinks.map((item) => (
          <MenuItem key={item.label} onClick={onClose}>
            <AppLink width={100} sx={{ fontWeight: 500, fontSize: 16 }} to={item.to}>
              {item.label}
            </AppLink>
          </MenuItem>
        ))}
        <MenuItem onClick={handleSignout}>
          <Typography color="error" sx={{ fontWeight: 500, fontSize: 16 }}>
            Logout
          </Typography>
          {isPending && <CircularProgress sx={{ marginLeft: 1 }} size="1.2rem" />}
        </MenuItem>
      </Menu>
    </>
  );
};
