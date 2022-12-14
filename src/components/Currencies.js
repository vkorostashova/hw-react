import React, { useEffect } from "react";
import { useState } from "react";
import Currency from "./Currency";
import { Table } from 'react-bootstrap';
import Search from "./Search";

function Currencies() {
    const [currencies, setCurrencies] = useState([]);
    const [filteredCurrencies, setfilteredCurrencies] = useState([]);
    const [search, setSearch] = useState('');

    const currentDate = new Date().toJSON().split('T')[0];
    console.log(currentDate)
    const [date, setDate] = useState(currentDate);

    useEffect(() => {
        fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date.replaceAll('-','')}&json`).then(res => res.json()).then(data => {
            console.log(data)
            setCurrencies(data)
        })
    }, [date])
    

    
    


    function searchByCurrencyName(value) {
        setSearch(value);
        const result = currencies.filter(currency => currency.txt.toLowerCase().includes(value));
        setfilteredCurrencies(result)
    }



    return <div>
        <input defaultValue={date} className={'form-control mb-4 border-dark'} type={'date'} onChange={e => setDate(e.currentTarget.value) }/>
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