import { Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import Cookies from 'js-cookie'
import { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export const Login = ({ setAuth }) => {
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleUserLogin = (event) => {
        setUserLogin(event.target.value)
    }

    const handleUserPassword = (event) => {
        setUserPassword(event.target.value)
    }

    const handleClick = () => {
        const login = Cookies.get('login')
        const password = Cookies.get('password')
        if (login === userLogin && password === userPassword) {
            setAuth(true)
            Cookies.set("user", "loginTrue")
        } else {
            alert('wrong login or password')
        }
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Login"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={userLogin}
                            onChange={handleUserLogin}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={userPassword}
                            onChange={handleUserPassword}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClick}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}