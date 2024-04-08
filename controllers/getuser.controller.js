import  { response_500, response_200,response_404 } from '../utils/statuscodes.utils.js';
import prisma from '../config/db.config.js';

export async function getUser (req, res) {
    try {
        const user = await prisma.user.findUnique({where: {id: req.user.id}});
        if (!user) {
            response_404(res, 'User not found');
        }
        response_200(res, "user fetched successfully",user);  
    } catch (error) {
        response_500(res, 'Error getting UserId:', error);
    }
};