import {
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
} from "recharts";

export function StarsBarChart({ topRepos }: { topRepos: any[] }) {
	const COLORS = ["#F97316", "#3B82F6", "#10B981", "#EAB308", "#8B5CF6"];
	const GRID_COLOR = "#4B5563"; // gray-600
	const TEXT_COLOR = "#D1D5DB"; // gray-300
	const TOOLTIP_BG = "#374151"; // gray-700
	const TOOLTIP_TEXT = "#F3F4F6"; // gray-100
	return (
		<div className='bg-gray-700 rounded-2xl shadow-lg p-6'>
			<h3 className='text-white font-bold mb-4'>
				Top 5 Repos por Estrellas
			</h3>
			<ResponsiveContainer width='100%' height={250}>
				<BarChart data={topRepos}>
					<CartesianGrid strokeDasharray='3 3' stroke={GRID_COLOR} />
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
	);
}
