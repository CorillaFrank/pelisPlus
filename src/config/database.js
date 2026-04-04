import pg  from 'pg'; // Import the pg library for PostgreSQL

 const pool = new pg.Pool({
    user: process.env.DB_USER, // Database username from environment variable
    host: process.env.DB_HOST, // Database host from environment variable
    database: process.env.DB_NAME, // Database name from environment variable
    password: process.env.DB_PASSWORD, // Database password from environment variable
    port: process.env.DB_PORT, // Database port from environment variable

    ssl: {
        rejectUnauthorized: false, // Disable SSL certificate validation (use with caution in production)
    },
 }); // Create a new connection pool

 export async function conectar(){
    try {
        const client =await pool.connect();
        console.log('Conexión a la base de datos establecida');
        client.release(); // Release the client back to the pool after use
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }

 }
 export default pool; // Export the connection pool for use in other parts of the application