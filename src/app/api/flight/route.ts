import { NextResponse } from 'next/server';

interface FlightData {
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    timezone: string;
    origin: string;
    destination: string;
}

interface AviationStackFlight {
    flight_date: string;
    flight_status: string;
    departure: {
        airport: string;
        timezone: string;
        iata: string;
        icao: string;
        terminal: string;
        gate: string;
        delay: number;
        scheduled: string;
        estimated: string;
        actual: string | null;
        estimated_runway: string | null;
        actual_runway: string | null;
    };
    arrival: {
        airport: string;
        timezone: string;
        iata: string;
        icao: string;
        terminal: string;
        gate: string;
        baggage: string;
        delay: number;
        scheduled: string;
        estimated: string;
        actual: string | null;
        estimated_runway: string | null;
        actual_runway: string | null;
    };
    airline: {
        name: string;
        iata: string;
        icao: string;
    };
    flight: {
        number: string;
        iata: string;
        icao: string;
        codeshared: any;
    };
}

interface AviationStackResponse {
    pagination: any;
    data: AviationStackFlight[];
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const flightNumber = searchParams.get('flightNumber');

    if (!flightNumber) {
        return NextResponse.json({ error: 'Flight number is required' }, { status: 400 });
    }

    const API_KEY = process.env.AVIATIONSTACK_API_KEY;

    if (!API_KEY) {
        console.error('AVIATIONSTACK_API_KEY is not defined');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`;

    console.log(`Fetching data from: ${apiUrl}`);

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(apiUrl, {
            signal: controller.signal,
            cache: 'no-store'
        });
        clearTimeout(timeoutId);

        console.log(`API Response Status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error Body: ${errorText}`);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: any = await response.json();
        console.log('API Data received');

        if (data.error) {
            console.error('API Error:', data.error);
            return NextResponse.json({ error: data.error.message || 'API Error' }, { status: 500 });
        }

        const flightResponse = data as AviationStackResponse;

        if (flightResponse.data && flightResponse.data.length > 0) {
            // Find the most relevant flight (e.g., the latest one or active one)
            // For now, we take the first one as the API returns a list
            const flightInfo = flightResponse.data[0];

            const flightData: FlightData = {
                flightNumber: flightInfo.flight.iata,
                departureTime: flightInfo.departure.scheduled,
                arrivalTime: flightInfo.arrival.scheduled,
                timezone: flightInfo.departure.timezone,
                origin: flightInfo.departure.iata,
                destination: flightInfo.arrival.iata
            };

            return NextResponse.json(flightData);
        } else {
            return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching flight data:', error);
        return NextResponse.json({ error: 'Failed to fetch flight data' }, { status: 500 });
    }
}
