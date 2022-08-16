import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from 'instance'

const loadingBegin = (state, requestId) => (state.status[requestId] = 0)
const loadingEnd = (state, requestId) => delete state.status[requestId]
const loadingError = (state, action) => {
  loadingEnd(state, action.meta.requestId)
}

export const fetchList = createAsyncThunk('countries/fetchList', async (filters) => {
  let URL = 'all'
  if (filters?.name.length) URL = 'name/' + filters.name
  else if (filters?.region?.value) URL = 'region/' + filters.region.value

  const fields = 'name,cca3,flags,population,region,capital'
  const response = await instance.get(`${URL}?fields=${fields}`)
  return response.data
})

export const fetchCountry = createAsyncThunk('countries/fetchCountry', async (code) => {
  if (!code) return
  const fields = 'flags,cca3,name,population,region,subregion,capital,tld,currencies,languages,borders'
  const response = await instance.get(`alpha/${code}?fields=${fields}`)
  return response.data
})

export const fetchBorders = createAsyncThunk('countries/fetchBorders', async (codeList) => {
  if (!codeList && !codeList.length) return
  const response = await instance.get(`alpha?fields=name,cca3&codes=${codeList.join(',')}`)
  return response?.data.map((item) => ({ name: item.name.common, cca3: item.cca3 }))
})

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    status: {},
    list: [],
    selected: null,
    borders: [],
    search: {
      name: '',
      region: null,
    },
  },
  reducers: {
    updateSearch: (state, action) => {
      state.search = { ...state.search, ...action.payload }
    },
  },
  extraReducers: {
    [fetchList.pending]: (state, action) => {
      loadingBegin(state, action.meta.requestId)
      state.list = []
    },
    [fetchList.fulfilled]: (state, action) => {
      loadingEnd(state, action.meta.requestId)
      state.list = action.payload
    },
    [fetchList.rejected]: loadingError,

    [fetchCountry.pending]: (state, action) => {
      loadingBegin(state, action.meta.requestId)
      state.selected = null
    },
    [fetchCountry.fulfilled]: (state, action) => {
      state.selected = action.payload
      loadingEnd(state, action.meta.requestId)
    },
    [fetchCountry.rejected]: loadingError,

    [fetchBorders.pending]: (state, action) => {
      loadingBegin(state, action.meta.requestId)
      state.borders = []
    },
    [fetchBorders.fulfilled]: (state, action) => {
      state.borders = action.payload
      loadingEnd(state, action.meta.requestId)
    },
    [fetchBorders.rejected]: loadingError,
  },
})

export const { updateSearch } = countriesSlice.actions

export default countriesSlice.reducer
