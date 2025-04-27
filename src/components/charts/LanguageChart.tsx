import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export function LanguageChart({ languageData }: { languageData: any[] }) {
	const COLORS = ["#F97316", "#3B82F6", "#10B981", "#EAB308", "#8B5CF6"];
	const TEXT_COLOR = "#D1D5DB"; // gray-300
	const TOOLTIP_BG = "#374151"; // gray-700
	const TOOLTIP_TEXT = "#F3F4F6"; // gray-100
	return (
		<div className='bg-gray-700 rounded-2xl shadow-lg p-6'>
			<h3 className='text-white font-bold mb-4'>Lenguajes más usados</h3>
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
	);
}
