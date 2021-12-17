import express from "express";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";

let app = express();

app.use(json());

app.use(currentUserRouter);

app.listen(3000, () => console.log("Auth listening on 3000"));
