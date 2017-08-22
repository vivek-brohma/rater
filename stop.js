const fs = require('fs');
try {
	const pid = +fs.readFileSync(__dirname + '/pid');

	require('child_process').exec(`kill ${pid}`, (err, sout, serr) => {
		if (err) {
			console.log('[ERROR]', err);
		} else {
			console.log(sout, serr);
		}
	});
} catch (e) {
	console.log('[ERROR]', e);
}
