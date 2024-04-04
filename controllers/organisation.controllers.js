import prisma from '../config/db.config.js';
import { response_200, response_400, response_500 } from '../utils/statuscodes.utils.js';

export async function createOrganisation ( req, res) {
    try {
      const { name } = req.body;
      const createdById = req.user.id; 
      
      const organization = await prisma.organization.create({
        data: {
          Name: name,
          CreatedById: createdById,
        },
      });
      
      response_200(res, organization);
    } catch (error) {
      response_500(res, 'Error creating organization:', error);
    }
  };