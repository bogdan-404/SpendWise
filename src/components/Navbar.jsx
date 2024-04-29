import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../ThemeContext';

function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        SpendWise
                    </Link>
                </Typography>
                <Link to="/statistics" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 10 }}>
                    Statistics
                </Link>
                <IconButton color="inherit" onClick={toggleTheme}>
                    {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;