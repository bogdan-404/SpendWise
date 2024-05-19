import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditExpense = () => {
    const [expense, setExpense] = useState({ name: '', amount: '', category: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await fetch(`http://localhost:3000/expenses/${id}`);
                if (!response.ok) throw new Error('Failed to fetch expense');
                const data = await response.json();
                setExpense(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchExpense();
    }, [id]);

    const handleInputChange = (e, field) => {
        setExpense({ ...expense, [field]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/expenses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expense)
            });
            if (!response.ok) throw new Error('Failed to update the expense');
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
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
