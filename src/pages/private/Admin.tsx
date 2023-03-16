import { Box, Stack, Button, Menu, Divider, ListItemIcon, MenuItem, Avatar, Tooltip, Typography, IconButton } 
from "@mui/material";
import { Fragment, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { ClientCrud } from "../../components/Cruds/ClientCrud";
import { CourseCrud } from "../../components/Cruds/CourseCrud";
import { PublicRoutes } from "../../models/routes";

type Props = {
    children: JSX.Element | JSX.Element[]
}

export const AdminNav:React.FC<Props> = ({children}) => {
    const [visibility, setvisibility] = useState("hidden");
    const [left, setleft] = useState("-200px");
    const [paddingleft, setPaddingLeft] = useState("20px");

    const handleMenu = () => {
        if (visibility !== "hidden") {
            setvisibility("hidden");
            setleft("-200px");
            setPaddingLeft("20px");
        }
        else {
            setvisibility("visible");
            setleft("0px");
            setPaddingLeft("220px");
        }

    }
    const dashboard = {
        top: "0px",
        left: "0px",
        background: "white",
        width: "100%",
        height: "100%"
    }

    const leftbar = {
        position: "fixed",
        visibility: visibility,
        top: "0px",
        left: left,
        paddingTop: "70px",
        width: "200px",
        height: "100%",
        zIndex: "0",
        transition: "all 0.1s"
    }
    const topbar = {
        position: "fixed",
        zIndex: "10",
        width: "100%",
        height: "70px",
        top: "0px",
        right: "17px",
        transition: "all 0.1s"
    }
    const viewport = {
        background: "white",
        overflowY: "auto",
        overflowX: "hidden",
        width: "100%",
        height: "100%",
        transition: "all 0.1s"
    }
    const content = {
        marginTop: "70px"
    }
    const btnitemmenu = { 
        justifyContent: 'flex-start', 
        color: "black", 
        borderRadius: "0px",
        width: "200px"
    }
    return (
        <Box sx={dashboard}>
            <Box sx={leftbar}>
                <Stack sx={{ height: "100%" }}>
                    <NavLink to="client">
                        <Button sx={btnitemmenu}>Client</Button>
                    </NavLink>
                    <Button sx={btnitemmenu}>Home</Button>
                </Stack>
                <Box sx={{ bottom: 0, position: "absolute", left: 0, widht: "200px" }}>
                        <Link to={"/" + PublicRoutes.LANDING}>
                            <Button sx={btnitemmenu}>About</Button>
                        </Link>
                </Box>
            </Box>
            <Box sx={viewport}>
                <Stack direction="row" sx={topbar}>
                    <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: 70, background: "rgb(140,140,140, 0.6)", backdropFilter: "blur(10px)", boxShadow: "0px 0px 15px rgb(0,0,0,0.2)" }}>
                        <Box>
                            <Stack direction="row">
                                <Button sx={{ width: "70px", height: "70px" }} onClick={() => handleMenu()}>
                                    <i className="bi bi-list" style={{ fontSize: "24px" }}></i>
                                </Button>
                                <Typography sx={{ paddingLeft: "20px", fontWeight: "bold", color: "rgb(250,250,250)" }} variant="h6">DCLICENSE</Typography>
                            </Stack>
                            <Box sx={{ position: "absolute", right: 0, top: 0 }}>
                                <AccountMenu />
                            </Box>
                        </Box>
                    </Box>
                </Stack>
                <Box sx={content}>
                    <Box sx={{paddingLeft: paddingleft, paddingTop: "20px", paddingButtom: "20px", paddingRight: "20px", transition: "all 0.1s"}}>
                        {children}
                    </Box>                    
                </Box>
            </Box>
        </Box>
    )
}


export const Admin = () => {
    return (
            <AdminNav>
                <Routes>
                    <Route path="client/*" element={<ClientCrud/>}/>
                </Routes>   
            </AdminNav>
    )
}

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Fragment>
    );
}
