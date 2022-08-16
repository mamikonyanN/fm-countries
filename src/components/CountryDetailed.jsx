import { useSelector } from 'react-redux'
import { CountryBorders } from './CountryBorders'
import { DescriptionLine } from './DescriptionLine'

export const CountryDetailed = () => {
  const country = useSelector((state) => state.countries.selected)

  return (
    <div className="details">
      <div>
        <img className="details-img" src={country.flags?.svg} alt={country.cca3} />
      </div>

      <div>
        <h3 className="title">{country.name?.common}</h3>
      </div>

      <div>
        <DescriptionLine
          label="Native Name"
          value={Object.values(country.name.nativeName)
            .map((item) => item.common)
            .join(', ')}
          condition={country.name?.nativeName}
        />
        <DescriptionLine
          label="Population"
          value={country.population.toLocaleString('en')}
          condition={country.population}
        />
        <DescriptionLine label="Region" value={country.region} condition={country.region} />
        <DescriptionLine label="Sub Region" value={country.subregion} condition={country.subregion} />
        <DescriptionLine label="Capital" value={country.capital.join(', ')} condition={country.capital.length} />
      </div>

      <div>
        <DescriptionLine label="Top Level Domain" value={country.tld.join(', ')} condition={country.tld.length} />
        <DescriptionLine
          label="Currencies"
          value={Object.values(country.currencies)
            .map((item) => item.name)
            .join(', ')}
          condition={country.currencies}
        />
        <DescriptionLine
          label="Languages"
          value={Object.values(country.languages).join(', ')}
          condition={country.languages}
        />
      </div>

      {country.borders.length > 0 && <CountryBorders />}
    </div>
  )
}
