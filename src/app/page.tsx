"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [username, setUsername] = useState("");
	const router = useRouter();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (!username.trim()) return;
		router.push(`/${username}`);
	};

	return (
		<main className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
			<form onSubmit={handleSearch} className='flex gap-2'>
				<input
					type='text'
					placeholder='Buscar un usuario de github'
					value={username}
					onChange={e => setUsername(e.target.value)}
					className='p-2 rounded border border-gray-300'
				/>
				<button
					type='submit'
					className='bg-black text-white px-4 py-2 rounded'>
					{" "}
					Buscar
				</button>
			</form>
		</main>
	);
}
