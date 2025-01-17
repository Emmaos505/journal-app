import { Google } from "@mui/icons-material"
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import AuthLayout from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { useMemo } from "react"

const initialState = {
    email: '',
    password: ''
}

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { status, errorMessage } = useSelector((state: any) => state.auth);
    const isChecking = useMemo(() => status === 'checking', [status]);
    const { onInputChange, email, password } = useForm(initialState);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(startLoginWithEmailPassword({ email, password }));
    };

    const onGoogleSubmit = () => {
        dispatch(startGoogleSignIn());
    }

    return (

        <AuthLayout title="Login">
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item
                        xs={12}
                        sx={{ mt: 2 }}
                    >
                        <TextField
                            onChange={onInputChange}
                            label="Correo"
                            type="email"
                            name="email"
                            value={email}
                            placeholder="correo@gmail.com"
                            fullWidth
                        >
                        </TextField>
                    </Grid>
                    <Grid item
                        xs={12}
                        sx={{ mt: 2 }}
                    >
                        <TextField
                            label="Contraseña"
                            onChange={onInputChange}
                            name="password"
                            value={password}
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                        >
                        </TextField>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12}>
                            <Alert severity="error" sx={{ display: errorMessage ? '' : 'none' }}>
                                {errorMessage}
                            </Alert>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button disabled={isChecking} type="submit" variant="contained" fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button disabled={isChecking} onClick={onGoogleSubmit} variant="contained" fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>
                                    Google
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent={'end'}>
                        <Grid item>
                            <Link
                                color='inherit'
                                to='/auth/register'
                                component={RouterLink}>
                                Crear una cuenta
                            </Link>
                        </Grid>
                    </Grid>

                </Grid>

            </form>
        </AuthLayout>
    )
}
export default LoginPage
