import { readJSONFile } from "../helpers/jsonHelpers.js";
import { askQuestion } from "../helpers/readlineHelpers.js";

export async function playCards(rl, filePath) {
    try {
        const data = await readJSONFile(filePath);
        let questions = [...data.cards];

        let index = 0;
        while (questions.length) {
            if (questions.length <= index) {
                index = 0;
            }

            const currentQuestion = questions[index];
            const response = await askQuestion(rl, `${currentQuestion.question} | yes/no: `);
            if (response.toLowerCase() === "yes") {
                questions.splice(index, 1);
            }
            console.log(`Answer: ${currentQuestion.answer}`);
            index++;
        }

        console.log("No more questions left.");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        rl.close();
    }
}
