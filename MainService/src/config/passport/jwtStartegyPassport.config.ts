import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithRequest } from 'passport-jwt';
import passport from 'passport';



const jwtSecret = () => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return process.env.JWT_SECRET;
}


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret(),
};


// JWT strategy callback function
const jwtStrategyVerifyCallback = async (jwt_payload: any, done: any) => {
    try {
        const user = {
            userName: jwt_payload.userName,
            sub: jwt_payload.sub,
            role: jwt_payload.role,
        }


        return done(null, user);

    } catch (error) {
        console.log('Error in jwtStrategyVerifyCallback', error);
        return done(error, false);
    }
};

// Use JWT strategy with Passport
passport.use(new JwtStrategy(options, jwtStrategyVerifyCallback));

export default passport;
