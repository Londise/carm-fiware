import styled from "styled-components";


export const CarMonitoringStyle = styled.section`

@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');

color: white;

iframe {
    max-width: 600px;
    border: none;
    width: 40%;
}

.title {
    text-align: center;
    font-size: 8rem;
    color: black;
}

.wokwi-data{
    position: relative;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.7);
}

#fiware{
    position: absolute;
    width: 150px;
    height: 100px;
    bottom: -100px;
    left: -20px;
}

.pilots-data {
  display: grid;
  width: 61%;
  grid-template-rows: repeat(2, 1fr);
}

.pilots-data h1 {
    font-size: 3rem;
}

.data {
    text-align: center;
    font-family: "Zilla Slab", serif;
    font-size: 9rem;
    font-weight: 900;
    font-style: italic;
}

.card {
    padding: 0 3rem;
    display: flex;
    gap: 8rem;
    
}   


.card:first-of-type{ 
    background: linear-gradient(90deg, #333333 20%, #ff0000 100%); 
    position: relative;
}

.card:first-of-type::before {
    position: absolute;
    content: "";
    height: 3px;
    width: 95%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    bottom: 0;
    right: 0;
    background: #252525;
}

.card:nth-of-type(2){ background: linear-gradient(90deg, #333333 20%, #48ADFA 100%);  }

.card .pilot-info {
    position: relative;
}

.card .pilot-name {
    position: absolute;
    white-space: nowrap;
    font-size: 2.5rem;
    bottom: .5rem;
    left: 50%;
    transform: translateX(-50%);
}

.card img {
    height: 190px;
    min-width: 100%;
}

.speed, .overtakens {
    padding-top: 5rem;
}


.graphic-wrapper {
    display: flex;
    justify-content: center;
    gap: 5rem;
}

.graphic-title {
    text-align: center;
    font-size: 40px;
    color: black;
}

.grafico {
    height: 400px;
    width: 50vw;
}

.grafico-barras {
    width: 30vw;
    height: 350px;
}

.grafico tspan {
    font-size: 20px;
}

@media (prefers-color-scheme: dark) {
    .recharts-text.fill-tremor-content-emphasis {
        fill: #000; /* Define a cor do texto para preto, usando !important se necessário */
    }
}

.recharts-legend-wrapper p {
    font-size: 17px;
}

.recharts-cartesian-axis-ticks tspan {
    font-size: 15px;
}



`