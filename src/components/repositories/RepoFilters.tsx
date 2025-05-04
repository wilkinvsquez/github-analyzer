import { RepoFiltersProps } from "@/Interfaces/RepoFiltersProps";
import { useState, useEffect } from "react";

export function RepoFilters({
	initialSearch,
	initialLanguage,
	initialMinStars,
	initialMinForks,
	languages,
	onApply,
	onClose,
}: RepoFiltersProps) {
	const [search, setSearch] = useState(initialSearch);
	const [language, setLanguage] = useState(initialLanguage);
	const [minStars, setMinStars] = useState(initialMinStars);
	const [minForks, setMinForks] = useState(initialMinForks);

	useEffect(() => {
		setSearch(initialSearch);
		setLanguage(initialLanguage);
		setMinStars(initialMinStars);
		setMinForks(initialMinForks);
	}, [initialSearch, initialLanguage, initialMinStars, initialMinForks]);

	const handleReset = () => {
		setSearch("");
		setLanguage("all");
		setMinStars(0);
		setMinForks(0);
	};

	const handleApply = () => {
		onApply({ search, language, minStars, minForks });
	};

	return (
		<div
			className='fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50'
			onClick={onClose}>
			<div
				className='bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4'
				onClick={e => e.stopPropagation()}>
				<h2 className='text-xl font-bold text-white mb-4'>
					Filtrar Repositorios
				</h2>

				<div className='space-y-4'>
					{/* Buscar Repositorio */}
					<div className='flex flex-col space-y-1'>
						<label
							htmlFor='search'
							className='text-sm font-medium text-gray-400'>
							🔍 Buscar repositorio
						</label>
						<input
							id='search'
							type='text'
							placeholder='Buscar repositorios...'
							className='w-full bg-gray-600 placeholder:text-gray-400 text-white text-sm border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-orange-400'
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>

					{/* Lenguaje */}
					<div className='flex flex-col space-y-1'>
						<label
							htmlFor='language'
							className='text-sm font-medium text-gray-400'>
							🌐 Lenguaje
						</label>
						<select
							id='language'
							className='w-full bg-gray-600 text-white text-sm border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-orange-400'
							value={language}
							onChange={e => setLanguage(e.target.value)}>
							<option value='all'>Todos los lenguajes</option>
							{languages.map(lang => (
								<option
									key={lang ?? "unknown"}
									value={lang ?? "unknown"}>
									{lang ?? "Unknown"}
								</option>
							))}
						</select>
					</div>

					{/* Estrellas mínimas */}
					<div className='flex flex-col space-y-1'>
						<label
							htmlFor='stars'
							className='text-sm font-medium text-gray-400'>
							⭐ Estrellas mínimas
						</label>
						<input
							id='stars'
							type='number'
							min={0}
							className='w-full bg-gray-600 text-white text-sm border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-orange-400'
							value={minStars}
							onChange={e => setMinStars(Number(e.target.value))}
						/>
					</div>

					{/* Forks mínimos */}
					<div className='flex flex-col space-y-1'>
						<label
							htmlFor='forks'
							className='text-sm font-medium text-gray-400'>
							🍴 Forks mínimos
						</label>
						<input
							id='forks'
							type='number'
							min={0}
							className='w-full bg-gray-600 text-white text-sm border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-orange-400'
							value={minForks}
							onChange={e => setMinForks(Number(e.target.value))}
						/>
					</div>
				</div>

				{/* Botones de acción */}
				<div className='flex justify-center gap-2 mt-6'>
					<button
						onClick={handleReset}
						className='w-full px-4 py-2 border border-gray-500 text-gray-400 text-sm rounded-md transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400'>
						Resetear
					</button>
					<button
						onClick={handleApply}
						className='w-full px-4 py-2 bg-orange-500 text-white text-sm rounded-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400'>
						Aplicar
					</button>
				</div>
			</div>
		</div>
	);
}
