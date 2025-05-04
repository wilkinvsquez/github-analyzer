import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Github Analyzer by @wilkinvsquez",
	description: "A simple Github user analyzer",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
