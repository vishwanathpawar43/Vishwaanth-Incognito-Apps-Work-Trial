import startServer from "./app";

async function init() {
	try {
		await startServer();
		console.info("Starting the server...");
	} catch (err) {
		console.error(`ERROR STARTING THE SERVER ${err}`);
		process.exit(1);
	}
}

init();
