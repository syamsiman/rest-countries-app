import countries from '~/lib/data.json'


export const getAllCountries = () => {
    return countries;
}

export const searchCountryByName = (name: string) => {
    const countries = getAllCountries();
    const filteredCountry = countries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

    console.log(filteredCountry);
    return filteredCountry;
}
