import { CountryDetailed } from 'components/CountryDetailed'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchBorders, fetchCountry } from 'store/listSlice'

const DetailsPage = () => {
  const { code } = useParams()
  const country = useSelector((state) => state.countries.selected)
  const isPending = useSelector((state) => Object.keys(state.countries.status)?.length > 0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (code) dispatch(fetchCountry(code))
  }, [code])

  useEffect(() => {
    if (country && country.borders.length) dispatch(fetchBorders(country.borders))
  }, [country])

  return (
    <div className="text-lg">
      <div className="section">
        <Link className="button" to="/">
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </Link>
      </div>
      {isPending && <Loader />}
      {country ? <CountryDetailed /> : <span className="error-message">Can't find country with this code</span>}
    </div>
  )
}

export default DetailsPage
