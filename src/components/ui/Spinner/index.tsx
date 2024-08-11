import React, { HTMLAttributes } from 'react';

export interface SpinnerProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
	size?: 'xs' | 's' | 'm' | 'l' | 'xl';
	position?: 'relative' | 'absolute';
}

export const Spinner: React.FC<SpinnerProps> = (props): JSX.Element => {
	const sizes = { xs: 12, s: 16, m: 20, l: 24, xl: 32 };
	const { size = 'm', position = 'relative', ...attrs } = props;
	const d = sizes[size] || size;

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				width={ d }
				height={ d }
			>
				<g fill="none" fillRule="evenodd" strokeWidth="2">
					<path
						stroke="#DE4973"
						strokeOpacity=".87"
						d="M3.05 12.95a7 7 0 0 1 9.9-9.9"
					/>
					<path stroke="#eff1f5" d="M3.05 12.95a7 7 0 0 0 9.9-9.9" />
				</g>
			</svg>
		</>
	);
};

Spinner.displayName = 'Spinner';
Spinner.defaultProps = {
	size: 'm',
	position: 'relative'
};

export default Spinner;
