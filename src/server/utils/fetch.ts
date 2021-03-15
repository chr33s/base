import _fetch from "node-fetch";

import { Exception } from "./Exception";

export async function fetch(
  uri: string,
  params: RequestInit
): Promise<Response> {
  uri = uri.replace(/(?:[^:])(\/{2,})/g, (match, group) =>
    match.replace(group, "/")
  );

  const req = await _fetch(uri, params as any);
  const res = await req.json();
  if (!req.ok) {
    throw new Exception({
      code: req.status,
      message: req.statusText,
    });
  }

  return res;
}
