import { Strategy as LocalStrategy } from "passport-local";
import UserService from "../../services/user.service";
import Bcrpt from "bcrypt";
import passport from "passport";


const userService = new UserService();


const localStrategyVerifyCallback = async (credential: string, password: string, done: any) => {

    try {
        const user = await userService.findUserByEmailOrUsername(credential);
        // user not found
        if (!user) {
            return done(null, false, { message: "Invalid credentials." });
        }
        // compare the password
        const passwordMatch: Boolean = await Bcrpt.compare(password, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: "Invalid credentials." });
        }
        // user found and password matched
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }

}


passport.use(
    new LocalStrategy(
        { usernameField: "credential" },
        localStrategyVerifyCallback
    )
);

