/**
 * ========================================
 * User model functions
 *==========================================
 */

const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPool) => {
    
    return {

        get: (id, callback) => {
            const queryString = "SELECT * FROM users WHERE id = $1";
            const VALUES = [id];

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                const qStr = 'SELECT * FROM events WHERE userid = $1';
                const val = [id];
                dbPool.query(qStr, val, (err, result) => {
                    callback(error, queryResult, err, result);
                });
            });
        },

        create: (user, callback) => {
            //run user input password through bcrypt to obtain hashed password
            bcrypt.hash(user.password, 10, (err, hashed) => {
                if (err) console.error('error!', err);

                //setup query
                const queryString = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
                const values = [
                    user.username,
                    user.email,
                    hashed
                ];

                //execute query
                dbPool.query(queryString, values, (error, queryResult) => {
                    
                    callback(error, queryResult);
                });
            });
        },

        login: (user, callback) => {
            const queryString = "SELECT * FROM users WHERE email = $1";
            const VALUES = [user.email];
            dbPool.query(queryString, VALUES, (error, queryResult) => {
                bcrypt.compare(user.password, queryResult.rows[0].password, (err, res) => {
                    if (res) {
                        callback(error, queryResult);
                    } else {
                        callback(error, false);
                    }
                });
            });
        }
    };
};