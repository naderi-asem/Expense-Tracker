import React from 'react';
import trStyle from '../TransactionsComponent/trStyle.module.css';

const TransactionsComponent = ({ transactions }) => {

    console.log("transactions: ", transactions);

    const [userSearch, setUserSearch] = React.useState("");

    const [trFiltered, setTrFiltered] = React.useState([...transactions]);

    const searchBoxRef = React.useRef();

    React.useEffect(() => {
        setTrFiltered(transactions);
    }, [transactions]);


    const searchHandler = (e) => {
        const input = e.target.value.toLowerCase();
        setUserSearch(input);
        filteredHandler(e.target.value);
        console.log(window.screenY);
        console.log(window);
        window.scrollTo(0, window.screen.height);
    }

    const filteredHandler = (searchItem) => {
        if (!searchItem || searchItem === "") {
            setTrFiltered([...transactions]);
            return;
        }
        const searched = transactions.filter(t => {
            return t.description.toLowerCase().includes(searchItem);
        });
        setTrFiltered(searched);
    }


    return (
        <section className={trStyle.transaction_box} >
            <h3>transactions</h3>
            {
                trFiltered.length || userSearch.length
                    ? <input
                        type="text"
                        placeholder="search for a transaction ... "
                        onChange={searchHandler}
                        value={userSearch}
                        ref={searchBoxRef}
                    />
                    : <p>add some transaction...</p>

            }
            <div>
                {trFiltered.map(transaction => {
                    return <div
                        key={transaction.id}
                        className={transaction.type === "expense" ? trStyle.expense : trStyle.income}
                    >
                        <h5>{transaction.description}</h5>
                        <p>{`${transaction.type}:  ${transaction.amount} $`}</p>
                    </div>
                })}
            </div>
        </section>
    );
}

export default TransactionsComponent;