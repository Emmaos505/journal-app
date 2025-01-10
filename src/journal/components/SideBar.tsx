import { TurnedInNot } from "@mui/icons-material";
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"

interface Props {
    drawerWidth?: number;
}

const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
]

export const SideBar = ({ drawerWidth = 240 }: Props) => {
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>
                        Emmanuel Otero
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {
                        months.map(month => (
                            <ListItem key={month} disablePadding >
                                <ListItemButton >
                                    <ListItemIcon>
                                        <TurnedInNot></TurnedInNot>
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={month} />
                                        <ListItemText secondary={'Descripcion del dato introducido en la base de datos'} />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}