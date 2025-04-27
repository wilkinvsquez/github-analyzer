import { UserCardProps } from "@/Interfaces/UserCardProps";

export function UserCard({ user }: UserCardProps) {
	return (
		<section className='p-8 bg-gray-700 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-xl hover:bg-gray-500 transition-all'>
			<img
				src={user.avatar_url}
				alt='Avatar'
				className='w-32 h-32 rounded-full border-4 border-slate-300 shadow-md'
			/>
			<div className='text-center sm:text-left space-y-2'>
				<h1 className='text-3xl font-bold text-white'>{user.name}</h1>
				<p className='text-lg text-gray-400'>@{user.login}</p>

				<div className='flex flex-wrap justify-center sm:justify-start gap-6 text-sm text-gray-400 mt-4'>
					<span className='flex items-center gap-1'>
						👥 <strong>{user.followers}</strong> followers
					</span>
					<span className='flex items-center gap-1'>
						📦 <strong>{user.public_repos}</strong> repos
					</span>
					<span className='flex items-center gap-1'>
						🏡 {user.location || "Unknown"}
					</span>
				</div>

				{user.bio && (
					<p className='mt-6 text-gray-400 max-w-lg mx-auto sm:mx-0'>
						{user.bio}
					</p>
				)}
			</div>
		</section>
	);
}
