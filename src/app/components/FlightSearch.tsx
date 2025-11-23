'use client';

import { useState } from 'react';
import FlightDetails from './FlightDetails';
import styles from './FlightSearch.module.css';

interface FlightData {
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    timezone: string;
    origin: string;
    destination: string;
}

export default function FlightSearch() {
    const [flightNumber, setFlightNumber] = useState('');
    const [flightData, setFlightData] = useState<FlightData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!flightNumber.trim()) return;

        setLoading(true);
        setError('');
        setFlightData(null);

        try {
            const response = await fetch(`/api/flight?flightNumber=${encodeURIComponent(flightNumber)}`);
            const data = await response.json();

            if (response.ok) {
                setFlightData(data);
            } else {
                setError(data.error || 'Failed to fetch flight data');
            }
        } catch (err) {
            setError('An error occurred while fetching flight data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSearch} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="flightNumber" className={styles.label}>
                        Flight Number
                    </label>
                    <input
                        type="text"
                        id="flightNumber"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        placeholder="e.g. AA123"
                        className={styles.input}
                    />
                </div>
                <button type="submit" disabled={loading} className={styles.button}>
                    {loading ? 'Searching...' : 'Search Flight'}
                </button>
            </form>

            {error && <div className={styles.error}>{error}</div>}

            {flightData && <FlightDetails flight={flightData} />}
        </div>
    );
}
