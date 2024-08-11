import React, { ReactNode } from 'react';
import Spinner from '../Spinner';
export type WithSkeletonProps = {
	readonly isLoading: boolean;
	readonly isEmpty: boolean;
	readonly error?: React.ReactNode | string;

	readonly skeletonSlot?: ReactNode;
	readonly emptySpaceSlot?: ReactNode;
	readonly emptyTextData?: string;
};

export const WithSkeleton: React.FC<React.PropsWithChildren<WithSkeletonProps>> = (props) => {
	const { isLoading, isEmpty, error, skeletonSlot, emptySpaceSlot, emptyTextData, children } =
		props;
	if (error) {
		return <>Не удалось загрузить данные :(</>;
	}

	if (!isEmpty && !isLoading && !error) {
		return <>{ children }</>;
	}

	if (isLoading) {
		return <>{ skeletonSlot || <Spinner size='xl' /> }</>;
	}

	if (!isLoading && !error && isEmpty) {
		return <>{ emptySpaceSlot || emptyTextData || '' }</>;
	}

	return <>error</>;
};
