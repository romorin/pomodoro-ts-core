import { CounterStatus } from './counter-status';
import { CounterConstants } from './counter-constants';

export class CounterDecoration {
	constructor(
		public left: string,
		public right: string
	) {}
}

export interface Counter {
	toggle(onTick: (counter: Counter) => void): void;
	reset(): void;

	getLength(): number;
	setLength(newLength: number): void;

	backup(): void;
	restore(): void;

	getRemaining(): number;

	getTitle(): string;
	setTitle(newTitle: string): void;

	getDecorations(): CounterDecoration;

	getStatus(): CounterStatus;
}
