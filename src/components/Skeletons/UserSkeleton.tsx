import Skeleton from "react-loading-skeleton";

export function UserSkeleton() {
	return (
		<section className='bg-white shadow rounded p-4 space-y-2'>
			<Skeleton height={28} width={180} />
			<Skeleton count={3} />
		</section>
	);
}
