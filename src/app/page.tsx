"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { searchUsers } from "@/services/githubAPI";

export default function Home() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (query.length < 2) {
			setResults([]);
			return;
		}

		const timeout = setTimeout(async () => {
			setLoading(true);
			try {
				const res = await searchUsers(query);
				setResults(res.items || []);
			} catch (err) {
				console.error("Error al buscar usuarios:", err);
			} finally {
				setLoading(false);
			}
		}, 400);

		return () => clearTimeout(timeout);
	}, [query]);

	const handleRedirect = (username: string) => {
		router.push(`/pages/${username}`);
	};

	return (
		<main className='min-h-screen bg-gray-800 px-4 py-12'>
			<div className='max-w-4xl mx-auto text-center mb-10'>
				<h1 className='text-4xl font-extrabold text-white mb-4'>
					🔎 Encuentra usuarios de GitHub
				</h1>
				<p className='text-gray-400 mb-6'>
					Busca perfiles y explora sus repositorios de forma sencilla.
				</p>
				<div className='flex justify-center'>
					<input
						type='text'
						value={query}
						onChange={e => setQuery(e.target.value)}
						placeholder='Buscar usuario...'
						className='w-full max-w-md p-4 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition'
					/>
				</div>
				{loading && (
					<p className='text-sm text-gray-400 mt-2 animate-pulse'>
						Buscando usuarios...
					</p>
				)}
			</div>

			{results.length > 0 && (
				<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto'>
					{results.map(user => (
						<div
							key={user.id}
							onClick={() => handleRedirect(user.login)}
							className='group bg-gray-600 p-6 rounded-2xl shadow-md hover:shadow-lg hover:bg-gray-500 transition cursor-pointer flex flex-col items-center text-center'>
							<img
								src={user.avatar_url}
								alt={user.login}
								className='w-24 h-24 rounded-full border-4 border-gray-700 mb-4 transition-transform group-hover:scale-105'
							/>
							<h2 className='text-xl font-bold text-white'>
								{user.login}
							</h2>
							<p className='text-gray-400 capitalize mt-1 text-sm'>
								{user.type.toLowerCase()}
							</p>
							<button className='mt-4 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-semibold transition cursor-pointer'>
								Ver perfil →
							</button>
						</div>
					))}
				</div>
			)}
		</main>
	);
}
