export type APIResponse<Data = void> =
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
