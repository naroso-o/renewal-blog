import { setupServer } from "msw/node";
import { handlers } from "./handlers.server";

export const server = setupServer(...handlers);