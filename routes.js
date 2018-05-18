const users = require('./controllers/user');
const events = require('./controllers/event');
const sessions = require('./controllers/session');

module.exports = (app, db) => {

/** 
 * =============================
 * Users
 * =============================
 */

    // CRUD users
    app.get('/user/new', users.newForm(db));
    app.post('/user', users.create(db));
    app.get('/:id/event', users.get(db));
    

    // Authentication
    app.delete('/:id/logout', users.logout);
    app.get('/user/login', users.loginForm(db));
    app.post('/user/login', users.login(db));

/**
 * ===============================
 * Events
 * ===============================
 */
    app.get('/:userid/event/new', events.newForm(db));
    app.post('/:userid/event', events.create(db));

/**
 * ================================
 * Sessions
 * ================================
 */
    app.get('/:userid/event/:id/session/new', sessions.newForm(db));
    app.post('/:userid/event/:id/session', sessions.create(db));
};