import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Button } from "@mantine/core";

interface SearchFilterProps {
	onSearch: (text: string) => void;
}

const SearchComponent: React.FC<SearchFilterProps> = ({ onSearch }) => {
	const [searchText, setSearchText] = useState<string>("");

	const handleSearch = () => {
		onSearch(searchText);
	};

	const handleClearSearch = () => {
		setSearchText("");
		onSearch("");
	};

	return (
		<div className="mb-4 flex w-full">
			<div className="relative w-full">
				<input
					value={searchText}
					onChange={(event) => setSearchText(event.currentTarget.value)}
					placeholder="Search ..."
					className="w-full rounded border py-2 pl-3 pr-10 text-sm placeholder:text-gray-400 focus:border-blue-300 focus:outline-none"
				/>
				{searchText && (
					<button
						onClick={handleClearSearch}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
					>
						<FaTimes />
					</button>
				)}
			</div>
			<Button onClick={handleSearch} variant="light" className="ml-2 rounded bg-blue-400 px-3 py-2">
				<FaSearch />
			</Button>
		</div>
	);
};

export default SearchComponent;
