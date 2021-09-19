# Queueing

***Message queueing with RabbitMQ***

---

## Setup

Setup Rabbit MQ Broker with Docker

```bash
# clone this repo
git clone https://github.com/axtck/queueing.git
npm install

# run management container 
# map 15672 to enable management on localhost:8081
# map 5672 to connect application to
docker run -d -p 8081:15672 -p 5672:5672 rabbitmq:3.9.5-management
```

Visit [localhost:8081](http://localhost:8081)
* default username: guest
* default password: guest

*Configurable with environment variables

```bash
# run server
# development
npm run dev

# production
npm run build
npm start
```
