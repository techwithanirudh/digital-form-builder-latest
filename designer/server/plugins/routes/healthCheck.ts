import { ServerRoute } from "@hapi/hapi";
import config from "../../config";

export const healthCheckRoute: ServerRoute = {
  method: "GET",
  path: "/health-check",
  handler: function () {
    const date = new Date();

    return {
      status: "OK",
      lastCommit: config.lastCommit,
      lastTag: config.lastTag,
      time: date.toUTCString(),
    };
  },
};
