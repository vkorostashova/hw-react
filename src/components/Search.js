import React from "react";
import { FormControl } from 'react-bootstrap';

function Search({ searchByCurrencyName }) {
    return <FormControl className={"mb-4 border-dark" }
        placeholder="Search by currency"
        aria-label="search"
        onKeyUp={e => searchByCurrencyName(e.currentTarget.value.trim().toLowerCase())}
    />
}
export default Search;