"use client";
import { RepoListProps } from "@/Interfaces/RepoListProps";
import { useMemo, useState } from "react";
import { RepoFilters } from "./RepoFilters";
import { RepoItem } from "./RepoItem";

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

	const handleApplyFilters = (filters: {
		search: string;
		language: string;
		minStars: number;
		minForks: number;
	}) => {
		setSearch(filters.search);
		setLanguage(filters.language);
		setMinStars(filters.minStars);
		setMinForks(filters.minForks);
		setFilterOpen(false);
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
				<RepoFilters
					initialSearch={search}
					initialLanguage={language}
					initialMinStars={minStars}
					initialMinForks={minForks}
					languages={languages}
					onApply={handleApplyFilters}
					onClose={() => setFilterOpen(false)}
				/>
			)}
			{/* Lista de Repositorios */}
			<ul className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
				{filteredRepos.map(repo => (
					<RepoItem key={repo.id} repo={repo} />
				))}
			</ul>
		</section>
	);
}
