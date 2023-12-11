import {authRepository} from "../repositories/authRepository.js";
import { errors } from "../utils/errors.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

async function signUp({name, email, password}) {
    try {
        const user = await authRepository.findUser({email});
        if (user) throw errors.emailConflict();
    } catch (error) {
        return error;
    }

    const hash = bcrypt.hashSync(password, 10);
    return await authRepository.createUser({ name, email, password: hash });
}

async function signIn({email, password}) {
    const user = await authRepository.findUser({email});
    if(!user) throw errors.notFound('User');

    if(user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        
        await authRepository.createSession({userId: user._id, token});

        return {user, token};
    } else {
        throw errors.incorrectPassword();
    }
}

export const authService = {signIn, signUp}