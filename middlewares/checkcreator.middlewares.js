import { response_404, response_500 } from "../utils/statuscodes.utils.js";
import prisma from '../config/db.config.js';

export async function checkCreator(req, res, next) {

    try {
        const memberId = req.params.id;

        const member = await prisma.member.findUnique({
            where: {
                id: memberId,
            },
            include: {
                User: true,
                Organization: true,
            }
        });
        if(!member){
            return response_404(res, "Member not found");
        }
        // find organisation through org id in member
        const organisation = await prisma.organization.findUnique({
            where: {
                id: member.OrganizationId,
            },
        });
        if(!organisation){
            return response_404(res, "Organisation not found");
        }
        if(member.UserId === organisation.CreatedById){
            next();
        }
    } catch (error) {
        response_500(res, 'Error checking creator:', error);
    }
};
