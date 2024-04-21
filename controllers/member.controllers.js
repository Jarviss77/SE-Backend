import prisma from '../config/db.config.js';
import {
    response_200,
    response_500,
    response_400
} from '../utils/statuscodes.utils.js';

export async function getmember(req, res) {
    try{

        const member = await prisma.member.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                User: true,
                AssignedTasks: true,
                TodoTasks: true,
            }
        }
        )

        if(!member){
            return response_400(res, "Member not found");
        }

        return response_200(res, "Member found", member);
    }
    catch (error){
        response_500(res, "Server Error", error);
    }
}


