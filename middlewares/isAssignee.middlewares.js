import { response_200, response_403 } from "../utils/statuscodes.utils.js";
import prisma from '../config/db.config.js';

export async function isAssignee(memberId)  {
  try {
    // Fetch user membership
    const membership = await prisma.membership.findFirst({
      where: {
        memberId: memberId
      }
    });
    // Extract user role from membership
    const userRole = membership ? membership.UserRole : null;

    // Check if user is an assignee
    if (userRole === 'assignee') {
      response_204(res, "User is an assignee");
    }
    else{
      response_403(res, 'You are not allowed to perform this action');
    }
  } catch (error) {
    // Handle errors
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user information');
  }
};