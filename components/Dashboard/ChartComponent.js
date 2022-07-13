import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const ChartComponent = () => (
  <>
    <div className='header flex'>
      
      <div className='links'>
          TP Purchase
        <h3>$500,0000</h3>
      </div>
      <div className=" justify-items-end items-end ml-32">
          <select>
              <option>July</option>
              <option>August</option>
              <option>Stepmber</option>
          </select>
      </div>
    </div>
    <Line data={data} options={options} />
  </>
);

export default ChartComponent;