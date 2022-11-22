import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const analysisAndStatisticsPages = {
  'page1': 'Статистика і аналітика по роботі окремих модулів',
  'page2': 'Статистика по оремому користувачу',
  'reportingsystem': 'Система звітів по наданій допомозі',
  'page4': 'Збір програмної статистики',
  'page5': 'Система формування фінансових звітів',
  'page6': 'Система аналізу розвитку та проблем',
};

const pages = {
  'page7': 'Information',
  'page8': 'Сommunication',
  'page9': 'User Account',
  'page10': 'Formation a package of help'
};

export const MainHeader = ({ setAuth, }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAuth(false)
    Cookies.remove("user")
  }

  const handleClick = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleClickPage = (page) => {
    navigate(`/${page}`)
  }

  return (
    <div className='Header'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            iZvit
          </Typography>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            iZvit
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={handleClick}
            >
              Analysis And Statistics
            </Button>
            <Menu
              placement="bottom-start"
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {Object.entries(analysisAndStatisticsPages).map(page => (
                <MenuItem key={page[0]} onClick={() => handleClickPage(page[0])} value={page[0]}>{page[1]}</MenuItem>
              ))}
            </Menu>
            {Object.entries(pages).map((page) => (
              <Button
                key={page[0]}
                onClick={() => handleClickPage(page[0])}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page[1]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </div >
  );
}