import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Icon for the dark mode switch
import LightModeIcon from '@mui/icons-material/LightMode'; // Icon for the light mode switch

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        // Here you can also implement the actual theme change logic
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        SpendWise
                    </Link>
                </Typography>
                <Button color="inherit" component={Link} to="/statistics">
                    Statistics
                </Button>
                <IconButton color="inherit" onClick={toggleTheme}>
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;