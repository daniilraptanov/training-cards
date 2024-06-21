import { readJSONFile } from "../helpers/jsonHelpers.js";
import { askQuestion } from "../helpers/readlineHelpers.js";

export async function playCards(rl, filePath) {
    try {
        const data = await readJSONFile(filePath);
        let questions = [...data.cards];

        while (questions.length > 0) {
            const currentQuestion = questions[0];
            const response = await askQuestion(rl, `${currentQuestion.question} | yes/no: `);

            if (response.toLowerCase() === "yes") {
                questions.shift();
            } else {
                console.log(`Answer: ${currentQuestion.answer}`);
            }
        }

        console.log("No more questions left.");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        rl.close();
    }
}
