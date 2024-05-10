// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Icon for dark theme
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Icon for light theme
import { useTheme } from '../ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <AppBar position="static" style={{ backgroundColor: '#192936' }}>
            <Toolbar>
                <Typography variant="h6" component="div" style={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                        SpendWise
                    </Link>
                </Typography>
                    <Link to="/statistics" style={{ textDecoration: 'none', color: 'inherit', marginRight: 15 }}>
                        Statistics
                    </Link>
                <IconButton onClick={toggleTheme} color="inherit">
                    {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;


