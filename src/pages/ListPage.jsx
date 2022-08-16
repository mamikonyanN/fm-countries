import { CountriesFilter } from 'components/CountriesFilter'
import { CountriesList } from 'components/CountriesList'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchList } from 'store/listSlice'

export const ListPage = () => {
  const name = useSelector((state) => state.countries.search.name)
  const region = useSelector((state) => state.countries.search.region)
  const isPending = useSelector((state) => Object.keys(state.countries.status)?.length > 0)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchList({ name, region }))
  }, [name, region])

  return (
    <>
      <CountriesFilter />
      {isPending ? <Loader /> : <CountriesList />}
    </>
  )
}

export default ListPage
