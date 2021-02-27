const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize() {
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email)
        if (user ==null){
            return done(null, false, {message: 'NO user with that email'})
        }

        try{
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password Incorrect'})
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}), authenticateUser)
    passport.serializeuser((user, done) => { })
    passport.deserializeUser((id, done) => { })
}

module.exports = initialize