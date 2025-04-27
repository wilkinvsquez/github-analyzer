import Skeleton from "react-loading-skeleton";

export function DashboardSkeleton() {
	return (
		<div className='grid md:grid-cols-2 gap-4'>
			<div className='bg-white rounded shadow p-4'>
				<Skeleton height={24} width={180} />
				<Skeleton height={200} />
			</div>
			<div className='bg-white rounded shadow p-4'>
				<Skeleton height={24} width={180} />
				<Skeleton height={200} />
			</div>
		</div>
	);
}
