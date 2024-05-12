import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    const navigate = useNavigate();

    const categories = ['Entertainment', 'Food', 'Market', 'Other'];
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newExpense = {
            id: Date.now(),
            name: expenseName,
            amount,
            category,
            date: new Date().toISOString()
        };

        const currentExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const updatedExpenses = [...currentExpenses, newExpense];
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        navigate('/');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <Box sx={{ mt: 8, mx: 'auto', width: '90%', maxWidth: 500 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Expense Name"
                            value={expenseName}
                            onChange={(e) => setExpenseName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Amount (MDL)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            fullWidth
                            required

                        />
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth >
                            <InputLabel sx={{ color: 'var(--text-color)'}}>Month</InputLabel>
                            <Select
                                value={month}
                                label="Month"
                                onChange={(e) => setMonth(e.target.value)}
                                sx={{ color: 'var(--text-color)'}}
                            >
                                {months.map((m) => (
                                    <MenuItem key={m} value={m}>
                                        {m}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: 'var(--text-color)'}}>Category</InputLabel>
                            <Select
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                sx={{ color: 'var(--text-color)'}}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" fullWidth onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" fullWidth>
                            Save Expense
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddExpense;
