export class Timify {
	private constructor() {}

	public static minutify(value: number): number {
		return Math.floor(value / 60);
	}

	public static secondify(value: number): string {
		let result = Math.round(value % 60);
		if (result < 10) {
			return '0' + result;
		} else {
			return (result.toString());
		}
	}
}
