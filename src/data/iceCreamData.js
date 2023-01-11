import axios from 'axios'

export const getMenu = async () => {
  try {
    const response = await axios.get('/api/menu')
    const { data } = response
    await data.sort((a, b) => {
      if (a.iceCream.name < b.iceCream.name) {
        return -1
      }
      if (a.iceCream.name > b.iceCream.name) {
        return 1
      }
      return 0
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getMenuItem = (id) => {
  return axios
    .get(`/api/menu/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export const putMenuItem = (menuItem) => {
  return axios
    .put(`/api/menu/${menuItem.id.toString()}`, menuItem)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export const deleteMenuItem = (id) => {
  return axios.delete(`/api/menu/${id.toString()}`)
}
