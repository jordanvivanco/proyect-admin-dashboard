import {
    Box,
    Button,
    Stack,
    Divider,
    Avatar,
    IconButton,
    Badge,
    Tooltip,
    Menu,
    MenuItem,
    ListItemText,
    ListItemIcon,
    InputBase
} from "@mui/material";
import { useState, Fragment } from "react";
import { styled } from '@mui/material/styles';

type Props = {
    actions: string[];
}

export const AppBar: React.FC<Props> = ({ actions }) => {

    const [WidthMenu, setWidthMenu] = useState("200px")

    const menu = {
        position: "absolute",
        top: 0,
        left: 0,
        width: WidthMenu,
        height: "100%",
        background: "white",
        overflow: "hidden",
        boxShadow: "0px 0px 20px rgb(0,0,0,0.1)",
        transition: "all 0.1s"
    }

    const btnaction = {
        width: "100%",
        height: "50px",
        textAlign: "left",
        borderRadius: "0px",
        justifyContent: "flex-start",
        background: "white",
        color: "black",
        paddingLeft: "70px",
        "&:hover": {
            background: "black",
            color: "white"
        }
    }

    return (
        <Box sx={menu}>
            <Stack>
                <Box sx={{height: "70px", width: "200px"}}></Box>
                <Button sx={btnaction} onClick={() => setWidthMenu(WidthMenu !== "200px" ? "200px" : "70px")}>Menu</Button>
                <Divider />
                {
                    actions.map((action: string) => (
                        <Button sx={btnaction}>{action}</Button>
                    ))
                }
            </Stack>
        </Box>
    )
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

type PropsUpBar = {
    children: JSX.Element | JSX.Element[]
}

export const UpBar: React.FC<PropsUpBar> = ({children}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const upbar = {
        position: "absolute",
        zIndex: "20",
        left: 0,
        top: 0,
        width: "100%",
        height: "70px",
        background: "white",
        boxShadow: "0px 0px 10px rgb(0,0,0,0.1)"
    }
    const btnmenu = {
        width: "70px",
        height: "70px",
    }

    const logo = {
        position: "absolute", 
        left: 70, 
        top: 0, 
        width: "100px", 
        height: "70px", 
        background: "black"
    }
    const search = {
        position: "absolute", 
        top: 15, 
        left: 180, 
        height: 70, 
        width: "40%"
    }
    const inputsearch = {
        width: "100%", 
        height: "40px", 
        border: "solid 1px black", 
        borderRadius: "25px", 
        paddingLeft: "20px", 
        fontSize: "14px"
    }
    const menu = {
        position: "absolute", 
        top: 10, 
        right: 10, 
        height: 70
    }
    const iconbtn = {
        width: "50px", 
        height: "50px"
    }
    return (
        <Fragment>
            <Box sx={upbar}>
                <Box>
                    <Button sx={btnmenu}>
                        <i className="bi bi-list" style={{ fontSize: "24px" }}></i>
                    </Button>
                </Box>
                <Box sx={logo}>
                </Box>
                <Box sx={search}>
                    <InputBase placeholder="Search..." sx={inputsearch}></InputBase>
                </Box>
                <Box sx={menu}>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={1}>
                        <Tooltip title="Chat">
                            <IconButton size="small" sx={iconbtn}>
                                <i className="bi bi-chat" style={{ color: "black", fontSize: "18px" }}></i>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Notification">
                            <IconButton size="small" sx={iconbtn}>
                                <i className="bi bi-bell" style={{ color: "black", fontSize: "18px" }}></i>
                            </IconButton>
                        </Tooltip>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot">
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </IconButton>
                            </Tooltip>

                        </StyledBadge>
                    </Stack>
                </Box>
            </Box>
            <Box sx={{position: "absolute", left: 0, top: 0, height: "100%", width: "200px", zIndex: "0"}}>
                {children}
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
                        overflowX: 'visible',
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
                <MenuItem onClick={() => handleClose()}>
                    <ListItemIcon>
                        <i className="bi bi-person-circle"></i>
                    </ListItemIcon>
                    <ListItemText>
                        My account
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <i className="bi bi-gear-fill"></i>
                    </ListItemIcon>
                    <ListItemText>
                        Settings
                    </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <i className="bi bi-box-arrow-right"></i>
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

