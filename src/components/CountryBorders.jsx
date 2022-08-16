import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const CountryBorders = () => {
  const borders = useSelector((state) => state.countries.borders)

  return (
    <div>
      <label className="label">Border Countries: </label>
      <div className="border-countries__container">
        {borders.map((item) => (
          <Link className="button" to={'/country/' + item.cca3} key={item.cca3}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
