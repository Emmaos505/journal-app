import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import AuthLayout from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useMemo, useState } from "react"
import { AppDispatch } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { startUserAndEmailSignIn } from "../../store/auth"

const formData = {
    displayName: '',
    email: '',
    password: ''
}

const formErrorData = {
    displayName: 'El nombre es requerido',
    email: 'Correo invalido',
    password: 'La contraseña debe tener al menos 6 caracteres'
}

const formValidations: Record<string, [(value: string) => boolean, string]> = {
    displayName: [(value) => value.length > 0, 'El nombre es requerido'],
    email: [(value) => value.includes('@'), 'Correo inválido'],
    password: [(value) => value.length > 5, 'La contraseña debe tener al menos 6 caracteres']
}

const RegisterPage = () => {

    const { status, errorMessage } = useSelector((state: any) => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
    const dispatch = useDispatch<AppDispatch>();
    const [formIsSubmit, setFormIsSubmit] = useState(false);

    const { displayName, email, password, onInputChange, isFormValid, formErrors } = useForm(formData, formValidations, formErrorData);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormIsSubmit(true);
        if (!isFormValid) return;
        dispatch(startUserAndEmailSignIn({ displayName, email, password }));
        console.log({ email, displayName, password });
    }

    return (

        <AuthLayout title="Register">
            <form onSubmit={onSubmit} >
                <Grid container>
                    <Grid item
                        xs={12}
                        sx={{ mt: 2 }}
                    >
                        <TextField
                            name="displayName"
                            onChange={onInputChange}
                            value={displayName}
                            label="Nombre completo"
                            type="text"
                            placeholder="Nombre Apellido"
                            error={!!formErrors['displayName'] && formIsSubmit}
                            helperText={formErrors['displayName']}
                            fullWidth
                        >
                        </TextField>
                    </Grid>
                    <Grid item
                        xs={12}
                        sx={{ mt: 2 }}
                    >
                        <TextField
                            name="email"
                            onChange={onInputChange}
                            value={email}
                            label="Correo"
                            type="email"
                            placeholder="correo@gmail.com"
                            error={!!formErrors['email'] && formIsSubmit}
                            helperText={formErrors['email']}
                            fullWidth
                        >
                        </TextField>
                    </Grid>
                    <Grid item
                        xs={12}
                        sx={{ mt: 2 }}
                    >
                        <TextField
                            name="password"
                            onChange={onInputChange}
                            value={password}
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            error={!!formErrors['password'] && formIsSubmit}
                            helperText={formErrors['password']}
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
                        <Grid item xs={12}>
                            <Button disabled={isCheckingAuthentication} type="submit" variant="contained" fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent={'end'}>

                        <Typography sx={{ mr: 1 }} >
                            ¿Ya tienes una cuenta?
                        </Typography>
                        <Link
                            color='inherit'
                            to='/auth/login'
                            component={RouterLink}>
                            Ingresar
                        </Link>

                    </Grid>

                </Grid>

            </form>
        </AuthLayout>
    )
}
export default RegisterPage