import Skeleton from "react-loading-skeleton";

export function RepoListSkeleton() {
	return (
		<section>
			<h2 className='text-xl font-semibold mb-2'>Repositorios</h2>
			<ul className='grid gap-4'>
				{Array.from({ length: 5 }).map((_, i) => (
					<li key={i} className='bg-white rounded shadow p-4'>
						<Skeleton height={24} width={150} />
						<Skeleton count={2} />
					</li>
				))}
			</ul>
		</section>
	);
}
