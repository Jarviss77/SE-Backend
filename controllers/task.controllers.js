import prisma from '../config/db.config.js';
import { response_201, response_400, response_500 } from '../utils/statuscodes.utils.js';


export async function createTask(req, res) {
  try {
    const { Title, Description, OrganizationId, StartDate, EndDate, AssignerId } = req.body;

    const organisation = await prisma.organization.findUnique({
      where: {
        id: OrganizationId
      }
    });

    if (!organisation) {
        return response_400(res, 'Organisation does not exist');
    }


    const newTask = await prisma.task.create({
      data: {
        Title,
        Description,
        assignerId: AssignerId,
        OrganizationId,
        StartDate,
        EndDate
      }
    });

    response_201(res,"Task Created", newTask);

  } catch (error) {
    response_500(res,'error creating new task', error)
  }
}

export async function assignTask(req,res){
  try {
    const { AssigneeID } = req.body;
    const task = await prisma.task.findUnique({
      where: {
        id: req.params.id
      }
    })
    if(!task){
      return response_400(res, 'Task not found');
    }
    const updatedTask = await prisma.task.update({
      where: {
        id: task.id
      },
      data: {
        assigneeId: AssigneeID
      }
    })
    response_201(res, 'Task assigned successfully', updatedTask);

  }
  catch(error)
  {
    response_500(res, 'Error assigning task', error);
  }
}
