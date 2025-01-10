import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthRoutes from "../auth/routes/AuthRoutes"
import JournalRoutes from "../journal/routes/JournalRoutes"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={<AuthRoutes />} />
                <Route path="/" element={<JournalRoutes />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter