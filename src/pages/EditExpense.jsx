import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditExpense = () => {
    const [expense, setExpense] = useState({ name: '', amount: '', category: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const existingExpense = expenses.find(exp => exp.id === parseInt(id));
        if (existingExpense) {
            setExpense(existingExpense);
        }
    }, [id]);

    const handleInputChange = (e, field) => {
        setExpense({ ...expense, [field]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const updatedExpenses = expenses.map(exp => exp.id === parseInt(id) ? expense : exp);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        navigate('/');
    };

    return (
        <Box sx={{ mt: 8, mx: 'auto', width: '90%', maxWidth: 500 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Expense Name"
                            value={expense.name}
                            onChange={(e) => handleInputChange(e, 'name')}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Amount (MDL)"
                            value={expense.amount}
                            onChange={(e) => handleInputChange(e, 'amount')}
                            type="number"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={expense.category}
                                label="Category"
                                onChange={(e) => handleInputChange(e, 'category')}
                                required
                            >
                                {['Entertainment', 'Food', 'Market', 'Other'].map(option => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            Update Expense
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default EditExpense;
