import { response_200, response_400, response_500 } from '../utils/statuscodes.utils.js';
import prisma from '../config/db.config.js';

export async function isAssigner(req, res)  {
  try {

    const member = await prisma.member.findFirst({
      where: {
        UserId: req.user.id,
        OrganizationId: req.body.OrganizationId,
      }
    });

    if(!member){
        return response_400(res, 'User not found in organization');
    }

    console.log(member);
    // Extract user role from membership
    const userRole = member.UserRole;

    // Check if user is an assignee
    if (userRole === 'ASSIGNER') {
      next();
    }
  } catch (error) {
    // Handle errors
    response_500(res, 'Error fetching user:', error);
  }
};
