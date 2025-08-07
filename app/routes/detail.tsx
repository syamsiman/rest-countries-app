import type { Country } from "types/country";
import type { Route } from "../+types/root"
import { useLoaderData } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export async function clientLoader({params}: Route.LoaderArgs) {
    try {
        const res = await fetch("/data.json");
        const data: Country[] = await res.json();
        await new Promise(res => setTimeout(res, 2000)) // fake delay
        const filtered = data.find((item) => item.name.toLowerCase() === params.name?.toLowerCase());
        return filtered;
    } catch (err) {
        console.error(err);
    }
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

const Detail = () => {
const Navigate = useNavigate();

const country = useLoaderData<typeof clientLoader>()
if (!country) {
    return <div className="container pt-10">Country not found</div>
  }

  console.log(country);
return (
    <div className="container pt-10">
      <div className="mt-5">
        <button 
        onClick={() => Navigate(-1)}
        className="mb-15 py-2 px-5 cursor-pointer flex gap-x-2 rounded-sm shadow-md bg-white dark:bg-blue-900 text-grey-950 dark:text-white"><ArrowLeft /> Back</button>
        <div 
          className="flex flex-col md:flex-row gap-x-4"
        >
         <div className="flex-1/2">
          <img
            width={400}
            height={300}
            className="object-contain drop-shadow-md"
           src={country.flags?.svg} alt="country flag" />
         </div>
           
           <div className="flex-1/2">
            <h1 className="text-3xl text-grey-950 dark:text-white font-bold my-5">{country.name}</h1>
            <div className="flex flex-col lg:flex-row gap-y-10 md:gap-x-10">
              <ul className="detail-list">
                <li>Native Name: <span>{country.nativeName}</span></li>
                <li>Population: <span>{country.population.toLocaleString()}</span></li>
                <li>Region: <span>{country.region}</span></li>
                <li>Sub Region: <span>{country.subregion}</span></li> 
                <li>Capital: <span>{country.capital}</span></li>
              </ul>

              <ul className="detail-list items-start w-auto">
                <li>Top Level Domain: <span>{country.topLevelDomain?.join(", ")}</span></li>
                <li>Currencies: <span>{country.currencies?.map((item) => item.name).join(", ")}</span></li>
                <li>Languages: <span>{country.languages?.map((item) => item.name).join(", ")}</span></li>
              </ul>
            </div>
            {/* Border Countries */}
            <div className="mt-20 flex flex-wrap">
              <h2 className="text-grey-950 dark:text-white font-bold">Border Countries:</h2>
              <div className="flex flex-wrap gap-2 ml-2">
                {country.borders?.length ? (
                  country.borders.map(border => (
                    <span 
                      key={border}
                      className="border border-grey-200 rounded-sm px-3 py-1 text-grey-950 dark:text-white text-sm bg-white dark:bg-blue-900"
                    >
                      {border}
                    </span>
                  ))) : (
                  <span className="text-grey-500">No Border Countries</span>
                  )
                }
              </div>
            </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Detail