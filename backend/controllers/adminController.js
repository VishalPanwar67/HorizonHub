import { ApiError, ApiResponse } from "../class/index.class.js";
import {
  Project,
  Client,
  Contact,
  Subscription,
} from "../models/index.models.js";
import { asyncHandler } from "../utils/index.utils.js";

const addProject = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    throw new ApiError(400, "Image file is required");
  }

  //   const croppedImageBuffer = await cropImage(imageFile.buffer);
  const croppedImageBuffer = imageFile;
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "admin_uploads" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(croppedImageBuffer);
  });

  const project = await Project.create({
    name,
    description,
    imageUrl: uploadResult.secure_url,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Project added successfully", project));
});

const addClient = asyncHandler(async (req, res, next) => {
  const { name, description, designation } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    throw new ApiError(400, "Image file is required");
  }

  //   const croppedImageBuffer = await cropImage(imageFile.buffer);
  const croppedImageBuffer = imageFile;
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "admin_uploads" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(croppedImageBuffer);
  });

  const client = await Client.create({
    name,
    description,
    designation,
    imageUrl: uploadResult.secure_url,
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
