import type { NextApiRequest, NextApiResponse } from "next";
import { httpRequestCounter } from "./metrics";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  httpRequestCounter.inc({ method: req.method, route: '/health-check' });
  res.end("health check success");
}
