import './style.css'
import { getMovies, postMovie } from './http'

const getButton = document.getElementById("get") as HTMLButtonElement
const postButton = document.getElementById("post") as HTMLButtonElement

const getDemo = async () => {
  const response = await getMovies(1000)
  if (!response.success)
    return

  console.log(response.data)
}

const postDemo = async () => {
  const response = await postMovie({ title: "Titanic", year: 2000 })
  if (!response.success)
    return

  console.log(response.data)
}

getButton.addEventListener("click", getDemo)
postButton.addEventListener("click", postDemo)
