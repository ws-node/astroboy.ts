import OLD from "../controllers/old";
import { createRouter } from "../../src";

export = createRouter(OLD, "old", "/v1");
