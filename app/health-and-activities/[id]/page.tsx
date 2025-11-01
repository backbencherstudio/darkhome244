import { useRSSStore } from '@/store/rssStore'
import React from 'react'

export default function HealthDetailspage() {


    const categoryData = useRSSStore(state => state.categoryData)
    // console.log(categoryData, "categorrrrrrrrrrry")

    return (
        <div>HealthDetailspage</div>
    )
}
