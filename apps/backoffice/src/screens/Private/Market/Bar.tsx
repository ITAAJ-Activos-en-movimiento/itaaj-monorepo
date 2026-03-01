import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface DistributionChartProps {
  data: {
    [range: string]: number;
  };
}

const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const labels = Object.keys(data);
      const values = Object.values(data);

      const myChart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Distribución Cantidad de Propiedades por rango de precio',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      return () => myChart.destroy(); // Destruye el gráfico al desmontar el componente
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DistributionChart;
