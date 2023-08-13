import React from "react";
import { Paper, Container, MantineProvider } from "@mantine/core";

type HeaderProps = {
	companyName: string;
};

const Header: React.FC<HeaderProps> = ({ companyName }) => {
	return (
		<MantineProvider theme={{ colorScheme: "dark" }}>
			<Paper className="mb-6 p-6" shadow="xs" style={{ backgroundColor: "#B39CD0" }}>
				<Container size="lg">
					<div className="flex items-center justify-center">
						<h1 className="font-[Acme] text-6xl font-medium text-white">{companyName}</h1>
					</div>
				</Container>
			</Paper>
		</MantineProvider>
	);
};

export default Header;
