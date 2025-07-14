import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.worker";

export const worker = setupWorker(...handlers);