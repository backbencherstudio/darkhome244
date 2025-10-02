"use client"
import React, { useState } from 'react'
import TopWeatherStories from './TopWeatherStories';
import SafetyAndPreparation from './SafetyAndPreparation';
import SpaceAndAstronomy from './SpaceAndAstronomy';
import SelectedTabComponent from '@/components/reusable/SelectedTabComponent';

export default function NewsAndMediaTab() {

    const types = ["Top Weather Stories", "Saftey & Preparation", "Space & Astronomy"]
    const [selectedType, setSelectedType] = useState(types[0]);

    const renderSelectedComponent = () => {
        switch (selectedType) {
            case "Top Weather Stories":
                return <TopWeatherStories />;
            case "Saftey & Preparation":
                return <SafetyAndPreparation />;
            case "Space & Astronomy":
                return <SpaceAndAstronomy />;
            default:
                return;
        }
    }

    return (
        <div>
            <div>
                <div className=' '>
                    <SelectedTabComponent
                        types={types}
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                    />
                </div>
                {renderSelectedComponent()}
            </div>
        </div>
    )
}
