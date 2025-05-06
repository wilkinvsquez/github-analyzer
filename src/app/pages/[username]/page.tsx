"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUser, getUserRepos, getCommitCount } from "@/services/githubAPI";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { RepoList } from "@/components/repositories/RepoList";
import { UserCard } from "@/components/user/UserCard";

export default function UserPage() {
	const { username } = useParams();
	const [userData, setUserData] = useState<any>(null);
	const [reposData, setReposData] = useState<any[]>([]);
	const [error, setError] = useState<string | null>(null);
	console.log("username", username);

	useEffect(() => {
		if (!username) return;

		const fetchData = async () => {
			try {
				const user = await getUser(username as string);
				const repos = await getUserRepos(username as string);

				const reposWithCommits = await Promise.all(
					repos.map(async (repo: any) => {
						try {
							const commitCount = await getCommitCount(
								user.login,
								repo.name,
							);
							return { ...repo, commits: commitCount };
						} catch {
							return { ...repo, commits: 0 };
						}
					}),
				);

				setUserData(user);
				setReposData(reposWithCommits);
			} catch (err) {
				setError("Usuario no encontrado o error en la API");
			}
		};

		fetchData();
	}, [username]);

	if (error) {
		return (
			<div className='p-4 text-center'>
				<h2 className='text-xl font-bold text-red-600'>{error}</h2>
			</div>
		);
	}

	if (!userData) {
		return (
			<div className='p-4 text-center'>
				<h2 className='text-lg text-gray-500'>Cargando datos...</h2>
			</div>
		);
	}

	return (
		<main className='p-6 max-w-4xl mx-auto space-y-8'>
			<section className='space-y-4'>
				<UserCard user={userData} />
			</section>

			<section className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-400'>
					Repositorios
				</h2>
				<RepoList repos={reposData} />
			</section>

			<section className='space-y-4'>
				<Dashboard repos={reposData} />
			</section>
		</main>
	);
}
