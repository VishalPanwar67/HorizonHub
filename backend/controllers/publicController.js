import { ApiError, ApiResponse } from "../class/index.class.js";
import {
  Project,
  Client,
  Contact,
  Subscription,
} from "../models/index.models.js";
import { asyncHandler } from "../utils/index.utils.js";
import cloudinary from "cloudinary";

const getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json(new ApiResponse(200, "Projects retrieved", projects));
});

const getClients = asyncHandler(async (req, res, next) => {
  const clients = await Client.find();
  res.status(200).json(new ApiResponse(200, "Clients retrieved", clients));
});

const addContact = asyncHandler(async (req, res, next) => {
  const { fullName, email, mobileNumber, city } = req.body;

  if (!fullName || !email || !mobileNumber || !city) {
    throw new ApiError(400, "All contact fields are required");
  }

  const contact = await Contact.create({ fullName, email, mobileNumber, city });
  res
    .status(201)
    .json(new ApiResponse(201, "Contact saved successfully", contact));
});

const addSubscription = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const subscription = await Subscription.create({ email });
  res
    .status(201)
    .json(
      new ApiResponse(201, "Subscription saved successfully", subscription)
    );
});

export { getProjects, getClients, addContact, addSubscription };
