import redis, { RedisClientOptions, RedisClientType, createClient } from 'redis';


export default class RedisConfig {
    private static instance: any;


    static getRedisClient = async (): Promise<RedisClientType> => {

        if (!this.instance) {
            await this.connect();
        }
        return this.instance;

    }

    static connect = async () => {
        const url = process.env.REDIS_URL;
        if (!url)
            throw new Error("No Redis url was provided!");

        const redisClient = createClient({
            url
        });

        const connectin = await redisClient.connect();
        if (connectin) {
            console.log("Redis connected successfully");
        }



        this.instance = redisClient;
    }

}
