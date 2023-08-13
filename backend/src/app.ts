import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "configs/express";
import { PORT } from "@constants";

const startServer = async () => {
	const app = express();
	app.use(cors());
	app.use(express.json());
	app.use(cookieParser());
	app.use(express.urlencoded({ extended: false }));

	app.get("/", (_: Request, res: Response) => {
		res.status(200).json({
			success: true,
			message: "Welcome to the Work trial backend of IncognitoApps",
			code: 200,
		});
	});

	app.use("/api", router);
	app.listen(PORT, () => console.info(`App is running at Port: ${PORT}`));
};

export default startServer;
