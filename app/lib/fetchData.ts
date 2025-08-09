import type { Country } from "types/country";
import fs from "fs/promises";
import path from "path";

export const fetchData = async (): Promise<Country[]> => {
  if (typeof window === "undefined") {
    // SSR/Build mode → baca langsung file dari public
    const filePath = path.join(process.cwd(), "public", "data.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    return data;
  } else {
    // Browser mode → fetch via HTTP
    const res = await fetch("/data.json");
    return res.json();
  }
};

