import { askQuestion } from "../helpers/readlineHelpers.js";
import { readJSONFile, writeJSONFile } from "../helpers/jsonHelpers.js";

export async function addNewCard(rl, filePath) {
    try {
        const data = await readJSONFile(filePath);

        const id = data.cards.length > 0 ? data.cards[data.cards.length - 1].id + 1 : 1;
        const question = await askQuestion(rl, "Enter the question: ");
        const answer = await askQuestion(rl, "Enter the answer: ");

        const newCard = { id, question, answer };

        data.cards.push(newCard);

        await writeJSONFile(filePath, data);

        console.log("New card added successfully!");
    } catch (error) {
        console.error("Error:", error);
    }
}
