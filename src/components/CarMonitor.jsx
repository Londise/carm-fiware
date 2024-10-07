import { CarMonitoringStyle } from "../css/CarMonitoringStyle";
import { useEffect, useState } from "react";
import pilot1 from "../assets/img/simulador/pilot1.png";
import pilot2 from "../assets/img/simulador/pilot2.png";
import fiware from "../assets/img/simulador/fiware.png";
import GraficoDeCurva from "./GraficoDeCurva";
import GraficoDeBarras from "./GraficoDeBarras";

const CarMonitor = () => {
  const url = "20.206.249.58";

  const myHeaders = new Headers();
  myHeaders.append("fiware-service", "smart");
  myHeaders.append("fiware-servicepath", "/");
  myHeaders.append("accept", "application/json");

  const [velocidade1, setVelocidade] = useState(0);
  const [velocidade2, setVelocidade2] = useState(0);
  const [ultrapassagem1, setUltrapassagem] = useState(0);
  const [ultrapassagem2, setUltrapassagem2] = useState(0);

  const fetchSpeed = () => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      '/api/v2/entities/urn:ngsi-ld:fiware_carros_monitor/attrs/?attrs=speed_carro1,speed_carro2',
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const velocidade1 = data.speed_carro1.value.velocidade;
        const velocidade2 = data.speed_carro2.value.velocidade;
        setVelocidade(velocidade1);
        setVelocidade2(velocidade2);
      })
      .catch((error) => console.error("Houve um erro na requisição", error));
  };

  const fetchOvertakings = () => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      '/api/v2/entities/urn:ngsi-ld:fiware_carros_monitor/attrs/?attrs=ultrapassagem_carro1,ultrapassagem_carro2',
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const ultrapassagem1 = data.ultrapassagem_carro1.value.ultrapassagem_carro1;
        const ultrapassagem2 = data.ultrapassagem_carro2.value.ultrapassagem_carro2;
        setUltrapassagem(ultrapassagem1);
        setUltrapassagem2(ultrapassagem2);
      })
      .catch((error) => console.error("Houve um erro na requisição", error));
  };

  useEffect(() => {
    // Atualiza a velocidade a cada 150ms
    fetchSpeed();
    const speedInterval = setInterval(fetchSpeed, 150);

    // Limpeza do intervalo ao desmontar o componente
    return () => clearInterval(speedInterval);
  }, []);

  useEffect(() => {
    // Atualiza as ultrapassagens a cada 5 segundos
    fetchOvertakings();
    const overtakingInterval = setInterval(fetchOvertakings, 5000);

    // Limpeza do intervalo ao desmontar o componente
    return () => clearInterval(overtakingInterval);
  }, []);

  return (
    <CarMonitoringStyle>
      <div className="container padding-bottom-300 padding-top-300">
        <h1 className="title padding-bottom-100">Car Monitoring</h1>

        <div className="wokwi-data">
          <iframe src="https://wokwi.com/projects/410197062303394817"></iframe>
          <img src={fiware} id="fiware"/>

          <div className="pilots-data">
            <div className="card">
              <div className="pilot-info">
                <img src={pilot1} />
                <p className="pilot-name">Corredor 1</p>
              </div>

              <div className="speed">
                <h1>Velocidade</h1>
                <p className="data">{velocidade1}</p>
              </div>

              <div className="overtakens">
                <h1>Ultrapassagens</h1>
                <p className="data">{ultrapassagem1}</p>
              </div>
            </div>

            <div className="card">
              <div className="pilot-info">
              <img src={pilot2} />
                <p className="pilot-name">Corredor 2</p>
              </div>

              <div className="speed">
                <h1>Velocidade</h1>
                <p className="data">{velocidade2}</p>
              </div>

              <div className="overtakens">
                <h1>Ultrapassagens</h1>
                <p className="data">{ultrapassagem2}</p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="graphic-wrapper padding-top-400">
          <div className="tremor">
            <h1 className="graphic-title">Velocidade conforme o Tempo</h1>
            <GraficoDeCurva/>
          </div>
          <div className="tremor">
            <h1 className="graphic-title">Ultrapassagens</h1>
            <GraficoDeBarras ultrapassagem1={ultrapassagem1} ultrapassagem2={ultrapassagem2} />
          </div>
        </div>
      </div>
    </CarMonitoringStyle>
  );
};

export default CarMonitor;
