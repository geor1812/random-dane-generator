import 'dotenv/config';

export default {
    host: process.env.RDG_HOST,
    port: Number(process.env.RDG_PORT),
    user: process.env.RDG_USER,
    password: process.env.RDG_PASSWORD,
    schema: process.env.RDG_SCHEMA,
}