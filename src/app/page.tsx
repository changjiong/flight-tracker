import FlightSearch from './components/FlightSearch';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem 1rem',
      background: 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '800',
        marginBottom: '3rem',
        background: 'linear-gradient(to right, #2563eb, #7c3aed)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
      }}>
        Flight Tracker
      </h1>
      <FlightSearch />
    </main>
  );
}
