import { getUser, getUserRepos } from "@/services/githubAPI";
import { getCommitCount } from "@/services/githubAPI";
import { DynamicUserProps } from "@/Interfaces/DynamicUserProps";
import { Dashboard } from "@/components/Dashboard";

import { UserSkeleton } from "@/components/Skeletons/UserSkeleton";
import { RepoListSkeleton } from "@/components/Skeletons/RepoListSekeleton";
import { DashboardSkeleton } from "@/components/Skeletons/DashboardSkeleton";
import { RepoList } from "@/components/RepoList";

export default async function UserPage({ params }: DynamicUserProps) {
	const { username } = await params;
	let userData: any, reposData: any;
	userData = await getUser(username);
	try {
		reposData = await getUserRepos(username);
		reposData = await Promise.all(
			reposData.map(async (repo: any) => {
				try {
					const commitCount = await getCommitCount(
						userData.login,
						repo.name,
					);
					return { ...repo, commits: commitCount };
				} catch {
					return { ...repo, commits: 0 };
				}
			}),
		);
	} catch (error) {
		<div className='p-4 text-center'>
			<h2 className='text-xl font-bold text-red-600'>
				Usuario no encontrado o error en la API
			</h2>
		</div>;
	}
	return (
		<main className='p-6  max-w-4xl mx-auto space-y-8'>
			{/* Perfil de usuario */}
			<section className='p-8 bg-gray-700 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-xl hover:bg-gray-500 transition-all'>
				<img
					src={userData.avatar_url}
					alt='Avatar'
					className='w-32 h-32 rounded-full border-4 border-slate-300 shadow-md'
				/>
				<div className='text-center sm:text-left space-y-2'>
					<h1 className='text-3xl font-bold text-white'>
						{userData.name}
					</h1>
					<p className='text-lg text-gray-400'>@{userData.login}</p>

					<div className='flex flex-wrap justify-center sm:justify-start gap-6 text-sm text-gray-400 mt-4'>
						<span className='flex items-center gap-1'>
							👥 <strong>{userData.followers}</strong> followers
						</span>
						<span className='flex items-center gap-1'>
							📦 <strong>{userData.public_repos}</strong> repos
						</span>
						<span className='flex items-center gap-1'>
							🏡 {userData.location || "Unknown"}
						</span>
					</div>

					{userData.bio && (
						<p className='mt-6 text-gray-400 max-w-lg mx-auto sm:mx-0'>
							{userData.bio}
						</p>
					)}
				</div>
			</section>

			{/* Repositorios */}
			<section className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-400'>
					Repositorios
				</h2>
				<RepoList repos={reposData} />
			</section>

			{/* Dashboard de estadísticas */}
			<section>
				<Dashboard repos={reposData} />
			</section>
		</main>
	);
}
