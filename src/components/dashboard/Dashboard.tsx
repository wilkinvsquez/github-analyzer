"use client";

import { DashboardProps } from "@/Interfaces/DashboardProps";
import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Tooltip,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Bar,
} from "recharts";
import { LanguageChart } from "../charts/LanguageChart";
import { CommitsChart } from "../charts/CommitsChart";
import { ForksChart } from "../charts/ForksChart";
import { StarsBarChart } from "../charts/StarsBarChart";

export function Dashboard({ repos }: DashboardProps) {
	const languageCount: Record<string, number> = {};
	repos.forEach(repo => {
		const lang = repo.language || "Unknown";
		languageCount[lang] = (languageCount[lang] || 0) + 1;
	});

	const languageData = Object.entries(languageCount).map(
		([key, value], index) => ({
			name: key,
			value: value,
		}),
	);

	const topRepos = [...repos]
		.sort((a, b) => b.stargazers_count - a.stargazers_count)
		.slice(0, 5)
		.map((repo, index) => ({
			name: repo.name,
			stars: repo.stargazers_count,
		}));

	const topForks = [...repos]
		.sort((a, b) => b.forks_count - a.forks_count)
		.slice(0, 5)
		.map((repo, index) => ({
			name: repo.name,
			forks: repo.forks_count,
		}));

	const topCommits = [...repos]
		.filter(repo => repo.commits)
		.sort((a, b) => (b.commits ?? 0) - (a.commits ?? 0))
		.slice(0, 5)
		.map(repo => ({
			name: repo.name,
			commits: repo.commits ?? 0,
		}));

	return (
		<div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
			{/* Pie Chart: Lenguajes */}
			<LanguageChart languageData={languageData} />

			{/* Stars Bar Chart */}
			<StarsBarChart topRepos={topRepos} />

			{/* Forks Bar Chart */}
			<ForksChart topForks={topForks} />
			{/* Forks Bar Chart */}

			{/* Commits Bar Chart */}
			<CommitsChart topCommits={topCommits} />
		</div>
	);
}
