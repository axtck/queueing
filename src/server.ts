import express from "express";
import envv from "./config/envConfig";
import api from "./api";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import amqp from "amqplib/callback_api";

const app = express();

// basic middleware
app.use(morgan("short"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// connect to Rabbit MQ
amqp.connect("amqp://localhost:5672", (error, connection) => {
    if (error) throw new Error("connect");

    connection.createChannel((error2, channel) => {
        if (error2) throw new Error("createChannel");

        channel.assertQueue(envv.queueName, {
            durable: false
        });

        channel.sendToQueue(envv.queueName || "queue", Buffer.from("Test"));
        console.log("Sent");
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "TS setup!"
    });
});

app.use("/api/v1", api);

const port = envv.port || 3001;
app.listen(port, () => {
    console.log(`Listening on ${port}.`);
});