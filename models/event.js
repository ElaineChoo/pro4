module.exports = (dbPool) => {
    return {
        newForm:(req, callback) => {
            let username = req['username'];
            let queryString = 'SELECT * from users WHERE username = $1';
            let VALUES = [username];
            dbPool.query(queryString, VALUES, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        create:(event, callback) => {
            const queryString = 'INSERT INTO events (event_name, venue, start_date, no_of_days, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const VALUES = [
                event.event_name,
                event.venue,
                event.start_date,
                event.no_of_days,
                event.userid
            ];
            
            console.log('in event models create, VALUES= ', VALUES);

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    }
}