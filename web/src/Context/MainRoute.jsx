import { Routes, Route } from "react-router-dom";
import ExpenseForm from '../Pages/ExpenseForm';
import ExpenseList from '../Pages/ExpenseList';

const MainRoute = () => {
   return (
        <Routes>
            <Route path="/" element={<ExpenseForm/>} />
             <Route path="/list" element={<ExpenseList/>} />
            <Route path="*" element={<h4>404 Page not Found</h4>} />
        </Routes>
    )
}

export default MainRoute
