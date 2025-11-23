import styles from './FlightDetails.module.css';

interface FlightData {
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    timezone: string;
    origin: string;
    destination: string;
}

interface FlightDetailsProps {
    flight: FlightData;
}

export default function FlightDetails({ flight }: FlightDetailsProps) {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Flight Details: {flight.flightNumber}</h2>
            <div className={styles.grid}>
                <div className={styles.item}>
                    <span className={styles.label}>Origin</span>
                    <span className={styles.value}>{flight.origin}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Destination</span>
                    <span className={styles.value}>{flight.destination}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Departure</span>
                    <span className={styles.value}>{new Date(flight.departureTime).toLocaleString()}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Arrival</span>
                    <span className={styles.value}>{new Date(flight.arrivalTime).toLocaleString()}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Timezone</span>
                    <span className={styles.value}>{flight.timezone}</span>
                </div>
            </div>
        </div>
    );
}
