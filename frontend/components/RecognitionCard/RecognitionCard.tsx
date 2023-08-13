import React, { forwardRef } from "react";
import { Paper } from "@mantine/core";
import { Result } from "typings/general";

type RecognitionCardProps = {
	recognition: Result;
};

const yourCompanyValuesOptions = [
	":heart: Empathy",
	":hammer: Craftsmanship",
	":woman-tipping-hand: Courtesy",
	":man-gesturing-ok: Playfulness",
	":raised_hands: Solidarity",
	":sunflower: Thriving",
];

const emoji = ["&#128159;", "&#128296;", "&#128129;", "&#128582;", "&#9995;", "&#127803;", "&#128522;"];

const RecognitionCard: React.ForwardRefRenderFunction<HTMLDivElement, RecognitionCardProps> = (
	{ recognition },
	ref,
) => {
	const { giver_alias, receiver_names, message, date_posted, value, total_claps } = recognition;

	const formattedReceiverNames = receiver_names.join(", ");

	const index = yourCompanyValuesOptions.findIndex((companyValue) => {
		return companyValue === value;
	});

	const recognitionContent = (
		<div className="flex flex-col gap-3 rounded-lg font-semibold text-[#98afc7]">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<h2 className="text-base">Hii there,</h2>
					<span
						dangerouslySetInnerHTML={{ __html: String(index === -1 ? emoji.slice(-1) : emoji[index]) }}
						className="ml-2 text-2xl"
					/>
				</div>
				<div className="text-base text-[#7e7d9c]">@{formattedReceiverNames}</div>
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
