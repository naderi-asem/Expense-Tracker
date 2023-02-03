import React from "react";
import etStyle from '../ExpenseTracker/etStyle.module.css';
import OverViewComponent from "../OverViewComponent/OverViewComponent";
import TransactionsComponent from "../TransactionsComponent/TransactionsComponents";

const ExpenseTracker = () => {

    const [transactions, setTransactions] = React.useState([]);
    const [expense, setExpense] = React.useState(0);
    const [income, setIncome] = React.useState(0);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);


    React.useEffect(() => {
        let ex = 0;
        let inc = 0;
        transactions.forEach(t => {
            t.type === "expense" ? ex += t.amount : inc += t.amount
        });
        setExpense(ex);
        setIncome(inc);
    }, [transactions]);

    const windowSize = () => setWindowWidth(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener("resize", windowSize);
        return () => window.removeEventListener("resize", windowSize);
    }, [windowWidth])

    const addTransactionHandler = (formValue) => {
        // console.log("form values: ", description, amount, type);
        // if(formValue.type === "expense")
        //     setExpense(expense + formValue.amount);
        // else
        //     setIncome(income +  formValue.amount);
        setTransactions([...transactions, { ...formValue, id: Date.now() }]);
    }

    console.log(window.screenX);

    return (
        <section
            className={`${etStyle.trackerContainer} ${windowWidth < 998 ? etStyle.flexWrap : ""}`}
        >
            <div>
                <h3>expense & income</h3>
                <OverViewComponent
                    onAddTransaction={addTransactionHandler}
                    income={income}
                    expense={expense}
                />
                {
                    transactions.length > 0 && <button
                        onClick={() => setTransactions([])}
                        className={etStyle.resetBtn}
                    >
                        reset all
                    </button>}
            </div>
            {transactions.length > 0 && <div>
                <TransactionsComponent
                    transactions={transactions}
                />
            </div>}
        </section>
    );
}

export default ExpenseTracker;