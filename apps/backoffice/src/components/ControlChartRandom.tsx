import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip, Legend } from 'recharts';

interface DataPoint {
  price: number;
  included: boolean;
}

interface ControlChartProps {
  data: DataPoint[];
  limits: { upperLimit: number, lowerLimit: number, median: number }
}

const ControlChartRandom: React.FC<ControlChartProps> = ({ data, limits }) => {
  const formattedData = data?.map((d) => ({
    x: Math.random(),
    y: d.price,
    included: d.included
  }));

  return (
    <ScatterChart width={600} height={300} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="Random" domain={[0, 1]} />
      <YAxis type="number" dataKey="y" name="Price" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      <Scatter 
        fontSize={12}
        name="Propiedades incluidas" 
        data={formattedData?.filter(d => d.included)} 
        fill="#8884d8" 
      />
      <Scatter 
        fontSize={14}
        name="Propiedades excluidas" 
        data={formattedData?.filter(d => !d.included)} 
        fill="#82ca9d" 
      />
      <ReferenceLine y={limits.upperLimit} stroke="blue" />
      <ReferenceLine y={limits.median} stroke="orange"  />
      <ReferenceLine y={limits.lowerLimit} stroke="blue" />
    </ScatterChart>
  );
};

export default ControlChartRandom;