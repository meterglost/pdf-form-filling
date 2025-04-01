import express from "express";
import multer from "multer";
import cors from "cors";

import { spawn } from "node:child_process";
import path from "node:path";

import { __dirname } from "./config.js";

const typstSpawnOptions = {
	cwd: path.join(__dirname, "../templates/"),
};

const app = express();
const upload = multer(); // For handling multipart/form-data

app.use(cors()); // Enable CORS for all routes

const PORT = 3000;

app.get("/ping", (req, res) => {
	res.send("pong");
});

app.post("/render/html", upload.single("file"), (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}

	const prefix = `
        #include "base.typ"
    `;

	const postfix = `
    `;

	const template = Buffer.concat([Buffer.from(prefix), req.file.buffer, Buffer.from(postfix)]);

	const typstProcess = spawn(
		"typst",
		["compile", "--features", "html", "--format", "html", "-", "-"],
		typstSpawnOptions,
	);

	// Pipe the uploaded file to the typst process
	typstProcess.stdin.write(template);
	typstProcess.stdin.end();

	const output = [];
	const errorOutput = [];

	// Collect the output from the typst process
	typstProcess.stdout.on("data", (data) => {
		output.push(data);
	});

	// Collect any errors from the typst process
	typstProcess.stderr.on("data", (data) => {
		errorOutput.push(data);
	});

	typstProcess.on("close", (code) => {
		if (code === 0) {
			res.setHeader("Content-Type", "text/html");
			res.send(Buffer.concat(output).toString());
		} else {
			res.status(500).send(`Error: ${Buffer.concat(errorOutput).toString()}`);
		}
	});
});

app.post("/render/pdf", upload.single("file"), (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}

	const input = req.body.input;
	if (!input) {
		return res.status(400).send("Input parameter is required.");
	}

	try {
		JSON.parse(input);
	} catch (error) {
		return res.status(400).send("Invalid input parameter. Must be a valid JSON object.");
	}

	const prefix = `
        #include "base.typ"
    `;

	const postfix = `
    `;

	const template = Buffer.concat([Buffer.from(prefix), req.file.buffer, Buffer.from(postfix)]);

	const typstProcess = spawn(
		"typst",
		["compile", "--features", "html", "--format", "pdf", "--input", `input=${input}`, "-", "-"],
		typstSpawnOptions,
	);

	// Pipe the uploaded file to the typst process
	typstProcess.stdin.write(template);
	typstProcess.stdin.end();

	const output = [];
	const errorOutput = [];

	// Collect the output from the typst process
	typstProcess.stdout.on("data", (data) => {
		output.push(data);
	});

	// Collect any errors from the typst process
	typstProcess.stderr.on("data", (data) => {
		errorOutput.push(data);
	});

	typstProcess.on("close", (code) => {
		if (code === 0) {
			res.setHeader("Content-Type", "application/pdf");
			res.send(Buffer.concat(output));
		} else {
			res.status(500).send(`Error: ${Buffer.concat(errorOutput).toString()}`);
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
