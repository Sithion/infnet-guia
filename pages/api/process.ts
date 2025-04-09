import type { NextApiRequest, NextApiResponse } from "next";
import { httpRequestCounter } from "./metrics";
function simulateModerateCPULoad(iterations = 500_000) {
  let result = 0;
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i + Math.random());
  }
  return result;
}

function simulateMemoryUsage(sizeInMB = 5) {
  const buffer = Buffer.alloc(sizeInMB * 1024 * 1024);
  return buffer.toString("base64").substring(0, 50);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  httpRequestCounter.inc({ method: req.method, route: '/process' });
  const cpuResult = simulateModerateCPULoad();
  const memSample = simulateMemoryUsage();
  await delay(30);

  res.status(200).json({
    status: "ok",
    cpuLoadSample: cpuResult,
    memorySample: memSample.length,
  });
}
