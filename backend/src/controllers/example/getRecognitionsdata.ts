import { Controller } from "typings/express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

type RequestParams = void;
type RequestBody = void;

type RequestQuery = {
	page: string;
	search?: string;
	startDate?: string;
	endDate?: string;
	values?: string;
};

type Result = {
	id: number;
	team_name: string;
	receiver_names: string[];
	img: string | null;
	message: string;
	value: string | null;
	date_posted: Date | null;
	total_claps: number;
	giver_alias: string;
};

type ResponseData = {
	rows: Result[];
	pagination: {
		totalPages: number;
		currentPage: number;
	};
};

// const tenant = "T050HPVG16E";
const tenant = "T01HP7H5HME";
const pageSize = 20;

export const getRecognitions: Controller<RequestParams, ResponseData, RequestBody, RequestQuery> = async (req, res) => {
	try {
		const { page, search, startDate, endDate, values } = req.query;

		const filters: Prisma.recognitionsWhereInput = {
			team_id: tenant,
		};

		if (search) {
			filters.OR = [
				{ giver_alias: { contains: search, mode: "insensitive" } },
				{ message: { contains: search, mode: "insensitive" } },
				{ value: { contains: search, mode: "insensitive" } },
				{ receiver_names: { has: search } },
			];
		}

		if (startDate && endDate) {
			filters.date_posted = {
				gte: new Date(startDate),
				lte: new Date(endDate),
			};
		}

		if (values) {
			filters.value = { in: values.split(",") };
		}

		const currentPage = parseInt(page) ? parseInt(page) : 1;

		const results: Result[] = await prisma.recognitions.findMany({
			where: filters,
			select: {
				id: true,
				team_name: true,
				receiver_names: true,
				img: true,
				message: true,
				value: true,
				date_posted: true,
				total_claps: true,
				giver_alias: true,
			},

			skip: (currentPage - 1) * pageSize,
			take: pageSize,
		});

		const totalCount: number = await prisma.recognitions.count({ where: filters });

		const totalPages = Math.ceil(totalCount / pageSize);

		res.status(200).json({
			success: true,
			code: 200,
			data: {
				rows: results,
				pagination: {
					totalPages,
					currentPage,
				},
			},
		});
	} catch (err) {
		console.error("ERROR IN GET POSTS");
		console.error({ err });
		res.status(500).json({
			success: false,
			code: 500,
			error: "Internal Server Error",
		});
	}
};
