import { NextResponse } from 'next/server';

interface FlightData {
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    timezone: string;
    origin: string;
    destination: string;
}

const mockFlights: Record<string, FlightData> = {
    'AA123': {
        flightNumber: 'AA123',
        departureTime: '2023-11-24T10:00:00',
        arrivalTime: '2023-11-24T14:00:00',
        timezone: 'UTC-5',
        origin: 'JFK',
        destination: 'LHR'
    },
    'BA456': {
        flightNumber: 'BA456',
        departureTime: '2023-11-25T18:30:00',
        arrivalTime: '2023-11-26T06:30:00',
        timezone: 'UTC+0',
        origin: 'LHR',
        destination: 'HND'
    },
    'CX789': {
        flightNumber: 'CX789',
        departureTime: '2023-11-26T09:15:00',
        arrivalTime: '2023-11-26T13:00:00',
        timezone: 'UTC+8',
        origin: 'HKG',
        destination: 'LAX'
    }
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const flightNumber = searchParams.get('flightNumber');

    if (!flightNumber) {
        return NextResponse.json({ error: 'Flight number is required' }, { status: 400 });
    }

    const flight = mockFlights[flightNumber.toUpperCase()];

    if (flight) {
        return NextResponse.json(flight);
    } else {
        return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }
}
