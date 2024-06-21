import fs, { promises } from "fs";
import path from "path";

export async function listFiles(dir) {
    const files = await promises.readdir(dir);
    return Promise.all(
        files.map(async (file) => {
            const filePath = path.join(dir, file);
            const stats = await promises.stat(filePath);
            return {
                name: file,
                path: filePath,
                isFile: stats.isFile(),
            };
        }),
    ).then((files) => files.filter((file) => file.isFile));
}

export function getFilePath(dir, file) {
    return path.join(dir, file);
}

export function readJSONFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

export function writeJSONFile(file, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, JSON.stringify(data, null, 2), "utf8", (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
