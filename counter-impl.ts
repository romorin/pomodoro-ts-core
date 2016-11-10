import { CounterStatus } from './counter-status';
import { CounterConstants } from './counter-constants';
import { Counter, CounterDecoration } from './counter';

export class CounterImpl implements Counter {
	private _status = CounterStatus.Paused;
	private _title: string;
	private _length: number;
	private _remaining: number;
	private _interval: any;
	private _decorations: {[status: number]: CounterDecoration} = {};

	private _titleBackup: string;
	private _lengthBackup: number;

	constructor(_constants: CounterConstants) {
		this._title = _constants.ACTION;
		this._length = _constants.LENGTH;
		this._remaining = this._length;
		this._interval = null;

		this._decorations[CounterStatus.Running] = new CounterDecoration(
			_constants.RUNNING_LEFT_DECORATION, _constants.RUNNING_RIGHT_DECORATION);
		this._decorations[CounterStatus.Paused] = new CounterDecoration(
			_constants.PAUSED_LEFT_DECORATION, _constants.PAUSED_RIGHT_DECORATION);
		this._decorations[CounterStatus.Over] = new CounterDecoration(
			_constants.OVER_LEFT_DECORATION, _constants.OVER_RIGHT_DECORATION);
	}

	public toggle(onTick: (counter: Counter) => void) {
		if (this._status === CounterStatus.Paused) {
			this.startCounting(onTick);
		} else if (this._status ===  CounterStatus.Running) {
			this.stopCounting();
		}
	}

	public reset() {
		if (this._interval) {
			this.stopInterval();
		}
		this._status = CounterStatus.Paused;
		this._remaining = this._length;
	}

	public getLength() {
		return this._length;
	}

	public setLength(newLength: number) {
		this._length = newLength > 1 ? newLength : 1;
		this._remaining = this._length;
	}

	public backup() {
		this._titleBackup = this._title;
		this._lengthBackup = this._length;
	}

	public restore() {
		this._title = this._titleBackup;
		this.setLength(this._lengthBackup);
	}

	public getRemaining() {
		return this._remaining;
	}

	public getTitle() {
		return this._title;
	}

	public setTitle(newTitle: string) {
		this._title = newTitle;
	}

	public getDecorations(): CounterDecoration {
		return this._decorations[this._status];
	}

	public getStatus() {
		return this._status;
	}

	private startCounting(onTick: (counter: Counter) => void) {
		if (this._remaining === null) {
			this._remaining = this._length;
		}
		this._status = CounterStatus.Running;
		this._interval = setInterval(() => {
			this._remaining -= 1;
			if (this._remaining < 1) {
				this.stopInterval();
				this._status = CounterStatus.Over;
			}
			onTick(this);
		}, 1000);
	}

	private stopCounting() {
		this._status = CounterStatus.Paused;
		this.stopInterval();
	}

	private stopInterval() {
		clearInterval(this._interval);
		this._interval = null;
	}
}
