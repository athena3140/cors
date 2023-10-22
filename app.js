const express = require("express"),
	axios = require("axios"),
	url = require("url"),
	cors = require("cors"),
	app = express();
app.use(cors());
const port = 4e3;
app.get("/:url(*)", (e, t) => {
	let s = e.params.url;
	if (!s) {
		t.status(400).json({ error: "Please provide a URL" });
		return;
	}
	let r = url.parse(s);
	r.protocol || (r.protocol = "http:");
	let o = url.format(r);
	axios.get(o, { responseType: "arraybuffer" })
		.then((e) => {
			let s = e.headers["content-type"];
			t.set("Content-Type", s), t.send(e.data);
		})
		.catch((e) => {
			t.status(500).send(e.message);
		});
}),
	app.all("/:url(*)", (e, t) => {
		t.status(405).json({ error: "Sorry, only the GET method is allowed for this endpoint." });
	}),
	app.listen(4e3, () => {
		console.log("App listening at http://localhost:4000");
	});
