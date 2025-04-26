import React, { use, useEffect } from 'react';
import dataJson from '../../data/data.json';

const LazyLoader = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [showInfo, setShowInfo] = React.useState(false);

    // useEffect(() => {
    //     if (data) {
    //         console.log('Data fetched:', data);
            
    //     }
    // }, [data]);

    useEffect(() => {
        setTimeout(() => {
            console.log('Fetching data...');
            setData(dataJson);
            setLoading(false);
            setError(false);
        }, 5000); 
    }, []);

    return (
        <div>
            <h1>LazyLoader Component</h1>
            {loading ? 
                (
                    <p>Loading...</p>
                ) 
            : 
                error ? 
                (
                    <p>Error loading data</p>
                ) 
                :
                (
                    <div>
                        <h2>Data Loaded</h2>
                        <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Hide' : 'Show'} Info</button>
                        {showInfo && (
                            <div>
                                <h3>Data:</h3>
                                <pre>{JSON.stringify(data, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default LazyLoader;