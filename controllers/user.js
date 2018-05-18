/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

const get = (db) => {
    return (request, response) => {

        db.user.get(request.params.id, (error, queryResult, err, result) => {

            if (error) {
                response.sendStatus(500);
            } else {
                let context = {
                    loggedIn: request.cookies['loggedIn'],
                    username: request.cookies['username'],
                    user: queryResult.rows[0],
                    event: result.rows
                };
                response.render('user/event', context);
            }
        });
    };
};

const newForm = (db) => {

    return (request, response) => {
        let loggedIn = request.cookies['loggedIn'];

        if (request.cookies['loggedIn'] === 'true') {
            db.user.get(request.body, (error, queryResult, err, result) => {
                
                if (error) {
                    response.sendStatus(500);
                } else {

                    let context = {
                        loggedIn: request.cookies['loggedIn'],
                        username: request.cookies['username'],
                        user: queryResult.rows[0],
                        event: result.rows
                    };
                    response.render('user/event', context);
                }
            });

        } else {
            response.render('user/new');
        }
    };
};

const create = (db) => {
    return (request, response) => {
        //create new user entry in database
        db.user.create(request.body, (error, queryResult) => {
            
            if (error) {
                console.error('error!!! ', error);
            }
            
            if (queryResult.rowCount >= 1) {
                console.log('User created successfully');
                
                // drop cookies to indicate user's logged in status and username
                response.cookie('loggedIn', true);
                response.cookie('username', request.body.username);
                
                let context = {
                    loggedIn: request.cookies['loggedIn'],
                    username: request.cookies['username'],
                    user: queryResult.rows[0]
                };
                
                //render to user page
                response.redirect('/' + context.user.id + '/event');
                
            } else {
                console.log('User could not be created');
                response.sendStatus(500);
            }
        });
    };
};

const loginForm = (db) => {
    return (request, response) => {
        let loggedIn = request.cookies['loggedIn'];
        let username = request.cookies['username'];

        if (request.cookies['loggedIn'] === 'true') {
            
            db.user.loginForm(request.body, (error,queryResult) => {

                let context = {
                    loggedIn: request.cookies['loggedIn'],
                    username: request.cookies['username'],
                    user: queryResult.rows[0]
                };

                response.render('user/user');
            });
        } else {
            response.render('user/login');
        }
    }
};

const login = (db) => {
    return (request, response) => {
        db.user.login(request.body, (error, queryResult) => {
            if (queryResult) {
                response.cookie('loggedIn', true);
                response.cookie('username', request.body.username);
                let context = {
                    loggedIn: request.cookies['loggedIn'],
                    username: request.cookies['username'],
                    user: queryResult.rows[0]
                };

                response.cookie('loggedIn', true);
                response.cookie('username', context.user.username);
                response.redirect('/' + context.user.id + '/event');

            } else {
                response.render('user/login');
            }
        });
    };
};

const logout = (request, response) => {
    response.clearCookie('loggedIn');
    response.clearCookie('username');
    response.redirect('/');
};

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
    get,
    newForm,
    create,
    logout,
    loginForm,
    login
};