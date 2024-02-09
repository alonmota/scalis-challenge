'use client';
import { MouseEventHandler, useState } from 'react';

export interface ButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
	children: React.ReactNode;
	title?: string;
}

export default function Button({
	onClick,
	className,
	children,
	title,
}: ButtonProps) {
	const [effect, setEffect] = useState(false);

	return (
		<button
			onClick={(event) => {
				setEffect(true);
				if (onClick) onClick(event);
			}}
			title={title}
			className={`${effect && 'animate-click'} ${className}`}
			onAnimationEnd={() => setEffect(false)}
		>
			{children}
		</button>
	);
}
