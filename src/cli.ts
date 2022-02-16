#!/usr/bin/env node

import fs from 'fs';
import pretty from '.';

let flags: {
	[flag: string]: boolean;
} = {};

async function processFile(file: string) {
	flags['no-implicit-stdin'] = true;
	const stat = await fs.promises.stat(file);
	if (!stat.isFile()) {
		throw new Error(`${file} is not a file.`);
	}
	const stream = fs.createReadStream(file);
	stream.on('data', (chunk) =>
		process.stdout.write(pretty(Buffer.from(chunk)))
	);
	return new Promise((resolve) => stream.on('end', resolve));
}

enum READMODE {
	DEFAULT,
}

async function main() {
	let readmode: READMODE = READMODE.DEFAULT;
	for (const arg of process.argv.slice(2)) {
		try {
			switch (readmode) {
				default: {
					switch (arg[0]) {
						default: {
							await processFile(arg);
						}
					}
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
	if (flags['read-stdin'] || !flags['no-implicit-stdin']) {
		process.stdin.on('data', (b) => process.stdout.write(pretty(b)));
	}
}

main();
