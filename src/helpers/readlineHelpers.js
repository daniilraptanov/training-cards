export function askQuestion(rl, query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
