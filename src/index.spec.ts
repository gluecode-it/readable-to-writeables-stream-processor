import { ReadableToWriteablesSteamProcessor } from '.';
import { Duplex, Writable, Readable } from 'stream';
import { EventEmitter } from 'events';

describe(ReadableToWriteablesSteamProcessor.name, () => {
	it('should be defined', () => {
		class ExampleProcessor extends ReadableToWriteablesSteamProcessor {
			parseStream(
				getWriteableStreamCallback: (filePath: string) => Writable
			): Duplex {
				return new Duplex();
			}
		}

		expect(new ExampleProcessor()).toBeInstanceOf(ExampleProcessor);
	});

	describe('process()', () => {
		const testEmitter = new EventEmitter();
		class ExampleProcessor extends ReadableToWriteablesSteamProcessor {
			parseStream(
				getWriteableStreamCallback: (filePath: string) => Writable
			): Duplex {
				const duplex = new Duplex();
				testEmitter.on('errorThrown', () => {
					duplex.emit('error', new Error('My Error'));
				});
				testEmitter.on('finished', () => {
					duplex.emit('finish');
				});
				return duplex;
			}
		}
		it('should resolve if processing was successful', async () => {
			const processor = new ExampleProcessor();
			await expect(
				processor.process(
					new Readable({
						read: () => {
							testEmitter.emit('finished');
						},
					}),
					(filePath) => new Writable()
				)
			).resolves.toBeUndefined();
		});

		it('should reject if processing was not successful', async () => {
			const processor = new ExampleProcessor();
			await expect(
				processor.process(
					new Readable({
						read: () => {
							testEmitter.emit('errorThrown');
						},
					}),
					(filePath) => new Writable()
				)
			).rejects.toThrowError('My Error');
		});
	});
});
