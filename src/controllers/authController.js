import {authService} from "../services/authService.js";

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    const response = await authService.signUp({name, email, password});
  
    return res.status(201).send(response);
};

export async function signIn(req, res) {
    const { email, password } = req.body;

    const response = await authService.signIn({email, password});

    return res.status(200).send(response);
};