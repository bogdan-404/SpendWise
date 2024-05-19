import React, { useState, useEffect } from 'react';
import { Box, Button, Select, MenuItem, Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
    const [expenses, setExpenses] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('http://localhost:3000/expenses');
                if (!response.ok) throw new Error('Failed to fetch expenses');
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchExpenses();
    }, []);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/expenses/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete the expense');
            setExpenses(expenses.filter(expense => expense.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Entertainment': return '#ff4757';
            case 'Food': return '#2ed573';
            case 'Market': return '#1e90ff';
            default: return '#ff6348';
        }
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
                <Button variant="contained" sx={{ fontWeight: 'bold' }} component={Link} to="/add-expense">
                    Add Expense
                </Button>
            </Box>

            {expenses.filter(exp => new Date(exp.date).getMonth() + 1 === selectedMonth).map((expense) => (
                <Card key={expense.id} sx={{ mb: 2, backgroundColor: 'var(--card-background-color)', border: '1px solid var(--card-border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ height: '15px', width: '15px', backgroundColor: getCategoryColor(expense.category), borderRadius: '50%', display: 'inline-block', marginRight: '10px' }}></span>
                        <Typography variant="h5" sx={{ color: 'var(--text-color)' }}>{expense.name}</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ ml: 'auto', color: 'var(--text-color)' }}>
                        {expense.amount} MDL
                    </Typography>
                    <CardActions>
                        <IconButton onClick={() => navigate(`/edit-expense/${expense.id}`)} color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(expense.id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default Home;
