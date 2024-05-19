import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Statistics from './pages/Statistics';
import { ThemeProvider } from './ThemeContext';

function App() {

    console.log(import.meta.env.VITE_API_URL);

    return (
        <ThemeProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/edit-expense/:id" element={<EditExpense />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </ThemeProvider>
    );
}
export default App;