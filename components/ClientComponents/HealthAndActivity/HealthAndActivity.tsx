"use client"
import React, { useState } from 'react'

import SelectedTabComponent from '@/components/reusable/SelectedTabComponent';
import HealthSection from './HealthSection';
import RecipesSection from './RecipesSection';
import TravelAndOutdoors from './TravelAndOutdoors';
import PetsAndAnimals from './PetsAndAnimals';
import ColdAndFluTracker from './ColdAndFluTracker';

export default function HealthAndActivity() {


    const types = ["Health", "Recipes", "Travel & Outdoors","Pets & Animals","Cold & Flu Tracker"]
    const [selectedType, setSelectedType] = useState(types[0]);

    const renderSelectedComponent = () => {
        switch (selectedType) {
            case "Health":
                return <HealthSection />;
            case "Recipes":
                return <RecipesSection />;
            case "Travel & Outdoors":
                return <TravelAndOutdoors />;
            case "Pets & Animals":
                return <PetsAndAnimals />;
            case "Cold & Flu Tracker":
                return <ColdAndFluTracker />;
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
