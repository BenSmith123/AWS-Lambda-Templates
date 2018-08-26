const mysql = require('mysql');
const db_credentials = require('./credentials.json');

async function getUserRecords() {
    return new Promise((resolve, reject) => {

            const connection = mysql.createConnection({
                host: db_credentials.host,
                user: db_credentials.user,
                password: db_credentials.password,
                database: db_credentials.database
            });
  
            try {
                connection.connect(function(err) {

                    if (!err) {
                        console.log("Connected!");

                        connection.query('SELECT * FROM MY_DATABASE_TABLE', function (error, results) {
                            if (error) {
                                connection.destroy();
                                reject(error)
                            } else {
                                connection.end();
                                resolve(results);
                            }
                        });
                    } else {
                        console.log("[ERROR] - database CONNECTION failure", err);
                    }
                });

            } catch (error) {
                console.log("[ERROR]", error)
            }

        });

}

module.exports = { getUserRecords };


// EXAMPLE: Query the now-api
// async function getShows() {
//     return new Promise((resolve, reject) => {
//         https.get('https://now-api4-prod.mediaworks.nz/v4/shows', (res) => {
//             try {
//                 let body = '';
    
//                 res.on('data', (chunk) => {
//                     body += chunk;
//                 });
    
//                 res.on('end', async () => {
//                     const data = JSON.parse(body);
//                     resolve(data.shows);
//                 });
//             } catch (err) { reject(err); }
//         });
//     });
// }
