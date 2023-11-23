const express = require('express');
const fs  = require('node:fs');
const path = require("path");

const pathToReleases = path.join(__dirname, 'dist', 'builderReleases');

const app = new express();

app.use((req, res, next) => {
	const rangeHeader = req.headers['range'];
	if (rangeHeader) {
		res.setHeader('Content-Type', 'multipart/byteranges');
	}
	next(); 
});

app.use(express.static(pathToReleases));

server = app.listen(4001);
