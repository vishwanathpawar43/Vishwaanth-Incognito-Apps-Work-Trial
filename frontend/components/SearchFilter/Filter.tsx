import React, { useEffect, useState } from "react";
import { Button, Group, Paper, Checkbox } from "@mantine/core";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import * as emoji from "node-emoji";

type FilterProps = {
	onFilterDate: (range: DateValueType) => void;
	onFilterValues: (values: string[]) => void;
	companyValues: string[];
};

const Filter: React.FC<FilterProps> = ({ onFilterDate, onFilterValues, companyValues }) => {
	const [value, setValue] = useState<DateValueType>(null);

	const [selectedValues, setSelectedValues] = useState<string[]>([]);

	const handleFilterDate = () => {
		onFilterDate(value);
	};

	const handleValueChange = (newValue: DateValueType) => {
		setValue(newValue);
	};

	const getCompanyValue = (str: string): string => {
		const newStr = str.slice(str.indexOf(":", str.indexOf(":") + 1) + 2);
		return newStr;
	};

	useEffect(() => {
		onFilterValues(selectedValues);
	}, [selectedValues, onFilterValues]);

	const getEmoji = (value: string) => {
		const start = value.indexOf(":") + 1;
		const end = value.lastIndexOf(":");

		if (start !== -1 && end !== -1 && start < end) {
			const extractedText = value.substring(start, end);
			const words = extractedText.split("-");
			const res = words.map((word) => {
				return emoji.get(word);
			});
			return res.find((str) => str !== undefined);
		}
		return undefined;
	};

	return (
		<Paper className="flex w-full">
			<h5 className="mb-6 mt-8 border-b border-gray-300 pb-2 text-lg font-bold opacity-50	">Date</h5>

			<Group position="center" className="flex w-full">
				<Datepicker
					useRange={false}
					value={value}
					onChange={handleValueChange}
					primaryColor={"blue"}
					placeholder="Start Date - End Date"
					inputClassName="w-full rounded border py-2 pl-3 pr-10 text-sm placeholder:text-gray-400 focus:border-blue-300 focus:outline-none"
				/>
			</Group>

			<Button onClick={handleFilterDate} fullWidth className="mb-4 mt-6 " variant="light">
				Apply Filter
			</Button>

			<h5 className="mb-6 mt-8 border-b border-gray-300 pb-2 text-lg font-bold opacity-50	">Company Values</h5>

			<div className="mb-4  w-full flex-col space-x-4">
				<Checkbox.Group value={selectedValues} onChange={(values) => setSelectedValues(values)}>
					{companyValues.map((value) => {
						const emo = getEmoji(value);
						return (
							<div key={value} className="flex items-center">
								<Checkbox value={value} label={getCompanyValue(value)} className="mr-2" />
								<span className="ml-2 text-2xl">{emo ? emo : "☀️"}</span>
							</div>
						);
					})}
				</Checkbox.Group>
			</div>
		</Paper>
	);
};

export default Filter;
