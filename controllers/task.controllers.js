import { check } from 'prisma';
import { taskStatus } from '@prisma/client';
import prisma from '../config/db.config.js';
import { response_200, response_201, response_400, response_500 } from '../utils/statuscodes.utils.js';


export async function createTask(req, res) {
  try {
    const { Title, Description, OrganizationId, StartDate, EndDate, Points, dependentTasksIds, assigneeId } = req.body;

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
        Title: Title,
        Description: Description,
        assignerId: req.member.id,
        assigneeId: assigneeId,
        OrganizationId: OrganizationId,
        StartDate: StartDate,
        EndDate: EndDate,
        Points: Points,
        Status: taskStatus.PENDING,
        dependentTasksIds: dependentTasksIds
      }
    });
    console.log(newTask);

    response_201(res,"Task Created", newTask);

  } catch (error) {
    response_500(res,'error creating new task', error)
  }
}

export async function assignTask(req,res){
  try {
    const { AssigneeID, Points } = req.body;
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
        assigneeId: AssigneeID,
        Points: Points
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
          },
          include: {
            dependentTasks: true
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
    const {taskId, memberId} = req.body;

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
    if(task.Status === taskStatus.COMPLETED){
      return response_400(res, "Task already marked as completed");
    }

    const assignee = await prisma.member.findUnique({
      where: {
        id: task.assigneeId
      }
    });
    const member = await prisma.member.findUnique({
      where: {
        id: memberId
      }
    });

    if(task.assigneeId === member.id || task.assignerId === member.id){
      const updatedpoints = assignee.Points + task.Points;
      const updatedAssignee = await prisma.member.update({
        where: {
          id: task.assigneeId
        },
        data: {
          Points: updatedpoints
        }
      });
      const updatedTask = await prisma.task.update({
        where: {
          id: task.id
        },
        data: {
          Status: taskStatus.COMPLETED
        }
      });

      console.log(member);
      return response_200(res, "Task Completed Successfully", updatedTask);
    }
    else{
      return response_400(res, "You are not authorized to mark this task as completed");
    }

  } catch (error) {
    console.error("Error marking task as completed:", error);
    return response_500(res, 'Could not mark task as completed', error.message);
  }
}

export async function updateTask(req, res){
  try{
      console.log("CALLED")
      const {taskArr} = req.body
      console.log(taskArr)
      const {memberId, assigneeId, points, endDate, Status} = req.body;
      let status = "";

      for(const tsk of taskArr){
        let status = ""
        switch (tsk.Status){
          case "Close":
              status = "COMPLETED"
              break;
          case "Open":
              status = "PENDING"
              break;
          case "InProgress":
              status = "IN_PROGRESS"
              break;
          case "Review":
              status = "IN_REVIEW"
              break;
          default:
              status = "COMPLETED"
      }
        const updatedTask = await prisma.task.update({
          where: {
            id: tsk.Id
          },
          data: {
            assigneeId: assigneeId,
            Points: points,
            EndDate: endDate,
            Status: status
          }
        });
        console.log("UPD")
      }


      return response_200(res, 'Task Updated Successfully', {});
  }
  catch(error)
  {
    response_500(res, 'Error updating task', error);
  }
}

