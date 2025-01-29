import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthRoutes from "../auth/routes/AuthRoutes"
import JournalRoutes from "../journal/routes/JournalRoutes"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { CheckingAuth } from "../ui/components";
import { AppDispatch, AppStore } from "../store";
import { startLoadingNotes } from "../store/journal";

const AppRouter = () => {

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, (user) => {
            if (!user) {
                return dispatch(logout({ payload: null }));
            }
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }))
            dispatch(startLoadingNotes(uid))
        });

    }, [])


    const { status } = useSelector((state: AppStore) => state.auth);

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