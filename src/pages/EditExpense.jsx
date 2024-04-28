import React from "react";
import { useParams } from "react-router-dom";

function EditExpense() {
    let { id } = useParams();
    return <div>Edit Expense {id}</div>;
}

export default EditExpense;