export type Result = {
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

export type DataType = {
	rows: Result[];

	pagination: {
		totalPages: number;
		currentPage: number;
	};
};

export type APIResponse<Data = DataType> =
	| {
			success: true;
			message?: string;
			data: Data;
			code: number;
	  }
	| {
			success: false;
			error: string;
			type?: string;
			code: number;
			data?: unknown;
	  };

export type APIFailureResponse = Extract<APIResponse, { success: false }>;

export type AsyncAPIResponse<Data = void> = Promise<APIResponse<Data>>;
