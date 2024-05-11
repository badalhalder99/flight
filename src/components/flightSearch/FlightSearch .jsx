import React, { useState } from 'react';

const FlightSearch = ({ flightData }) => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [date, setDate] = useState('');
    const [people, setPeople] = useState(1);
    const [searchResults, setSearchResults] = useState([]);

    console.log("SearchResults:", searchResults);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Filter flight data based on user input
        const results = flightData.filter(flight => {
            const departureMatches = flight.itineraries.some(itinerary =>
                itinerary.segments.some(segment =>
                    segment.departure.iataCode.toUpperCase().includes(departure.toUpperCase())
                )
            );

            const arrivalMatches = flight.itineraries.some(itinerary =>
                itinerary.segments.some(segment =>
                    segment.arrival.iataCode.toUpperCase().includes(arrival.toUpperCase())
                )
            );

            console.log("Departure Matches:", departureMatches);
            console.log("Arrival Matches:", arrivalMatches);
            return departureMatches && arrivalMatches;
        });

        setSearchResults(results);
        console.log("filterResult:", results);
    };

   
    

    const formatDate = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1; // Month is zero-based, so we add 1
        const year = dateTime.getFullYear() % 100; // Get last two digits of the year
        return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
    };

    
    
    return (
        <div className="flight-search">
            <form onSubmit={handleSubmit}>
                <label htmlFor="departure">Departure:</label>
                <input
                    type="text"
                    id="departure"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                />
                <label htmlFor="arrival">Arrival:</label>
                <input
                    type="text"
                    id="arrival"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                />
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label htmlFor="people">Number of people:</label>
                <select
                    id="people"
                    value={people}
                    onChange={(e) => setPeople(parseInt(e.target.value))}
                >
                    {[...Array(9).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
                <button type="submit">Search</button>
            </form>
            <div className="search-results mt-5">
                <table>
                    <thead>
                        <tr>
                            <th className='px-4'>Flight</th>
                            <th className='px-4'>AIRCRAFT</th>
                            <th className='px-4'>Class</th>
                            <th className='px-4'>FARE</th>
                            <th className='px-4'>Route</th>
                            <th className='px-4'>Departure</th>
                            <th className='px-4'>Arrival</th>
                            <th className='px-4'>Duration</th>
                            <th className='px-4'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((flight, index) => {
                            // Filter segments based on user's selected departure and arrival locations
                            const filteredSegments = flight.itineraries[0].segments.filter(segment => {
                                return segment.departure.iataCode.toUpperCase() === departure.toUpperCase() &&
                                    segment.arrival.iataCode.toUpperCase() === arrival.toUpperCase();
                            });

                            // Display only if there are filtered segments
                            if (filteredSegments.length > 0) {
                                return (
                                    <tr key={index}>
                                        <td className='px-4'>{filteredSegments[0].marketingCarrier} {filteredSegments[0].aircraft}</td>
                                        <td className='px-4'>{filteredSegments[0].flightNumber}</td>
                                        <td className='px-4'>{flight.class[0][0]}</td>
                                        <td className='px-4'>{flight.fareBasis[0][0]}</td>
                                        <td className='px-4'>{filteredSegments.map(segment => segment.departure.iataCode)}- {filteredSegments.map(segment => segment.arrival.iataCode)}</td>
                                        <td className='px-4'>{filteredSegments[0].departure.at}</td>
                                        <td className='px-4'>{filteredSegments[filteredSegments.length - 1].arrival.at}</td>
                                        <td className='px-4'>{flight.itineraries[0].duration}</td>
                                        <td className='px-4'>{flight.price}</td>
                                    </tr>
                                );
                            } else {
                                // If no matching segments found, return null
                                return null;
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FlightSearch;
