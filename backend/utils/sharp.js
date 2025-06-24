import sharp from "sharp";

const cropImage = async (fileBuffer, width = 450, height = 350) => {
  return await sharp(fileBuffer)
    .resize(width, height)
    .toFormat("jpg")
    .toBuffer();
};

export { cropImage };
