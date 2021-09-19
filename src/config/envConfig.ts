import * as dotenv from "dotenv";
dotenv.config();

const config = {
    port: process.env.PORT,
    queueName: process.env.QUEUE_NAME
};

export default config;