enum Mode {
	'default',
	'ctrl',
	'text',
	'hex',
}

const colors = {
	red: '\x1b[0;31m',
	green: '\x1b[0;32m',
	blue: '\x1b[0;34m',
};

/**
 * Pretty print buffer
 * @param buffer Buffer to pretty-print
 * @returns {string} string with ANSI escape codes
 */
function pretty_print_buffer(buffer: Uint8Array | number[]) {
	let ret = '';
	let mode: Mode = Mode.default;
	for (const byte of buffer) {
		if (byte === 10) {
			ret += '\r\n';
		} else if (byte < 32) {
			if (mode !== Mode.ctrl) {
				mode = Mode.ctrl;
				ret += colors.red;
			}
			ret += '^' + String.fromCharCode(64 + byte);
		} else if (byte >= 127) {
			if (mode !== Mode.hex) {
				mode = Mode.hex;
				ret += colors.blue;
			}
			ret += (byte >> 4).toString(16) + (byte & 15).toString(16);
		} else {
			if (mode !== Mode.text) {
				mode = Mode.text;
				ret += colors.green;
			}
			ret += String.fromCharCode(byte);
		}
	}
	return ret + '\x1b[0m';
}

export = pretty_print_buffer;
