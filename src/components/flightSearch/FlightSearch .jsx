import React, { useState } from 'react';

const FlightSearch = ({ flightData,successMessage }) => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [date, setDate] = useState('');
    const [selectedDayMinus, setSelectedDayMinus] = useState('');
    const [selectedDayPlus, setSelectedDayPlus] = useState('');
    const [Time, setTime] = useState('');
    const [adt, setAdt] = useState('');
    const [people, setPeople] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    //checkbox,radio button state:
    const [isChecked, setIsChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  
    const handleRadioChange = (event) => {
      setSelectedOption(event.target.value);
    };

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
    };
 
    return (
        <div className="flight-search">
            <form onSubmit={handleSubmit} className='border-t border-b border-solid border-blue-500 pt-[14px] pb-[6px]'>
                <div className="formTop grid lg:grid-cols-8 small:grid-cols-4 gap-2">
                    <div className="fromInput">
                        <input
                            type="text"
                            id="departure"
                            placeholder='From'
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            className='border border-solid border-[#000] placeholder-[#000] py-1 px-2 rounded-sm w-full xsmall:text-[15px] 2xsmall:text-[14px]'
                            required  
                        />
                    </div>

                    <div className="toInput">
                        <input
                            type="text"
                            id="arrival"
                            placeholder='To'
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                            className='border border-solid border-[#000] placeholder-[#000] py-1 px-2 rounded-sm w-full xsmall:text-[15px] 2xsmall:text-[14px]'
                            required  
                        />
                    </div>

                    <div className="dateInput">
                        <input
                            type="date"
                            id="date"
                            placeholder='Date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className='border border-solid border-[#000] placeholder-[#000] py-[3px] px-2 rounded-sm w-full xsmall:text-[15px] 2xsmall:text-[14px]'
                        />
                    </div>

                    <div className="dayInput">
                        <select id="day" value={selectedDayMinus} onChange={(e) => setSelectedDayMinus(e.target.value)} className='border border-solid border-[#000] placeholder-[#000] py-[3px] px-2 rounded-sm w-full xsmall:text-[15px] 2xsmall:text-[14px]'>
                            <option value="">Select Day</option>
                            <option value="monday">Day-</option>
                        </select>
                    </div>
                    <div className="day2Input">
                        <select id="day2" value={selectedDayPlus} onChange={(e) => setSelectedDayPlus(e.target.value)} className='border border-solid border-[#000] placeholder-[#000] py-[3px] px-2 rounded-sm w-full xsmall:text-[15px] 2xsmall:text-[14px]'>
                            <option value="">Select Day</option>
                            <option value="monday">Day+</option>
                        </select>
                    </div>
                    <div className="day3Input">
                        <select id="day3" value={Time} onChange={(e) => setTime(e.target.value)} className='border border-solid border-[#000] placeholder-[#000] py-[3px] px-2 rounded-sm w-full xsmall:text-[15px] 2xsmall:text-[14px]'>
                            <option value="">Select Time</option>
                            <option value="monday">Any Time</option>
                        </select>
                    </div>

                    <div className="day4Input">
                        <select id="day4" value={adt} onChange={(e) => setAdt(e.target.value)} className='border border-solid border-[#000] placeholder-[#000] py-[3px] px-2 rounded-sm w-full xsmall:text-[15px] 2xsmall:text-[14px]'>
                            <option value="">Select Adt</option>
                            <option value="monday">ADT</option>
                        </select>
                    </div>

                    <div className="travelerInput">
                        <select
                            id="people"
                            value={people}
                            placeholder='Traveler'
                            onChange={(e) => setPeople(parseInt(e.target.value))}
                            className='border border-solid border-[#000] placeholder-[#000] py-1 px-2 rounded-sm w-full xsmall:text-[15px] 2xsmall:text-[14px]'
                            required 
                        >
                            <option value="">Select seat</option>
                            {[...Array(9).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="formBottom flex small:flex-row 2xsmall:flex-col small:justify-between 2xsmall:justify-start small:items-center 2xsmall:items-start pt-2 mt-2 border-t border-solid border-blue-500 small:w-auto 2xsmall:w-full">
                    <div className="checkbox">
                        <label className='flex items-center xsmall:text-[15px] 2xsmall:text-[14px]'>
                            <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className='mr-1 2xsmall:text-[14px]'
                            />
                            Extra Options
                        </label>
                    </div>
                    <div className='radioButtonWrap flex items-center justify-center xsmall:text-[15px] 2xsmall:text-[14px]'>
                        <label className='flex items-center small:ml-2 2xsmall:ml-0'>
                            <input
                                type="radio"
                                value="option1"
                                checked={selectedOption === "option1"}
                                onChange={handleRadioChange}
                                className='mr-1 2xsmall:text-[14px]'
                            />
                            Environment
                        </label>

                        <label className='flex items-center ml-2 xsmall:text-[15px] 2xsmall:text-[14px]'>
                            <input
                                type="radio"
                                value="option2"
                                checked={selectedOption === "option2"}
                                onChange={handleRadioChange}
                                className='mr-1 2xsmall:text-[14px]'
                            />
                            Dummy
                        </label>

                        <label className='flex items-center ml-2 xsmall:text-[15px] 2xsmall:text-[14px]'>
                            <input
                                type="radio"
                                value="option3"
                                checked={selectedOption === "option3"}
                                onChange={handleRadioChange}
                                className='mr-1 2xsmall:text-[14px]'
                            />
                            PDT
                        </label>
                    </div>
                    <div className="submitButton small:pb-[0] 2xsmall:pb-2 small:w-auto 2xsmall:w-full">
                        <button type="submit" className='bg-[#312e81] text-white text-semibold xsmall:text-[15px] 2xsmall:text-[14px] py-[6px] px-4 rounded-[4px] small:mt-0 2xsmall:mt-2 btn small:w-auto 2xsmall:w-full'>Search</button>
                    </div>
                </div>
            </form>

            <div className="dataTable">
                {searchResults.length > 0 && (
                    <div className="search-results">
                        <p className="xsmall:text-[15px] 2xsmall:text-[14px] text-black mt-2 mb-3">{successMessage}</p>
                        <div className="overflow-x-auto">
                            <table className='w-full bg-[#edeafe] mb-5 table-auto'>
                                <thead className='bg-[#2e3791]'>
                                    <tr className='text-left  border-b border-solid border-red-500'>
                                        <th className='px-3 py-2 font-semibold text-white uppercase text-[14px]'>Flight</th>
                                        <th className='px-3 py-2 font-semibold text-white uppercase text-[14px]'>AIRCRAFT</th>
                                        <th className='px-3 py-2 font-semibold text-white uppercase text-[14px]'>Class</th>
                                        <th className='px-3 py-2 font-semibold text-white uppercase text-[14px]'>FARE</th>
                                        <th className='px-3 py-2 font-semibold text-white uppercase text-[14px]'>Route</th>
                                        <th className='px-3 py-2 font-semibold text-white uppercase text-[14px]'>Departure</th>
                                        <th className='px-3 py-2 font-semibold text-white uppercase text-[14px]'>Arrival</th>
                                        <th className='px-3 py-2 font-semibold text-white uppercase text-[14px]'>Duration</th>
                                        <th className='px-3 py-2 font-semibold text-white uppercase text-[14px]'>Price</th>
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
                                                <tr key={index} className='border-b border-solid border-red-500'>
                                                    <td className='px-3 py-2 text-[14px] text-nowrap'>{filteredSegments[0].marketingCarrier} {filteredSegments[0].aircraft}</td>
                                                    <td className='px-3 py-2 text-[14px] text-nowrap'>{filteredSegments[0].flightNumber}</td>
                                                    <td className='px-3 py-2 text-[14px] text-nowrap'>{flight.class[0][0]}</td>
                                                    <td className='px-3 py-2 text-[14px] text-nowrap'>{flight.fareBasis[0][0]}</td>
                                                    <td className='px-3 py-2 text-[14px] text-nowrap'>{filteredSegments.map(segment => segment.departure.iataCode)}- {filteredSegments.map(segment => segment.arrival.iataCode)}</td>
                                                    <td className='px-3 py-2 text-[14px] text-nowrap'>{filteredSegments[0].departure.at}</td>
                                                    <td className='px-3 py-2 text-[14px] text-nowrap'>{filteredSegments[filteredSegments.length - 1].arrival.at}</td>
                                                    <td className='px-3 py-2 text-[14px] text-nowrap'>{flight.itineraries[0].duration}</td>
                                                    <td className='px-3 py-2 text-[14px] text-nowrap'>{flight.price}</td>
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
                )}
            </div>
        </div>
    );
};

export default FlightSearch;
