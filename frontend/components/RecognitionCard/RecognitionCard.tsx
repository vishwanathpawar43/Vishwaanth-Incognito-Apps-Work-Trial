import React, { forwardRef } from "react";
import { Paper } from "@mantine/core";
import { Result } from "typings/general";
import Image from "next/image";
import * as emoji from "node-emoji";

type RecognitionCardProps = {
	recognition: Result;
	companyValues: string[];
};

const getEmoji = (value: string) => {
	const start = value.indexOf(":") + 1;
	const end = value.lastIndexOf(":");

	if (start !== -1 && end !== -1 && start < end) {
		const extractedText = value.substring(start, end);
		const words = extractedText.split("-");
		const res = words.map((word) => {
			return emoji.get(word);
		});
		console.log(res);
		return res.find((str) => str !== undefined);
	}
	return undefined;
};

const RecognitionCard: React.ForwardRefRenderFunction<HTMLDivElement, RecognitionCardProps> = (
	{ recognition },
	ref,
) => {
	const { giver_alias, receiver_names, message, date_posted, value, total_claps, img } = recognition;

	const formattedReceiverNames = receiver_names.join(", ");

	const emo = getEmoji(value ? value : "");

	const recognitionContent = (
		<div className="flex flex-col gap-3 rounded-lg font-semibold text-[#98afc7]">
			{img && (
				<div className="mb-4 mt-2">
					<Image src={img} alt="Recognition" width={400} height={300} className="rounded-lg" />
				</div>
			)}
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<h2 className="text-base">Hii there,</h2>
					<span className="ml-2 text-2xl">{emo ? emo : "☀️"}</span>
				</div>
				<div className="text-base text-[#7e7d9c]">@ {formattedReceiverNames}</div>
				<div className="my-6">
					<p className="text-base">
						&emsp;
						{message}
					</p>
				</div>

				<div className="text-right text-base text-[#7e7d9c]">~ {giver_alias}</div>

				<div className="mt-8 flex items-center justify-between text-base">
					{date_posted && <div className="">Date: {new Date(date_posted).toLocaleDateString()}</div>}
					<span className="ml-2">
						&#128079;
						{total_claps}
					</span>
				</div>
			</div>
		</div>
	);

	const content = ref ? (
		<Paper
			shadow="xl"
			radius="xl"
			className="m-10 w-80 p-8 transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
			ref={ref}
		>
			{recognitionContent}
		</Paper>
	) : (
		<Paper
			shadow="xl"
			radius="xl"
			className="m-10 w-80 p-8 transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
		>
			{recognitionContent}
		</Paper>
	);
	return content;
};

export default forwardRef(RecognitionCard);
