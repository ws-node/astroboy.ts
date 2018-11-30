import TEST from "../controllers/test";
import { buildRouter } from "../../src";

export = buildRouter(TEST, "test", "/v1");
