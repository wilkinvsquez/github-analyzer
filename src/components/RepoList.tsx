"use client";
import { RepoListProps } from "@/Interfaces/RepoListProps";
import { useMemo, useState } from "react";

export function RepoList({ repos }: RepoListProps) {
	const [search, setSearch] = useState("");
	const [language, setLanguage] = useState("all");
	const [minStars, setMinStars] = useState(0);
	const [minForks, setMinForks] = useState(0);

	const [filterOpen, setFilterOpen] = useState(false);

	const filteredRepos = useMemo(() => {
		return repos.filter(repo => {
			const matchesSearch =
				repo.name.toLowerCase().includes(search.toLowerCase()) ||
				(repo.description &&
					repo.description
						.toLowerCase()
						.includes(search.toLowerCase())) ||
				(repo.language &&
					repo.language.toLowerCase().includes(search.toLowerCase()));

			const matchesLanguage =
				language === "all" ||
				(repo.language &&
					repo.language.toLowerCase() === language.toLowerCase());

			const matchesStars = repo.stargazers_count >= minStars;
			const matchesForks = repo.forks_count >= minForks;

			return (
				matchesSearch && matchesLanguage && matchesStars && matchesForks
			);
		});
	}, [repos, search, language, minStars, minForks]);
	const languages = useMemo(() => {
		const langs = repos
			.map(r => r.language)
			.filter(Boolean)
			.filter((v, i, a) => a.indexOf(v) === i);
		return langs;
	}, [repos]);

	// Para manejar filtros temporales mientras el modal está abierto
	const [tempSearch, setTempSearch] = useState("");
	const [tempLanguage, setTempLanguage] = useState("all");
	const [tempMinStars, setTempMinStars] = useState(0);
	const [tempMinForks, setTempMinForks] = useState(0);

	const openFilters = () => {
		setTempSearch(search);
		setTempLanguage(language);
		setTempMinStars(minStars);
		setTempMinForks(minForks);
		setFilterOpen(true);
	};

	const applyFilters = () => {
		setSearch(tempSearch);
		setLanguage(tempLanguage);
		setMinStars(tempMinStars);
		setMinForks(tempMinForks);
		setFilterOpen(false);
	};

	const resetFilters = () => {
		setSearch("");
		setLanguage("all");
		setMinStars(0);
		setMinForks(0);
	};

	const handleApplyFilters = () => {
		setFilterOpen(false); // Cierra el modal al aplicar
	};

	return (
		<section className='space-y-6 mt-8'>
			{/* Botón de Filtros */}
			<div className='flex justify-end'>
				<button
					className='px-4 py-2 bg-orange-500 text-white text-sm rounded-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400'
					onClick={() => setFilterOpen(true)}>
					Filtros
				</button>
			</div>

			{/* Modal de Filtros */}
			{filterOpen && (
				<div
					className='fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50'
					onClick={() => setFilterOpen(false)}>
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
									className='text-sm font-medium text-gray-400'
									htmlFor='search'>
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
									className='text-sm font-medium text-gray-400'
									htmlFor='language'>
									🌐 Lenguaje
								</label>
								<select
									id='language'
									className='w-full bg-gray-600 text-white text-sm border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-orange-400'
									value={language}
									onChange={e => setLanguage(e.target.value)}>
									<option value='all'>
										Todos los lenguajes
									</option>
									{languages.map(lang => (
										<option key={lang} value={lang}>
											{lang}
										</option>
									))}
								</select>
							</div>

							{/* Estrellas mínimas */}
							<div className='flex flex-col space-y-1'>
								<label
									className='text-sm font-medium text-gray-400'
									htmlFor='stars'>
									⭐ Estrellas mínimas
								</label>
								<input
									id='stars'
									type='number'
									min={0}
									className='w-full bg-gray-600 text-white text-sm border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-orange-400'
									value={minStars}
									onChange={e =>
										setMinStars(Number(e.target.value))
									}
								/>
							</div>

							{/* Forks mínimos */}
							<div className='flex flex-col space-y-1'>
								<label
									className='text-sm font-medium text-gray-400'
									htmlFor='forks'>
									🍴 Forks mínimos
								</label>
								<input
									id='forks'
									type='number'
									min={0}
									className='w-full bg-gray-600 text-white text-sm border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-orange-400'
									value={minForks}
									onChange={e =>
										setMinForks(Number(e.target.value))
									}
								/>
							</div>
						</div>

						{/* Botones de acción */}
						<div className='flex justify-center gap-2 mt-6'>
							<button
								onClick={() => {
									setSearch("");
									setLanguage("all");
									setMinStars(0);
									setMinForks(0);
								}}
								className='w-full px-4 py-2 border border-gray-500 text-gray-400 text-sm rounded-md transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400'>
								Resetear
							</button>
							<button
								onClick={() => setFilterOpen(false)}
								className='w-full px-4 py-2 bg-orange-500 text-white text-sm rounded-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400'>
								Aplicar
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Lista de Repositorios */}
			<ul className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
				{filteredRepos.map(repo => (
					<li
						key={repo.id}
						className='bg-gray-700 p-6 rounded-2xl shadow-md transform transition-all hover:shadow-2xl hover:-translate-y-1 hover:bg-gray-600'>
						<h3 className='text-xl font-bold text-white'>
							{repo.name}
						</h3>
						<p className='text-sm text-gray-400 mt-2'>
							{repo.description || "No description."}
						</p>
						<div className='flex flex-wrap items-center gap-2 mt-4 text-gray-400 text-xs'>
							<span>⭐ {repo.stargazers_count}</span>
							<span>🍴 {repo.forks_count}</span>
							<span>🧪 {repo.language}</span>
							{repo.commitCount !== undefined && (
								<span>📝 {repo.commitCount} commits</span>
							)}
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
