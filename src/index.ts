import { Writable, Readable, Duplex } from 'stream';

export abstract class ReadableToWriteablesSteamProcessor {
	abstract parseStream(
		getWriteableStreamCallback: (filePath: string) => Writable
	): Duplex;

	async process(
		readableStream: Readable,
		getWriteableStreamCallback: (filePath: string) => Writable
	): Promise<void> {
		return new Promise((resolve, reject) => {
			readableStream
				.pipe(this.parseStream(getWriteableStreamCallback))
				.on('finish', async () => {
					resolve();
				})
				.on('error', (err) => {
					reject(err);
				});
		});
	}
}
