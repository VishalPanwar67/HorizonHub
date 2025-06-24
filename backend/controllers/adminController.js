import { ApiError, ApiResponse } from "../class/index.class.js";
import {
  Project,
  Client,
  Contact,
  Subscription,
} from "../models/index.models.js";
import { asyncHandler } from "../utils/index.utils.js";
import cloudinary from "cloudinary";

const addProject = asyncHandler(async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const imageFile = imageUrl;

  if (!name || !description) {
    throw new ApiError(400, "Name and description are required");
  }
  if (!imageFile) {
    throw new ApiError(400, "Image file is required");
  }

  //   const croppedImageBuffer = await cropImage(imageFile.buffer);
  let croppedImageBuffer = imageFile;

  if (croppedImageBuffer) {
    const uploadResponse = await cloudinary.uploader.upload(
      croppedImageBuffer,
      {
        folder: "admin_uploads",
      }
    );
    croppedImageBuffer = uploadResponse.secure_url;
  }

  const project = await Project.create({
    name,
    description,
    imageUrl: croppedImageBuffer,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Project added successfully", project));
});

const addClient = asyncHandler(async (req, res, next) => {
  const { name, description, designation, imageUrl } = req.body;
  const imageFile = imageUrl;

  if (!imageFile) {
    throw new ApiError(400, "Image file is required");
  }

  //   const croppedImageBuffer = await cropImage(imageFile.buffer);
  let croppedImageBuffer = imageFile;
  if (croppedImageBuffer) {
    const uploadResponse = await cloudinary.uploader.upload(
      croppedImageBuffer,
      {
        folder: "admin_uploads",
      }
    );
    croppedImageBuffer = uploadResponse.secure_url;
  }

  const client = await Client.create({
    name,
    description,
    designation,
    imageUrl: croppedImageBuffer,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Client added successfully", client));
});

const getContactForms = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find();
  res
    .status(200)
    .json(new ApiResponse(200, "Contact forms retrieved", contacts));
});

const getSubscriptions = asyncHandler(async (req, res, next) => {
  const subscriptions = await Subscription.find();
  res
    .status(200)
    .json(new ApiResponse(200, "Subscriptions retrieved", subscriptions));
});

export { addProject, addClient, getContactForms, getSubscriptions };
