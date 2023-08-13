import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { APIResponse } from "../typings/general";

async function fetchRecognitions({ pageParam = 1 }): Promise<APIResponse> {
	const res = await fetch(`http://localhost:8000/api/example?page=${pageParam}`);
	const data: APIResponse = await res.json();
	return data;
}

export function useFetchRecognitions(): UseInfiniteQueryResult<APIResponse[]> {
	return useInfiniteQuery(["recognitions"], fetchRecognitions, {
		getNextPageParam: (lastPage) => {
			if (lastPage.success) {
				if (lastPage) {
					const nextPage = (lastPage.data.page || 1) + 1;
					return nextPage;
				}
			}
			return undefined;
		},
	});
}

// import { useQuery, useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
// import { APIResponse } from "../typings/general";

// async function fetchRecognitions({ pageParam = 1 }): Promise<APIResponse[]> {
// 	const res = await fetch(`http://localhost:8000/api/example?page=${pageParam}`);
// 	const data: APIResponse[] = await res.json();
// 	return data;
// }

// export function useFetchRecognitions(): UseInfiniteQueryResult<APIResponse[]> {
// 	return useInfiniteQuery(["recognitions"], fetchRecognitions, {
// 		getNextPageParam: (lastPage) => {
// 			if (Array.isArray(lastPage) && lastPage.length > 0) {
// 				const lastItem = lastPage[lastPage.length - 1];
// 				if (lastItem && lastItem.success) {
// 					// Increment the page number for the next fetch
// 					if (lastItem && lastItem.success) {
// 						const nextPage = (lastItem.data.page ?? 1) + 1;
// 						return nextPage;
// 					}
// 				}
// 			}
// 			return undefined;
// 		},
// 	});
// }
