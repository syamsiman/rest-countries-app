import type { Country } from "types/country";
import type { Route } from "../+types/root"
import { useLoaderData } from "react-router";

export async function clientLoader({params}: Route.LoaderArgs) {
    try {
        const res = await fetch("/data.json");
        const data: Country[] = await res.json();
        await new Promise(res => setTimeout(res, 2000)) // fake delay
        const filtered = data.filter((item) => item.name.toLowerCase() === params.name?.toLowerCase())[0];
        return filtered;
    } catch (err) {
        console.error(err);
    }
}

// clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return <div>Loading...</div>;
}

const Detail = () => {
const country = useLoaderData<typeof clientLoader>()

  return (
    <div>hello {country?.name}</div>
  )
}

export default Detail