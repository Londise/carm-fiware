import React, { useEffect, useState } from 'react';
import { LineChart } from '@tremor/react';

export default function LineChartWithDynamicData() {
  const [chartData, setChartData] = useState([]);
  const url = "20.206.249.58";

  const myHeaders = new Headers();
  myHeaders.append("fiware-service", "smart");
  myHeaders.append("fiware-servicepath", "/");

  // Função para buscar e processar os dados do JSON
  const fetchChartData = async () => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const responses = await Promise.all([
        fetch("/api/STH/v1/contextEntities/type/CarMonitoring/id/urn:ngsi-ld:fiware_carros_monitor/attributes/speed_carro1?lastN=26", requestOptions),
        fetch("/api/STH/v1/contextEntities/type/CarMonitoring/id/urn:ngsi-ld:fiware_carros_monitor/attributes/speed_carro2?lastN=26", requestOptions)
      ]);

      const dataPromises = responses.map(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      });

      const dataResults = await Promise.all(dataPromises);
      // armazena os dados pulando de 5 em 5, ou seja, de 50 dados pega os dados 50, 45, 40, etc...
      const newData = dataResults[0].contextResponses[0].contextElement.attributes[0].values.map((item, index) => {
         // Cria um objeto Date a partir da string recvTime
         const date = new Date(item.recvTime);
         // Formata a data para mostrar apenas horas, minutos e segundos
         const formattedTime = date.toLocaleTimeString('pt-PT', { timeZone: 'UTC' });

        return {
          date: formattedTime,
          speed_carro1: item.attrValue.velocidade,
          speed_carro2: dataResults[1].contextResponses[0].contextElement.attributes[0].values[index].attrValue.velocidade
        }
        
      });

      // Atualiza o estado com os novos dados, adicionando o novo dado no início
      setChartData(newData);

    } 
    
    catch (error) {
      console.error(error);
    }
  };

  // Atualiza os dados do gráfico a cada 1 segundos
  useEffect(() => {
    fetchChartData();
    const interval = setInterval(fetchChartData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LineChart
      className="text-lg grafico"
      data={chartData}
      index="date"
      categories={['speed_carro1', 'speed_carro2']}
      colors={['blue', 'red']}
      yAxisWidth={56}
      xAxisLabel="Tempo" // Rótulo do eixo X
      yAxisLabel="Velocidade (km/h)" // Rótulo do eixo Y
    />
  );
}
