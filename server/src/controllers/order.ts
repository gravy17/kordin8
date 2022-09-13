import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { OrderInstance } from "../models/order";
import { orderValidator, orderUpdateValidator } from "../utils/order";
import { validationOpts } from "../utils/utils";
import { RequestInstance } from "../models/requests";
import { CustomerInstance } from "../models/customer";
import { AgentInstance } from "../models/agent";
import { Service } from "../utils/types/service";
import { Status } from "../utils/types/status";

export async function getOrders(req: Request, res: Response) {
  try {
    if (!req.admin && !req.agent && !req.customer) {
      return res.status(403).json({
        message: "Not permitted to access this resource"
      });
    }
    if (req.customer) {
      const orders = await OrderInstance.findAll({
        where: { placedBy: req.customer },
        include: [
          {
            model: CustomerInstance,
            as: "customer",
            attributes: ["firstName", "email", "phone"]
          },
          {
            model: AgentInstance,
            as: "assignedAgent",
            attributes: ["firstName", "email", "phone"]
          }
        ],
        order: [["updatedAt", "DESC"]]
      });
      res.status(200).json(orders);
    } else if (req.agent) {
      const orders = await OrderInstance.findAll({
        where: { agent: req.agent },
        include: [
          {
            model: CustomerInstance,
            as: "customer",
            attributes: ["firstName", "email", "phone"]
          },
          {
            model: AgentInstance,
            as: "assignedAgent",
            attributes: ["firstName", "email", "phone"]
          }
        ],
        order: [["updatedAt", "DESC"]]
      });
      res.status(200).json(orders);
    } else if (req.admin) {
      const orders = await OrderInstance.findAll({
        include: [
          {
            model: CustomerInstance,
            as: "customer",
            attributes: ["firstName", "email", "phone"]
          },
          {
            model: AgentInstance,
            as: "assignedAgent",
            attributes: ["firstName", "email", "phone"]
          }
        ],
        order: [["updatedAt", "DESC"]]
      });
      res.status(200).json(orders);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unexpected error: unable to get orders" });
  }
}

export async function getOrderInfo(req: Request, res: Response) {
  try {
    const order = await OrderInstance.findByPk(req.params.id, {
      include: [
        {
          model: CustomerInstance,
          as: "customer",
          attributes: ["firstName", "lastName", "email", "phone"]
        },
        {
          model: AgentInstance,
          as: "assignedAgent",
          attributes: ["firstName", "lastName", "email", "phone"]
        }
      ]
    });
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (
      (req.agent && order.getDataValue("agent") !== req.agent) ||
      (req.customer &&
        order.getDataValue("placedBy") !== req.customer &&
        !req.admin)
    ) {
      return res.status(403).json({
        message: "Not permitted to access this resource"
      });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: unable to get order info",
      id: req.params.id
    });
  }
}

const assignAgent = async (service: Service) => {
  const availableAgents = await AgentInstance.findAll({ where: { service } });
  if (availableAgents.length === 0) {
    return;
  }
  const assignedAgents: AgentInstance[] = [];
  while (availableAgents.length > 0) {
    const agent = availableAgents.splice(
      Math.floor(Math.random() * availableAgents.length),
      1
    )[0];
    const agentId = agent.getDataValue("id");
    const orders = await OrderInstance.findAll({
      where: { agent: agentId }
    });
    if (!orders.length) {
      return agentId;
    } else if (orders.length < (agent.getDataValue("maxOrders") || 1)) {
      assignedAgents.push(agent);
    }
  }
  return assignedAgents[
    Math.floor(Math.random() * assignedAgents.length)
  ]?.getDataValue("id");
};

export async function placeOrder(req: Request, res: Response) {
  try {
    if (!req.customer) {
      return res.status(403).json({
        message: "Only logged in customers can place orders"
      });
    }

    const { error } = orderValidator.validate(req.body, validationOpts);
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const assignedAgent = await assignAgent(req.body.orderType);
    const status: Status = "Pending";
    const order = await OrderInstance.create({
      id: uuidv4(),
      ...req.body,
      placedBy: req.customer,
      status,
      agent: assignedAgent
    });
    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unexpected error: unable to place order" });
  }
}

export async function reassignOrder(req: Request, res: Response) {
  try {
    const order = await OrderInstance.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (order.getDataValue("agent") !== req.agent && !req.admin) {
      return res.status(403).json({
        message: "Not permitted to access this resource"
      });
    }

    const assignedAgent =
      (await assignAgent(order.getDataValue("orderType"))) || null;
    const result = await order.update({ agent: assignedAgent });

    return res.status(200).json({
      message: "Order reassigned",
      newAgent: result.getDataValue("agent")
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: while trying to reassign order",
      id: req.params.id
    });
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const order = await OrderInstance.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (
      (req.agent && order.getDataValue("agent") !== req.agent) ||
      (req.customer &&
        order.getDataValue("placedBy") !== req.customer &&
        !req.admin)
    ) {
      return res.status(403).json({
        message: "Not permitted to access this resource"
      });
    }

    if (req.body.status) {
      if (req.customer) {
        if (req.body.status !== "Completed") {
          return res.status(403).json({
            message: "You may only mark an order complete"
          });
        }
      } else if (req.agent) {
        if (
          Object.keys(req.body).length > 1 ||
          !req.body.status ||
          req.body.status === "Completed" ||
          req.body.status === "Cancelled"
        ) {
          return res.status(403).json({
            message: "Only the customer may mark an order Complete or Cancelled"
          });
        }
      } else if (req.admin) {
        if (
          Object.keys(req.body).length > 1 ||
          !req.body.status ||
          (req.body.status !== "Pending" && req.body.status !== "Rejected")
        ) {
          return res.status(403).json({
            message: "You may only reject or mark an order pending"
          });
        }
      }
    }

    const updated = await order.update({
      ...req.body
    });

    return res.status(200).json({
      message: "Order updated",
      updated
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: while trying to update order",
      id: req.params.id
    });
  }
}

export async function requestCancellation(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const record = await OrderInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (!req.customer || req.customer !== record.getDataValue("placedBy")) {
      return res.status(403).json({
        message: "Not authorized to request order deletion"
      });
    }

    if (String(record.getDataValue("status")) === "Pending") {
      const Cancelled = await record.update({
        status: "Cancelled",
        agent: undefined
      });
      return res.status(200).json({
        message: "Order cancelled",
        Cancelled
      });
    } else {
      const request = await RequestInstance.create({
        id,
        requestType: "cancel",
        reason: req.body.reason,
        order: true
      });
      if (request) {
        return res.status(200).json({
          message: "Cancellation request sent"
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: while requesting order cancellation",
      id: req.params.id
    });
  }
}

export async function deleteOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!req.admin) {
      return res.status(403).json({
        message: "Not authorized to delete order"
      });
    }

    const record = await OrderInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    await record.destroy();
    return res.status(200).json({
      message: "Order successfully deleted",
      id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unexpected error: while deleting order",
      id: req.params.id
    });
  }
}
