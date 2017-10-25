import { startServer } from "./server";

(async function run() {
    try {
        await startServer();
    } catch (err) {
        console.error(err);
    }
})();
