import type { Config } from "@react-router/dev/config";
import { fetchData } from "./app/lib/fetchData";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
 prerender: async ({ getStaticPaths }) => {
    const data = await fetchData();
    const paths = data.map((country) => `/detail/${country.name.toLowerCase()}`);
    return [
      "/",
      ...paths
    ];
  },
} satisfies Config;
