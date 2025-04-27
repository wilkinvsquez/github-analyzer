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

const COLORS = ["#F97316", "#3B82F6", "#10B981", "#EAB308", "#8B5CF6"];
const GRID_COLOR = "#4B5563"; // gray-600
const TEXT_COLOR = "#D1D5DB"; // gray-300
const TOOLTIP_BG = "#374151"; // gray-700
const TOOLTIP_TEXT = "#F3F4F6"; // gray-100

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
			<div className='bg-gray-700 rounded-2xl shadow-lg p-6'>
				<h3 className='text-white font-bold mb-4'>
					Lenguajes más usados
				</h3>
				<ResponsiveContainer width='100%' height={250}>
					<PieChart>
						<Pie
							data={languageData}
							dataKey='value'
							nameKey='name'
							cx='50%'
							cy='50%'
							outerRadius={80}
							label={{
								fill: TEXT_COLOR,
								fontSize: 12,
							}}>
							{languageData.map((_, idx) => (
								<Cell
									key={`cell-${idx}`}
									fill={COLORS[idx % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: TOOLTIP_BG,
								border: "none",
								color: TOOLTIP_TEXT,
							}}
							itemStyle={{
								color: TOOLTIP_TEXT,
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>

			{/* Stars Bar Chart */}
			<div className='bg-gray-700 rounded-2xl shadow-lg p-6'>
				<h3 className='text-white font-bold mb-4'>
					Top 5 Repos por Estrellas
				</h3>
				<ResponsiveContainer width='100%' height={250}>
					<BarChart data={topRepos}>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke={GRID_COLOR}
						/>
						<XAxis dataKey='name' tick={{ fill: TEXT_COLOR }} />
						<YAxis tick={{ fill: TEXT_COLOR }} />
						<Tooltip
							contentStyle={{
								backgroundColor: TOOLTIP_BG,
								border: "none",
								color: TOOLTIP_TEXT,
							}}
							itemStyle={{
								color: TOOLTIP_TEXT,
							}}
						/>
						<Bar dataKey='stars' fill={COLORS[0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* Forks Bar Chart */}
			<div className='bg-gray-700 rounded-2xl shadow-lg p-6 md:col-span-2'>
				<h3 className='text-white font-bold mb-4'>
					Top 5 Repos por Forks
				</h3>
				<ResponsiveContainer width='100%' height={250}>
					<BarChart data={topForks}>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke={GRID_COLOR}
						/>
						<XAxis dataKey='name' tick={{ fill: TEXT_COLOR }} />
						<YAxis tick={{ fill: TEXT_COLOR }} />
						<Tooltip
							contentStyle={{
								backgroundColor: TOOLTIP_BG,
								border: "none",
								color: TOOLTIP_TEXT,
							}}
							itemStyle={{
								color: TOOLTIP_TEXT,
							}}
						/>
						<Bar dataKey='forks' fill={COLORS[1]} />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* Commits Bar Chart */}
			<div className='bg-gray-700 rounded-2xl shadow-lg p-6 md:col-span-2'>
				<h3 className='text-white font-bold mb-4'>
					Top 5 Repos por Commits
				</h3>
				<ResponsiveContainer width='100%' height={250}>
					<BarChart data={topCommits}>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke={GRID_COLOR}
						/>
						<XAxis dataKey='name' tick={{ fill: TEXT_COLOR }} />
						<YAxis tick={{ fill: TEXT_COLOR }} />
						<Tooltip
							contentStyle={{
								backgroundColor: TOOLTIP_BG,
								border: "none",
								color: TOOLTIP_TEXT,
							}}
							itemStyle={{
								color: TOOLTIP_TEXT,
							}}
						/>
						<Bar dataKey='commits' fill={COLORS[2]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
