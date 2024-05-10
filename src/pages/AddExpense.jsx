import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const navigate = useNavigate();

    const categories = ['Entertainment', 'Food', 'Market', 'Other'];

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new expense object
        const newExpense = {
            id: Date.now(),
            name: expenseName,
            amount,
            category,
        };

        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        navigate('/');
    };

    return (
        <Box sx={{ mt: 8, mx: 'auto', width: '90%', maxWidth: 500 }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Expense Name"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Amount (MDL)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Save Expense
                </Button>
            </form>
        </Box>
    );
};

export default AddExpense;
