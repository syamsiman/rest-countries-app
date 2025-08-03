import { redirect, useNavigate } from "react-router";

interface CardProps {
    img: string;
    name: string;
    population: string;
    region: string;
    capital?: string;
}

const Card = ({img, name, population, region, capital}: CardProps) => {
  let navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/detail/${name}`)
  }

  return (
    <div className="card hover:cursor-pointer"
      onClick={handleClick}
    >
        <img src={img} 
        className="object-contain"
        alt="region" />
        <div className="p-4 text-gray-950 dark:text-white ">
            <h2 className="text-xl my-4 font-bold">{name}</h2>
            <p className="font-semibold">Population: <span>{population}</span></p>
            <p className="font-semibold">Region: <span>{region}</span></p>
            <p className="font-semibold">Capital: <span>{capital}</span></p>
        </div>
    </div>
  )
}

export default Card