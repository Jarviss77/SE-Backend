import bcrypt from 'bcrypt';
import prisma from '../config/db.config.js';
import {
    response_200,
    response_500
} from '../utils/statuscodes.utils.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(req, res){
    try {
        const {FirstName, LastName, email, password} = req.body;

        const userAlreadyPresent = await prisma.user.findUnique({
            where: {
                Email: email
            }
        });

        if (userAlreadyPresent) {
            console.log('Error creating user: User already exists in the DB');
            return response_200(res,'User already exists in the DB');
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                FirstName: FirstName,
                LastName: LastName,
                Email: email,
                Password: securePassword,
            }
        });

        const token = jwt.sign({userID: user.id, FirstName: user.FirstName,  LastName:user.LastName },JWT_SECRET,{expiresIn:'2d'})

        return response_200(res,'User created successfully',{
            user: user,
            token:token
        });
    }
    catch (error) {
        response_500(res, 'Error creating user', error);
    }
}

export async function login(req, res){
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                Email: email
            }
        });

        if (!user) {
            console.log('Error logging in: User does not exist');
            return response_200(res,'User does not exist');
        }

        const validPassword = await bcrypt.compare(password, user.Password);

        if (!validPassword) {
            console.log('Error logging in: Password is incorrect');
            return response_200(res,'Password is incorrect');
        }

        const token = jwt.sign({userID: user.id, FirstName: user.FirstName,  LastName:user.LastName },JWT_SECRET,{expiresIn:'2d'})

        return response_200(res,'Logged in successfully',{
            user: user,
            token:token
        });
    }
    catch (error) {
        response_500(res, 'Error logging in', error);
    }
}

