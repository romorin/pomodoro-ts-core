export interface Pomodoro  {
	onEdit(): void;
	onToggle(): void;
	onReset(): void;
	incrementMin(): void;
	decrementMin(): void;
	incrementSec(): void;
	decrementSec(): void;
}
