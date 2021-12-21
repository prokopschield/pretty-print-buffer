#!/usr/bin/env node

import pretty from '.';

process.stdin.on('data', (b) => process.stdout.write(pretty(b)));
