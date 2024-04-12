import prisma from '../config/db.config.js';
import { response_201, response_400, response_500 } from '../utils/statuscodes.utils.js';
import { userRole } from '@prisma/client';

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

      const member = await prisma.member.create({
          data: {
              UserId: createdById,
              OrganizationId: organization.id,
              UserRole: userRole.ASSIGNER,
          }
      })

      response_201(res, "Organisation Created", organization);
    } catch (error) {
      response_500(res, 'Error creating organization:', error);
    }
  }


export async function getOrganisation ( req, res) {
    try {
      const organisation = await prisma.organization.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          Tasks: true,
          Member: true
        }
      });
      if(!organisation){
        return response_400(res, "Organisation not found");
      }
      response_201(res, "Organisation Found", organisation);
    } catch (error) {
      response_500(res, 'Error getting organization:', error);
    }
  }