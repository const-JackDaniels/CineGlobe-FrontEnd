import logo from './logo.svg';
import './App.css';
import { FaGlobeEurope } from "react-icons/fa";
import React, { useEffect, useState, useRef, useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import dateFormat from 'dateformat';
import moment from 'moment';
window.moment = moment
async function getMovies() {
    return fetch('https://localhost:44368/getmovies/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
        .then(data => data.json());
}

export default function App() {
    const [rows, setRows] = useState([]);
    const [spookyClicked, setSpookyClicked] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const data = await getMovies();
            setRows(data);
            console.log(data);
        };
        getData();
    },[])

    const showImg = (props) => {
        return <img src={props} alt="img" />

    }

    const [colDefs, setColDefs] = useState([
        { field: "releaseDate", filter: true, valueFormatter: d => moment(d.value).format('MMMM Do YYYY'), cellDataType: 'text' },
        { field: "title", filter: true },
        { field: "overview", filter: true },
        { field: "popularity", filter: true },
        { field: "voteCount", filter: true },
        { field: "voteAverage", filter: true },
        { field: "originalLanguage", filter: true },
        { field: "genre", filter: true },
        { field: "poster_url", cellRenderer: showImg }
    ]);

    const dummyClick = () => {


    };

    const handleSpookyClick = () => {
        let filter = rows.filter(x => x.genre.includes("Thriller","Horror"));
        setRows(filter);
        setSpookyClicked(true);
    }

    const handleSpookyUnclick = async () => {
        const data = await getMovies();
        setRows(data);
        setSpookyClicked(false);
    }

    return (
        <div className="bg-slate-600 h-screen w-screen text-white font-[Arial]">
            <div className="bg-slate-700 h-2/12 text-4xl text-white flex justify-center place-items-end pb-1 shadow-2xl"><FaGlobeEurope className="mr-2 scale-95" />CINEGLOBE</div>
            <div className="bg-slate-700 h-2/12 text-l italic text-white flex justify-center place-items-end pb-1 shadow-2xl">tracking YOUR favourite films...</div>
            <div className="flex flex-cols-2 gap-1 ">
                <div className="flex-none p-4 text-center bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-20 border border-gray-100 m-2">
                    <div className="text-2xl rounded-md">MENU</div>
                    <div className="hover:bg-slate-900 rounded-md hover:scale-110"><button onClick={dummyClick}>HOME</button></div>
                    <div className="hover:bg-slate-900 rounded-md hover:scale-110"><button onClick={dummyClick}>COMING SOON</button></div>
                    <div className="hover:bg-slate-900 rounded-md hover:scale-110"><button onClick={dummyClick}>TESTING</button></div>
                </div>

                <div className="flex-auto p-4 text-center bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-20 border border-gray-100 rounded-2xl m-2">
                    {!spookyClicked ? <button className="place-items-left bg-slate-600/75 rounded-md p-1 mb-2" onClick={handleSpookyClick}>Get Spooky!</button> : 
                                      <button className="place-items-left bg-slate-600/75 rounded-md p-1 mb-2" onClick={handleSpookyUnclick}>Show All</button>}
                    <div
                        className="ag-theme-quartz"
                        style={{ height: 500}} 
                    >
                        <AgGridReact
                            rowData={rows}
                            columnDefs={colDefs}
                            pagination={true}
                            paginationPageSize={50}
                            paginationPageSizeSelector={[10,50,100,1000]}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-slate-700 rounded-md mx-2 h-2/12 text-white flex justify-end px-2 place-items-end shadow-2xl">CineGlobe 2024 &copy;</div>
        </div>
    );
}