import React from 'react';
import trStyle from '../TransactionsComponent/trStyle.module.css';

const TransactionsComponent = ({ transactions }) => {

    // main states
    const [userSearch, setUserSearch] = React.useState("");
    const [trFiltered, setTrFiltered] = React.useState([...transactions]);

    // transactions scroll states
    const [scrollValues, setScrollValues] = React.useState({ mouseDown: false, startY: 0, scrollTop: 0 });

    // other functions
    const startGrabbing = (e) => {
        grabRef.current.style.cursor = "grabbing";
        setScrollValues(
            {
                mouseDown: true,
                startY: e.pageY - grabRef.current.offsetTop,
                scrollTop: grabRef.current.scrollTop
            }
        );
    }

    const stopGrabbing = () => {
        grabRef.current.style.cursor = "grab";
        setScrollValues({ ...scrollValues, mouseDown: false });
    }

    const mouseMoveHandler = (e) => {
        e.preventDefault();
        if (!scrollValues.mouseDown) return;
        const Y = e.pageY - grabRef.current.offsetTop;
        const scroll = Y - scrollValues.startY;
        grabRef.current.scrollTop = scrollValues.scrollTop - scroll;
    }


    // elements that got by useRef
    const searchBoxRef = React.useRef();
    const grabRef = React.useRef()

    // life cycles
    React.useEffect(() => {
        setTrFiltered(transactions);
    }, [transactions]);

    // event handlers
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

    // const mouseDownHandler = (e) => {
    //     grabRef.current.scrollTop += 180;
    //     grabRef.current.style.cursor = "grabbing";
    //     grabbingScrollHandler(e)

    // }

    // const mouseUpHandler = (e) => {
    //     grabRef.current.style.cursor = "grab";
    // }

    // const grabbingScrollHandler = (e) => {
    //     console.log(e);
    //     grabRef.current.scrollTop -= e.clientY;
    // }


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
            <div
                ref={grabRef}
                onMouseDown={(e) => startGrabbing(e)}
                onMouseUp={stopGrabbing}
                onMouseLeave={stopGrabbing}
                onMouseMove={(e) => mouseMoveHandler(e)}
            >
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