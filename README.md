Vamos detalhar o fluxo de dados no sistema de monitoramento de carros usando o simulador Wokwi com uma configuração do FIWARE que inclui o Orion Context Broker, IoT Agent MQTT, STH-Comet, MongoDB, e Mosquitto.

1. Visão Geral do Sistema
* Simulador Wokwi (ESP32): Envia os dados de velocidade e ultrapassagem de dois carros através de sensores ultrassônicos. Esses dados são transmitidos via MQTT.
* IoT Agent MQTT: Atua como uma ponte entre os dispositivos IoT (ESP32) e o Orion Context Broker. Ele converte as mensagens MQTT em formato NGSI.
* Orion Context Broker: Gerencia o contexto das entidades (no seu caso, os carros). Armazena e disponibiliza as informações de velocidade e ultrapassagem em tempo real.
* STH-Comet: Armazena dados históricos, permitindo que você consulte o histórico dos atributos.
* MongoDB: Banco de dados usado pelo Orion e pelo STH-Comet para armazenar o estado atual e os dados históricos das entidades.
* Mosquitto: O broker MQTT que gerencia as mensagens publicadas/subscritas pelos dispositivos IoT e o IoT Agent.

<h1> Fluxo de Dados em Tempo Real </h1>
Requisição:
GET http://{{url}}:1026/v2/entities/urn:ngsi-ld:fiware_carros_monitor/attrs/?attrs=speed_carro1,speed_carro2

* ESP32 + Sensores Ultrassônicos: Os sensores no Wokwi detectam a velocidade dos carros e enviam os dados via MQTT para o Mosquitto Broker.

* Mosquitto Broker: O broker recebe os dados de velocidade publicados pelo ESP32.

* IoT Agent MQTT: O IoT Agent MQTT escuta as mensagens do Mosquitto. Quando uma mensagem (por exemplo, a velocidade de um carro) é recebida, o IoT Agent converte essa mensagem MQTT em formato NGSI, que é compreensível pelo Orion.

Orion Context Broker:

O IoT Agent envia os dados de velocidade no formato NGSI para o Orion.
O Orion Context Broker atualiza o estado da entidade urn:ngsi-ld:fiware_carros_monitor, que contém os atributos speed_carro1 e speed_carro2.
Requisição GET ao Orion:

* A requisição GET http://{{url}}:1026/v2/entities/urn:ngsi-ld:fiware_carros_monitor/attrs/?attrs=speed_carro1,speed_carro2 consulta diretamente o Orion.
O Orion responde com o estado atual dos atributos speed_carro1 e speed_carro2, que foram atualizados pelo IoT Agent com os dados enviados pelos sensores do ESP32.

<h1> Fluxo de dados históricos </h1>

1- STH-Comet: É responsável por capturar e armazenar os dados históricos das entidades gerenciadas pelo Orion Context Broker.

2 - Toda vez que o Orion Context Broker recebe uma atualização dos atributos (como ultrapassagem_carro1), ele também notifica o STH-Comet para registrar essa mudança no banco de dados.
MongoDB: O STH-Comet armazena essas informações históricas no MongoDB. Cada vez que o atributo ultrapassagem_carro1 é atualizado, o valor é registrado com um timestamp.

3 - Requisição GET ao STH-Comet:

* Quando você faz a requisição GET para o STH-Comet, ele consulta o MongoDB e retorna os últimos 30 valores registrados do atributo ultrapassagem_carro1.

### Esquema geral do fluxo

    ESP32 (sensores) ---> Mosquitto (MQTT Broker) --->  IoT Agent (MQTT to NGSI) ---> Orion Context Broker (Dados em tempo real)    
                                                                                   |
                                                                           STH-Comet (Dados históricos / recebe notificações)
                                                                                   |
                                                                                 MongoDB

<h2>Como funciona o Docker Compose no seu sistema?</h2>

Ao rodar o comando docker-compose up, o Docker Compose cria e inicia todos os contêineres definidos no arquivo docker-compose.yml.
Todos os contêineres são isolados, mas podem se comunicar uns com os outros através de uma rede interna definida pelo Compose.

* O Orion pode se comunicar com o MongoDB e o IoT Agent.
* O STH-Comet pode se conectar ao MongoDB para armazenar dados históricos.
* O Mosquitto está disponível para os dispositivos (ESP32) para lidar com mensagens MQTT.
4. Vantagens de usar Docker Compose:
* Facilidade de Deploy: Um único comando (docker-compose up) pode inicializar todo o ambiente de monitoramento, criando e configurando todos os contêineres necessários.
* Isolamento: Cada serviço tem seu ambiente isolado. Isso evita problemas como conflito de dependências ou incompatibilidades de versão.
* Portabilidade: O ambiente pode ser facilmente replicado em outro computador ou servidor. Basta ter o Docker e o arquivo docker-compose.yml.
* Escalabilidade: Você pode escalar seus serviços com facilidade. Por exemplo, pode aumentar o número de instâncias do Orion Context Broker ou do MongoDB caso precise de mais capacidade.
5. Fluxo de Dados com Docker Compose
O fluxo de dados que explicamos antes continua o mesmo, mas com os serviços agora rodando em contêineres, orquestrados pelo Docker Compose:

6. Resumo:
Cada componente do sistema (Orion, IoT Agent, etc.) está sendo executado em contêineres Docker.
O Docker Compose é responsável por definir e orquestrar esses contêineres, facilitando o gerenciamento do sistema como um todo.
Cada serviço tem sua configuração definida no arquivo docker-compose.yml, permitindo fácil deploy e configuração, além de comunicação entre serviços via redes internas do Docker.
Isso torna seu sistema mais modular, portátil e fácil de gerenciar, o que é especialmente útil para projetos complexos como o seu.
