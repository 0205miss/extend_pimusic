import React from 'react'
import ChartComponent from './ChartComponent'
import HorzentalNav from './HorzontalNav'
import RecentTransaction from './RecentTransaction'


function Home() {
    return (
        <div>
            <div className="mx-4">
                <ChartComponent/>
                <HorzentalNav/>
                <RecentTransaction/>

            </div>
        </div>
    )
}

export default Home
