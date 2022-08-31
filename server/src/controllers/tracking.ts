import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TrackingInstance } from "../models/tracking";
import { trackingValidator } from "../utils/tracking";
import { OrderInstance } from "../models/order";
import { AgentInstance } from "../models/agent";
import { CustomerInstance } from "../models/customer";

export async function trackOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const tracking = await TrackingInstance.findOne({
      where: { id },
      include: [
        {
          model: OrderInstance,
          as: "order",
          attributes: [
            "orderType",
            "recipient",
            "description",
            "price",
            "status"
          ],
          include: [
            {
              model: AgentInstance,
              as: "assignedAgent",
              attributes: ["firstName", "lastName", "email", "phone"]
            },
            {
              model: CustomerInstance,
              as: "customer",
              attributes: ["firstName", "lastName"]
            }
          ]
        }
      ]
    });
    if (!tracking) {
      return res.status(404).json({
        message: "Tracking id does not exist"
      });
    }
    res.status(200).json(tracking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unexpected error: unable to track order" });
  }
}

export async function registerTracking(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { error } = trackingValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const order = await OrderInstance.findOne({
      where: { id: orderId }
    });
    if (!order) {
      return res.status(404).json({ message: "Order does not exist" });
    }
    if (!req.customer || req.customer !== order.getDataValue("placedBy")) {
      return res.status(403).json({
        message:
          "Only the user who placed the order is permitted to add tracking to it"
      });
    }

    const tracking = await TrackingInstance.create({
      id: uuidv4(),
      orderId,
      ...req.body
    });
    res.status(201).json(tracking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unexpected error: unable to add tracking" });
  }
}
