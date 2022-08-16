import { Link } from 'react-router-dom'
import { DescriptionLine } from './DescriptionLine'

export const CountryCard = ({ item }) => (
  <Link className="card" to={`/country/${item.cca3}`}>
    <img className="card__image" src={item.flags?.svg} alt={item.cca3} />
    <div className="card__body">
      <h3 className="title">{item.name?.common}</h3>
      <DescriptionLine label="Population" value={item.population.toLocaleString('en')} condition={item?.population} />
      <DescriptionLine label="Region" value={item.region} condition={item?.region} />
      <DescriptionLine label="Capital" value={item.capital.join(', ')} condition={item?.capital.length} />
    </div>
  </Link>
)
