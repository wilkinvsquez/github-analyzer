import { getUser, getUserRepos } from "@/services/githubAPI";
import { getCommitCount } from "@/services/githubAPI";
import { DynamicUserProps } from "@/Interfaces/DynamicUserProps";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { RepoList } from "@/components/repositories/RepoList";
import { UserCard } from "@/components/user/UserCard";

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
			<section className='space-y-4'>
				<UserCard user={userData} />
			</section>

			{/* Repositorios */}
			<section className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-400'>
					Repositorios
				</h2>
				<RepoList repos={reposData} />
			</section>

			{/* Dashboard de estadísticas */}
			<section className='space-y-4'>
				<Dashboard repos={reposData} />
			</section>
		</main>
	);
}
