// /* eslint-disable no-undef */
// import pkg from 'pg';
// import dotenv from 'dotenv';

// dotenv.config(
//     {
//         path: '../.env'
//     }
// );

// const  { Client } = pkg;


// const client = new Client ({
//     // user: "Vanessa",
//     // host: "localhost",
//     // database: "postgres",
//     // password: "vanessa",
//     // port : 5432
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: String(process.env.PG_PASSWORD),
//     port: process.env.PG_PORT
// })

// // async function connect(){
// //     try{
// //         await client.connect();
// //         const res = await client.query('SELECT * FROM users');
// //         console.log("Connected to Database");
        
// //         console.log(JSON.stringify(res.rows, null, 2));

// //     }
// //     catch(err){
// //         console.log(err);
// //     }
// //     finally{
// //         await client.end();
// //     }
// // }

// // connect();


// client.connect()
//     .then(() => console.log("✅ PostgreSQL Connected"))
//     .catch(err => console.error("❌ PostgreSQL Connection Error:", err));

// export default client;