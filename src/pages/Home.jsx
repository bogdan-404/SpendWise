import React, { useState, useEffect } from 'react';
import { Box, Button, Select, MenuItem, Card, CardContent, Typography, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [expenses, setExpenses] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const navigate = useNavigate();

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        setExpenses(storedExpenses);
    }, []);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleDelete = (id) => {
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        setExpenses(updatedExpenses);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {Array.from({ length: 12 }, (_, index) => (
                        <MenuItem key={index} value={index + 1}>
                            {new Date(0, index).toLocaleString('default', { month: 'long' })}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="contained" component={Link} to="/add-expense">
                    Add Expense
                </Button>
            </Box>

            {expenses.filter(exp => new Date(exp.date).getMonth() + 1 === selectedMonth).map((expense) => (
                <Card key={expense.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{expense.name}</Typography>
                        <Typography variant="body1">{expense.amount} MDL</Typography>
                        <Typography variant="body2">{expense.category}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => navigate(`/edit-expense/${expense.id}`)}>Edit</Button>
                        <Button size="small" onClick={() => handleDelete(expense.id)}>Delete</Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default Home;
