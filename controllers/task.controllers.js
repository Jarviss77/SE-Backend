import prisma from '../config/db.config.js';
import { response_201, response_400, response_500 } from '../utils/statuscodes.utils.js';


export async function createTask(req, res) {
  const { Title, Description, assigneeId, OrganizationId, StartDate, EndDate } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        Title,
        Description,
        assigneeId,
        OrganizationId,
        StartDate,
        EndDate
      }
    });

    response_201(res,newTask);
 
  } catch (error) {
    response_500(res,'error creating new task', error)
  }
}
