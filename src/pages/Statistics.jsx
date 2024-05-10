import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Statistics = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        setExpenses(storedExpenses);
    }, []);

    const categoryData = expenses.reduce((acc, cur) => {
        acc[cur.category] = (acc[cur.category] || 0) + parseFloat(cur.amount);
        return acc;
    }, {});

    const monthlyData = expenses.reduce((acc, cur) => {
        const month = new Date(cur.date).getMonth();
        acc[month] = (acc[month] || 0) + parseFloat(cur.amount);
        return acc;
    }, {});

    const pieData = {
        labels: Object.keys(categoryData),
        datasets: [{
            label: 'Expenses by Category',
            data: Object.values(categoryData),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#E7E9ED',
                '#71B37C',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#E7E9ED',
                '#71B37C',
            ]
        }]
    };

    const barData = {
        labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' })),
        datasets: [{
            label: 'Expenses per Month',
            data: Array.from({ length: 12 }, (_, i) => monthlyData[i] || 0),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    return (
        <Box sx={{ p: 2 }}>
            <h2>Expenses by Category</h2>
            <Pie data={pieData} />
            <h2>Monthly Expenses</h2>
            <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
        </Box>
    );
};

export default Statistics;
