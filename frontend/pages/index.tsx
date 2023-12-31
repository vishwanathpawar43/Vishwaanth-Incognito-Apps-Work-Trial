import { useInfiniteQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import React, { Fragment, useEffect, useState } from "react";
import { APIResponse, DataType, Result } from "typings/general";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";
import RecognitionCard from "components/RecognitionCard/RecognitionCard";
import { Loader } from "@mantine/core";
import Header from "components/Header/Header";
import SearchComponent from "components/SearchFilter/Search";
import Filter from "components/SearchFilter/Filter";
import { DateValueType } from "react-tailwindcss-datepicker";

const LIMIT = 20;

const Home: NextPage = () => {
	const { ref, inView } = useInView();

	const [filteredData, setFilteredData] = useState([] as Result[]);
	const [searchText, setSearchText] = useState("");
	const [filterRange, setFilterRange] = useState<DateValueType>(null);
	const [filterValues, setFilterValues] = useState<string[]>([]);
	const [companyValues, setCompanyValues] = useState<string[]>([]);

	const fetchRecognitions = async (
		page: number,
		searchText: string,
		filterRange: DateValueType,
		filterValues: string[],
	): Promise<DataType> => {
		const startDate = filterRange && filterRange.startDate ? new Date(filterRange.startDate) : null;

		if (startDate) {
			startDate.setHours(0, 0, 0);
		}

		const endDate = filterRange && filterRange.endDate ? new Date(filterRange.endDate) : null;

		if (endDate) {
			endDate.setHours(23, 59, 59);
		}
		const url = new URL(`http://localhost:8000/api/example`);
		url.searchParams.append("page", page.toString());
		url.searchParams.append("search", searchText ? searchText : "");
		url.searchParams.append("startDate", startDate?.toISOString() ?? "");
		url.searchParams.append("endDate", endDate?.toISOString() ?? "");
		url.searchParams.append("values", filterValues ? filterValues.join(",") : "");

		try {
			const res = await fetch(url.toString());
			const responseData: APIResponse<DataType> = await res.json();

			if (responseData.success && responseData.data) {
				return responseData.data;
			} else {
				return {
					rows: [],
					companyValues: [],
					pagination: {
						totalPages: 0,
						currentPage: 0,
					},
				};
			}
		} catch (error) {
			console.log("Error while fetching data from backend - ", error);
			throw new Error("Failed to fetch data");
		}
	};

	const {
		data: infiniteData,
		isSuccess,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery(
		["recognitions", searchText, filterRange, filterValues],
		({ pageParam = 1 }) => fetchRecognitions(Number(pageParam), searchText, filterRange, filterValues),
		{
			getNextPageParam: (lastPage, allPages) => {
				// console.log("--------------here--------------------");
				// console.log(lastPage);
				// console.log(allPages);
				const nextPage = lastPage.rows.length === LIMIT ? allPages.length + 1 : undefined;
				return nextPage;
			},
		},
	);

	// Handle search
	const handleSearch = (text: string) => {
		setSearchText(text);
	};

	// Handle Date
	const handleFilterDate = (range: DateValueType) => {
		setFilterRange(range);
	};

	// Handle filter
	const handleFilterValues = (values: string[]) => {
		setFilterValues(values);
	};

	useEffect(() => {
		if (infiniteData && infiniteData.pages[0]) {
			const allResults: Result[] = infiniteData.pages.flatMap((page) => page.rows);
			const values: string[] = infiniteData.pages[0].companyValues.filter((value) => value !== "");
			setFilteredData(allResults);
			setCompanyValues(values);
		}
	}, [infiniteData]);

	const content =
		isSuccess &&
		filteredData.map((item, i) => {
			if (i === filteredData.length - 1) {
				return <RecognitionCard ref={ref} key={item.id} recognition={item} companyValues={companyValues} />;
			}
			return <RecognitionCard key={item.id} recognition={item} companyValues={companyValues} />;
		});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	return (
		<Fragment>
			<Header companyName="Wall of Recognitions" />
			<section className="flex flex-col gap-4 md:flex-row">
				{/* Filter section */}
				<div className="mx-2 my-0 w-full border border-gray-300 p-4 shadow-lg md:min-h-screen md:w-64">
					<h2 className="mb-6 border-b border-gray-300 pb-2 text-xl font-bold tracking-wide">Filters</h2>
					<SearchComponent onSearch={handleSearch} />
					<Filter
						onFilterDate={handleFilterDate}
						onFilterValues={handleFilterValues}
						companyValues={companyValues}
					/>
				</div>

				{/* Content section */}
				<div className="flex-1 bg-[#ededed] ">
					{content ? (
						<div>
							<Masonry
								breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
								className="masonry-grid"
								columnClassName="masonry-grid-column"
							>
								{content}
							</Masonry>
							<div className="mb-12 flex items-center justify-center">
								{isFetchingNextPage && <Loader size="xl" />}
							</div>
						</div>
					) : (
						<div className="flex items-center justify-center pt-20">
							<Loader size="xl" />
						</div>
					)}
					{content && content.length === 0 && (
						<div
							className="flex items-center justify-center pt-20"
							style={{
								fontFamily: "'Acme', sans-serif",
								fontWeight: "bold",
								fontSize: "1rem",
							}}
						>
							<h1>No Recognitions Found</h1>
						</div>
					)}
				</div>
			</section>
		</Fragment>
	);
};

export default Home;
