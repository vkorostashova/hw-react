import React, { useEffect } from "react";
import { useState } from "react";
import Currency from "./Currency";
import { Table } from 'react-bootstrap';
import Search from "./Search";

function Currencies() {
    const [currencies, setCurrencies] = useState([]);
    const [filteredCurrencies, setfilteredCurrencies] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20221208&json').then(res => res.json()).then(data => {
            console.log(data)
            setCurrencies(data)
        })
    }, [])


    function searchByCurrencyName(value) {
        setSearch(value);
        const result = currencies.filter(currency => currency.txt.toLowerCase().includes(value));
        setfilteredCurrencies(result)
    }



    return <div>
        <Search
            searchByCurrencyName={searchByCurrencyName}
        />


        <Table striped border={'border-dark'} hover >
            <thead>
                <tr><th>Name</th><th>Rate</th><th>CC</th></tr>
            </thead>
            <tbody >
                {(search.length ? filteredCurrencies : currencies).map(currency => <Currency
                    currency={currency}
                    key={currency.r030}
                />)}
            </tbody>
        </Table>
    </div>

}

export default Currencies;