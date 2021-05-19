import express from 'express';

import * as auth from '../controller/UserController.js';

const router = express.Router();

router.post('/register', auth.Register);

router.post('/login', auth.Login);

export { router };
