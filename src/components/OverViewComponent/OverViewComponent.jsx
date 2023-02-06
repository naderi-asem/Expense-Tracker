import React from 'react';
import OVC_style from '../OverViewComponent/OVCstyle.module.css';

const OverViewComponent = ({ income, expense, onAddTransaction }) => {

    const [description, setDescription] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [type, setType] = React.useState("expense");
    const [isShow, setIsShow] = React.useState(false);

    const descRef = React.useRef();

    const balance = income - expense;

    React.useEffect(() => {
        isShow && descRef.current.focus();
    }, [isShow])

    const submitHandler = (e) => {
        e.preventDefault();
        onAddTransaction({ description, amount, type });
        setDescription("");
        setAmount(0)
    }

    return (
        <section className={OVC_style.overView}>
            <div>
                <p className={(balance < 0 && OVC_style.negative) || OVC_style.positive}>
                    balance: {balance} $
                </p>
                <div>
                    <button
                        className={`${isShow && OVC_style.cancel_btn}`}
                        onClick={() => setIsShow(prevState => !prevState)}
                    >
                        {(isShow && "Cancel") || "Add"}
                    </button>
                </div>
            </div>
            {
                isShow && <form
                    className={OVC_style.transaction_form}
                    onSubmit={(e) => submitHandler(e)}
                >
                    <input
                        ref={descRef}
                        type="text"
                        name='description'
                        placeholder='type your transaction ...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        name='amount'
                        value={amount}
                        min={0}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <div>
                        <label htmlFor="expense">
                            <input
                                type="radio"
                                name='transactionType'
                                id='expense'
                                value="expense"
                                onChange={(e) => setType(e.target.value)}
                                checked={type === 'expense'}
                            />
                            expense
                        </label>
                        <label htmlFor="income">
                            <input
                                type="radio"
                                name='transactionType'
                                id='income'
                                value="income"
                                onChange={(e) => setType(e.target.value)}
                                checked={type === 'income'}
                            />
                            income
                        </label>

                    </div>
                    <button type='submit' >add transaction</button>
                </form>
            }
            <div>
                <p className={OVC_style.expense}>
                    expense: <span>{expense} $</span>
                </p>
                <p className={OVC_style.income} >
                    income: <span>{income} $</span>
                </p>
            </div>
        </section>
    );
}

export default OverViewComponent;