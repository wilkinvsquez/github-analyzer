import { getUser, getUserRepos } from "@/services/githubAPI";

interface Props {
	params: { username: string };
}

export default async function UserPage({ params }: Props) {
	const { username } = await params;

	let userData, reposData;

	try {
		userData = await getUser(username);
		reposData = await getUserRepos(username);
	} catch (error) {
		<div className='p-4 text-center'>
			<h2 className='text-xl font-bold text-red-600'>
				Usuario no encontrado o error en la API
			</h2>
		</div>;
	}
	return (
		<main className='p-6 max-w-4xl mx-auto space-y-6'>
			<section className='bg-white shadow rounded p-4'>
				<h1 className='text-2xl font-bold'>
					{userData.name || userData.login}
				</h1>
				<p>{userData.bio}</p>
				<p>Repos públicos: {userData.public_repos}</p>
				<p>
					Seguidores: {userData.followers} · Siguiendo:{" "}
					{userData.following}
				</p>
			</section>

			<section>
				<h2 className='text-xl font-semibold mb-2'>Repositorios</h2>
				<ul className='grid gap-4'>
					{reposData.map((repo: any) => (
						<li
							key={repo.id}
							className='bg-white rounded shadow p-4'>
							<h3 className='font-bold text-lg'>{repo.name}</h3>
							<p className='text-sm text-gray-600'>
								{repo.description}
							</p>
							<p className='text-sm mt-2'>
								⭐ {repo.stargazers_count} · 🍴{" "}
								{repo.forks_count} · 🧪 {repo.language}
							</p>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
