import React, { useState } from 'react';
import styles from '../header/header.module.css';
import FlightSearch from '../flightSearch/FlightSearch '
import flightData from '../../data/data.json';

const Home = () => {
    // State to keep track of active tab
    const [activeTab, setActiveTab] = useState(2);

    // Function to handle tab change
    const handleTabChange = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <section>
            <div className={`container ${styles.customContainer} my-0 ml-auto mr-auto py-1 md:px-5 2xsmall:px-4 lg:max-w-[1024px] xl:max-w-[1320px]`}>
                <div className="tabWrap flex justify-center items-center mt-4">
                    <button
                        className={`${activeTab === 1 ? 'active bg-[#2e3791] border border-solid border-[#2e3791] text-[#fff] ' : 'bg-white border border-solid border-[#2e3791]'} text-[13px] font-medium py-[6px] xsmall:px-4 2xsmall:px-3`}
                        onClick={() => handleTabChange(1)}
                    >
                        Round Trip
                    </button>
                    <button
                        className={`${activeTab === 2 ? 'active bg-[#2e3791] border border-l-0 border-r-0 border-solid border-[#2e3791] text-[#fff] ' : 'bg-white border border-solid border-[#2e3791] border-l-0 border-r-0'} text-[13px] font-medium py-[6px] xsmall:px-4 2xsmall:px-3`}
                        onClick={() => handleTabChange(2)}
                    >
                        One Way
                    </button>
                    <button
                        className={`${activeTab === 3 ? 'active bg-[#2e3791] border border-solid border-[#2e3791] text-[#fff] ' : 'bg-white border border-solid border-[#2e3791]'} text-[13px] font-medium py-[6px] xsmall:px-4 2xsmall:px-3`}
                        onClick={() => handleTabChange(3)}
                    >
                        Multi City
                    </button>
                </div>
                {/* Display content based on active tab */}
                <div className="tab-content mt-5">
                    {activeTab === 1 && (
                        <div className='flex justify-center items-center'>
                            <p className=' text-[#111827] text-base'>There is nothing to show!</p>
                        </div>
                    )}

                    {activeTab === 2 && (
                        <>
                            <FlightSearch flightData={flightData.flightOffer} /> 
                        </>
                    )}
                    {activeTab === 3 && (
                        <div className='flex justify-center items-center'>
                            <p className=' text-[#111827] text-base'>There is nothing to show!!!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Home;

