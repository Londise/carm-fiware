import React from "react";
import { BarChart } from "@tremor/react";

export default function GraficoDeBarras({ ultrapassagem1, ultrapassagem2 }) {
  
  const chartdata = [
    {
      name: "Piloto1",
      'Ultrapassagens 1': ultrapassagem1,
    },
    {
      name: "Piloto2",
      'Ultrapassagens 2': ultrapassagem2,
    },
  ];

  const dataFormatter = (number) => {
  return number;
  }
    

  return (
    <>
      <BarChart
        className="mt-6 grafico-barras"
        data={chartdata}
        index="name"
        categories={[
          'Ultrapassagens 1',
          'Ultrapassagens 2',
        ]}
        colors={['red', 'blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={56}
        allowDecimals = {false}
        
      />
    </>
  );
}
