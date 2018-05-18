const newForm = (db) => {
    return (request, response) => {

        db.event.newForm(request.cookies, (error, queryResult) => {
            if (error) {
                response.sendStatus(500);
            } else {
                let context = {
                    loggedIn: request.cookies["loggedIn"],
                    username: request.cookies["username"],
                    user: queryResult.rows[0]
                };

                response.render('event/new', context);
            }
        });
    };
};

const create = (db) => {
    return (request, response) => {
        db.event.create(request.body, (error, queryResult) => {
            if (error) {
                response.sendStatus(500);
            }
            if (queryResult.rowCount >= 1) {
                console.log('Event is created Successfully');
            } else {
                console.log("Event is created");
            }
            let content = {
                loggedIn: request.cookies['loggedIn'],
                username: request.cookies['username'],
                event: queryResult.rows[0]
            };
            response.redirect('/' + request.params.userid + '/event');
        });
    };
};



/**
 * ================================================
 * Export Controller Functions as a module
 * ================================================
 */
module.exports = {
    newForm,
    create
};