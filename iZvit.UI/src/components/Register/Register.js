import { Box, Button, Container, createTheme, CssBaseline, TextField, ThemeProvider } from '@mui/material';
import Cookies from "js-cookie";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = (event) => {
        setLogin(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleClick = (e) => {
        if (login.length && password.length) {
            Cookies.set("login", login)
            Cookies.set("password", password)
            navigate('/')
        } else {
            e.preventDefault()
            alert('wrong login or password')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    
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
                            value={login}
                            onChange={handleLogin}
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
                            value={password}
                            onChange={handlePassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClick}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Register