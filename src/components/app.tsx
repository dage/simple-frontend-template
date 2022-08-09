import React, { useState, useEffect } from 'react';
import './app.scss'

const App = () => {
    const dataUri = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";    

    let [data, setData] = useState();
    let [sortKey, setSortKey] = useState("");
    let [sortOrder, setSortOrder] = useState("");

    enum Order {
        asc = "asc",
        desc = "desc"
    }

    const onClick = e => {
        const newSortKey = e.target.getAttribute("data-sort-key");        
        if(!newSortKey) 
            return;

        e.preventDefault();

        const isChangingOrder = newSortKey === sortKey;
        if(isChangingOrder) {
            const newOrder = sortOrder === Order.asc ? Order.desc : Order.asc;
            setSortOrder(newOrder);
        }
        else {
            // Clicking a new column header for the first time
            setSortKey(newSortKey);
            setSortOrder(Order.asc);
        }
    }

    const sortFunction = (a,b) => {
        const innerSort = (a,b) => {
            if(sortKey === "name")
                return a[sortKey] < b[sortKey] ? -1 : 1;    // alphabetical
            else {
                const v1 = a[sortKey];      // by numberic value
                const v2 = b[sortKey];

                if(!v1 || !v2)
                    return 0;

                // use regexp to remove non-numeric characters
                const v1n = v1.replace(/[^0-9]/g, "");
                const v2n = v2.replace(/[^0-9]/g, "");

                return parseFloat(v1n) < parseFloat(v2n) ? -1 : 1;
            }
        }

        let sortOrderValue = innerSort(a,b);

        if(sortOrder === Order.desc)
            sortOrderValue *= -1;

        return sortOrderValue;
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(dataUri);
            const json = await data.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <span className="app">
            <h1>App'y to see you</h1>
            <table className="pokemon-table">
                <thead>
                    <tr onClick={onClick}>
                        <th className="hidden"></th>
                        <th data-sort-key="name">Name</th>
                        <th data-sort-key="height">Height</th>
                        <th data-sort-key="weight">Weight</th>
                    </tr>
                </thead>
                <tbody>                    
                    {data && data.pokemon.sort(sortFunction).map((pokemon, index) => (
                        <tr key={index}>
                            <td>
                                <img src={pokemon.img} alt={pokemon.name} />
                            </td>
                            <td>{pokemon.name}</td>
                            <td>{pokemon.height}</td>
                            <td>{pokemon.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </span>
    );
}

export default App;