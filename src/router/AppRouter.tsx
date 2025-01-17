import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthRoutes from "../auth/routes/AuthRoutes"
import JournalRoutes from "../journal/routes/JournalRoutes"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { CheckingAuth } from "../ui/components";

const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, (user) => {
            if (!user) {
                return dispatch(logout({ payload: null }));
            }
            return dispatch(login(user))
        });

    }, [])


    const { status } = useSelector((state: any) => state.auth);

    if (status === 'checking') return <CheckingAuth />

    return (
        <BrowserRouter>
            <Routes>
                {status === 'authenticated' ? <Route path="/*" element={<JournalRoutes />} /> : <Route path="/auth/*" element={<AuthRoutes />} />}

                {/* <Route path="/*" element={<Navigate to={'/auth/login'} />} /> */}
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter