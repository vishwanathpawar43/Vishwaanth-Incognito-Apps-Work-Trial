import React from "react";
import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
	static getInitialProps = getInitialProps;

	render() {
		return (
			<Html>
				<Head />
				<body id="root">
					<Main />
					<NextScript />
					<noscript
						dangerouslySetInnerHTML={{
							__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TG7X55P" height="0" width="0" style="display:none;visibility:hidden" />`,
						}}
					/>
				</body>
			</Html>
		);
	}
}
