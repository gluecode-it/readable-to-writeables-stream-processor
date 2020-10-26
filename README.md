[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) [![NPM Version](https://img.shields.io/npm/v/@gluecode-it/readable-to-writeables-stream-processor.svg?style=flat-square)](https://www.npmjs.com/package/@gluecode-it/readable-to-writeables-stream-processor) 

An abstract class to transform a readable stream to multiple writeable streams via pipe

## Contents

- [Installation](#installation)
- [Example usage](#example-usage)

## Installation

```bash
$ npm install @gluecode-it/readable-to-writeables-stream-processor
```

## Example usage

```js
import { ReadableToWriteablesSteamProcessor } from '@gluecode-it/readable-to-writeables-stream-processor';
import { Parse, Entry } from 'unzipper';
import { Writable } from 'stream';

export class ReadableStreamUnzipProcessor extends ReadableToWriteablesSteamProcessor {
	parseStream(getWriteableStreamCallback: (filePath: string) => Writable) {
		const stream = Parse();
		stream.on('entry', (entry: Entry) => {
			getWriteableStreamCallback(entry.props.path);
		});
		return stream;
	}
}
```

## See also
* [@gluecode-it/readable-stream-unzip-processor](https://github.com/gluecode-it/readable-stream-unzip-processor)