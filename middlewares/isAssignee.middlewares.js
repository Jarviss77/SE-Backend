import { response_200, response_500 } from "../utils/statuscodes.utils.js";
import prisma from '../config/db.config.js';

export async function isAssignee(req, res)  {
  try {

    // Extract user ID from request
    const memberId = req.body.id;
    // Fetch user membership
    const member = await prisma.member.findUnique({
      where: {
        id: memberId,
      }
    });

    console.log(member);
    // Extract user role from membership
    const userRole = member.UserRole;

    // Check if user is an assignee
    if (userRole === 'ASSIGNEE') {
      next();
    }
  } catch (error) {
    // Handle errors
    response_500(res, 'Error fetching user:', error);
  }
};