import { CountryCard } from 'components/CountryCard'
import { useSelector } from 'react-redux'

export const CountriesList = () => {
  const countries = useSelector((state) => state.countries.list)

  return (
    <div className="gallery">
      {countries.length > 0 ? (
        countries.map((item) => <CountryCard item={item} key={item.name.common} />)
      ) : (
        <span className="error-message">Can't find countries with this filters</span>
      )}
    </div>
  )
}
