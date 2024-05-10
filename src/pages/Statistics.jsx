import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
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

    const lineDataByCategory = {};
    expenses.forEach(exp => {
        const month = new Date(exp.date).getMonth();
        if (!lineDataByCategory[exp.category]) {
            lineDataByCategory[exp.category] = Array(12).fill(0);
        }
        lineDataByCategory[exp.category][month] += parseFloat(exp.amount);
    });

    const pieData = {
        labels: Object.keys(categoryData),
        datasets: [{
            data: Object.values(categoryData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#71B37C'],
        }]
    };

    const barData = {
        labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' })),
        datasets: [{
            data: Array.from({ length: 12 }, (_, i) => monthlyData[i] || 0),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
        }]
    };

    const lineData = {
        labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' })),
        datasets: Object.keys(lineDataByCategory).map(key => ({
            label: key,
            data: lineDataByCategory[key],
            borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color for each line
            fill: false,
        }))
    };

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Box sx={{ width: '400px', height: '400px' }}>
                <Pie data={pieData} />
            </Box>
            <Box sx={{ width: '600px', height: '300px' }}>
                <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
            </Box>
            <Box sx={{ width: '600px', height: '300px' }}>
                <Line data={lineData} options={{ scales: { y: { beginAtZero: true } } }} />
            </Box>
        </Box>
    );
};

export default Statistics;
