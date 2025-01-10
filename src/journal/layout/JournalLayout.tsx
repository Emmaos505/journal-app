import { Box } from "@mui/material"
import { ReactNode } from "react"
import { NavBar, SideBar } from "../components";



interface Props {
    children: ReactNode
}

const drawerWidth = 240;

const JournalLayout = ({ children }: Props) => {
    return (
        <Box sx={{ display: "flex" }} >
            {/* Navbar drawerWidth */}
            <NavBar drawerWidth={drawerWidth} />
            {/* Sidebar drawerWidth */}
            <SideBar drawerWidth={drawerWidth} />
            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}
            >
                {/* Toolbar */}
                {children}
            </Box>
        </Box>
    )
}
export default JournalLayout