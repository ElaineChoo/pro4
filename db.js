/**
 * Postgres database configuration
 */

const pg = require('pg');
const user = require('./models/user');
const event = require('./models/event');
const session = require('./models/session');

const configs = {
    user: 'postgres',
    password: '13Dec1985',
    host: '127.0.0.1',
    database: 'project4',
    port: 5433
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});

module.exports = {
    pool: pool,
    user: user(pool),
    event: event(pool),
    session: session(pool)
};