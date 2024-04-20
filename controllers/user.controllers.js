import  { response_500, response_200,response_404 } from '../utils/statuscodes.utils.js';
import prisma from '../config/db.config.js';

export async function getUser (req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            include: {
                Memberships: {
                    include: {
                        Organization: true,
                        AssignedTasks: true,
                        TodoTasks: true
                    },
                }
            }
        });
        if (!user) {
            response_404(res, 'User not found');
        }
        response_200(res, "user fetched successfully",user);
    } catch (error) {
        response_500(res, 'Error getting UserId:', error);
    }
}

export async function getUsers (req, res) {
    try {
        const users = await prisma.user.findMany();
        response_200(res, "users fetched successfully",users);
    } catch (error) {
        response_500(res, 'Error getting UserId:', error);
    }
}

export async function updateUser (req, res) {
    try{
        const {FirstName, LastName, About, Bio, City, State} = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                FirstName,
                LastName,
                About,
                Bio,
                City,
                State
            }
        });
        response_200(res, "user updated successfully", updatedUser);
    }
    catch (error) {
        response_500(res, 'Error updating user:', error);
    }
}
