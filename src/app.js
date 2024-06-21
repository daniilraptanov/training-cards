import readline from "readline";
import { addNewCard } from "./methods/addNewCard.js";
import { listFiles, getFilePath } from "./helpers/jsonHelpers.js";
import { askQuestion } from "./helpers/readlineHelpers.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    try {
        const files = await listFiles("src/data");

        console.log("Choose file to add new card:");
        files.forEach((file, index) => {
            console.log(`${index + 1} - ${file.name}`);
        });

        const choice = await askQuestion(rl, "Enter the number of the file: ");
        const fileIndex = parseInt(choice, 10) - 1;

        if (fileIndex >= 0 && fileIndex < files.length) {
            const fileName = files[fileIndex].name;
            const filePath = getFilePath("src/data", fileName);
            console.log("Chosen file: ", fileName);
            while (true) {
                await addNewCard(rl, filePath);
            }
        } else {
            console.log("Invalid choice.");
            rl.close();
        }
    } catch (error) {
        console.error("Error:", error);
        rl.close();
    }
}

main();
