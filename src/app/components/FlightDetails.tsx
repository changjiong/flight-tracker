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
    const createGoogleCalendarUrl = (flight: FlightData) => {
        const startTime = new Date(flight.departureTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const endTime = new Date(flight.arrivalTime).toISOString().replace(/-|:|\.\d\d\d/g, "");

        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: `Flight ${flight.flightNumber}: ${flight.origin} to ${flight.destination}`,
            dates: `${startTime}/${endTime}`,
            details: `Flight Number: ${flight.flightNumber}\nOrigin: ${flight.origin}\nDestination: ${flight.destination}\nTimezone: ${flight.timezone}`,
            location: `${flight.origin} to ${flight.destination}`
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    };

    return (
        <a
            href={createGoogleCalendarUrl(flight)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
        >
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
        </a>
    );
}
