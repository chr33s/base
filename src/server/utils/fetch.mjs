import { Exception } from "./Exception.mjs";
import _fetch from "node-fetch";

export async function fetch(uri, params) {
  uri = uri.replace(/(?:[^:])(\/{2,})/g, (match, group) =>
    match.replace(group, "/")
  );

  const req = await _fetch(uri, params);
  const res = await req.json();
  if (!req.ok) {
    throw new Exception({
      code: req.status,
      message: req.statusText,
    });
  }

  return res;
}
