// Author: Raihan Haykal
import { Request } from "express";

/** Mengambil Device ID dari header X-Device-Id (identitas tanpa login). */
export function deviceId(req: Request): string | null {
  const id = req.header("x-device-id");
  return id && id.trim() ? id.trim() : null;
}
