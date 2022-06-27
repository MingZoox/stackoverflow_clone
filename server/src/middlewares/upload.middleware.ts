import { Request, RequestHandler } from "express";
import multer from "multer";
import { MulterAzureStorage, MASNameResolver } from "multer-azure-blob-storage";
import env from "../configs/env.config";

// eslint-disable-next-line no-unused-vars
const resolveBlobName: MASNameResolver = function (req: Request, file: any): Promise<string> {
    return new Promise<string>((resolve) => {
        resolve(req.user._id.toString());
    });
};

const azureStorage = new MulterAzureStorage({
    connectionString: env.AZURE_CONNECTION_STRING,
    accessKey: env.AZURE_ACCESS_KEY,
    accountName: "mingzoox",
    containerName: "avatars",
    metadata: { authorCloud: "mingzoox" },
    blobName: resolveBlobName,
});

const filterImage = (req: Request, file: any, cb: any) => {
    if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadFileMiddleware: RequestHandler = multer({
    storage: azureStorage,
    fileFilter: filterImage,
}).any();

export default uploadFileMiddleware;
