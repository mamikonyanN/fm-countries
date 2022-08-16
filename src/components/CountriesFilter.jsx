import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { updateSearch } from 'store/listSlice'

export const CountriesFilter = () => {
  const dispatch = useDispatch()
  const name = useSelector((state) => state.countries.search.name)
  const region = useSelector((state) => state.countries.search.region)
  const [nameQuery, setNameQuery] = useState(name)

  const pushUpdate = (data) => dispatch(updateSearch(data))

  useEffect(() => {
    const timeOutId = setTimeout(() => pushUpdate({ name: nameQuery }), 500)
    return () => clearTimeout(timeOutId)
  }, [nameQuery])

  const options = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((item) => ({ value: item, label: item }))

  return (
    <div className="filters">
      <div className="filters__input-container">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          className="filters__input"
          type="text"
          placeholder="Search for a country..."
          value={nameQuery}
          onChange={(e) => setNameQuery(e.target.value)}
          disabled={region}
        />
      </div>
      <ReactSelect
        classNamePrefix="filters__select"
        className="filters__select-container"
        placeholder="Filter by Region"
        options={options}
        isClearable
        onChange={(region) => pushUpdate({ region })}
        value={region}
        isDisabled={nameQuery}
      />
    </div>
  )
}
