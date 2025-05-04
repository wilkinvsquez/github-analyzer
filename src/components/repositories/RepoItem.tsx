import { Repo } from "@/Interfaces/Repo";

export function RepoItem({ repo }: { repo: Repo }) {
	return (
		<li
			key={repo.id}
			className='bg-gray-700 p-6 rounded-2xl shadow-md transform transition-all hover:shadow-2xl hover:-translate-y-1 hover:bg-gray-600'>
			<h3 className='text-xl font-bold text-white'>{repo.name}</h3>
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
	);
}
