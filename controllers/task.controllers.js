import { check } from 'prisma';
import { taskStatus } from '@prisma/client';
import prisma from '../config/db.config.js';
import { response_200, response_201, response_400, response_500 } from '../utils/statuscodes.utils.js';


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


export async function getUnassignedTasks(req,res){
  try{
        const organisationId = req.params.id;
        console.log(req.params.id)
        const checkOrganisation = await prisma.organization.findUnique({
          where: {
            id : organisationId
          }
        })
        if(!checkOrganisation){
          response_400(res, "Organisation Not Found")
        }
        const unassignedTasks = await prisma.task.findMany({
          where: {
            OrganizationId: organisationId,
            Assignee : null
          }
        })
        response_200(res, "Unassigned Tasks Returned", unassignedTasks);
  }
  catch(error)
  {
    response_500(res, 'Unable to return unassigned tasks', error);
  }
}
export async function taskCompleted(req, res) {
  try {
    const taskId = req.params.id;
    
    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      }
    });
    if (!task) {
      return response_400(res, "Task Not Found");
    }
    if (!task.assigneeId) {
      return response_400(res, "Task not assigned due to absence of an assignee");
    }
    const updatedTask = await prisma.task.update({
      where: {
        id: task.id
      },
      data: {
        Status: taskStatus.COMPLETED
      }
    });
    return response_200(res, "Task Completed Successfully", updatedTask);
  } catch (error) {
    console.error("Error marking task as completed:", error);
    return response_500(res, 'Could not mark task as completed', error.message);
  }
}
