import express from "express"
import cors from "cors"
import { z } from "zod"
import fs from "fs/promises"



const app = express()

app.use(cors())
app.use(express.json())

type Book = {
  title: string
  category: string
  available: boolean
}

const loadDB = async (filename: string) => {
  try {
    const rawData = await fs.readFile(`${__dirname}/../database/${filename}.json`, 'utf-8')
    const data = JSON.parse(rawData)
    return data as Book[]
  } catch (error) {
    return null
  }
}

const saveDB = async (filename: string, data: any) => {
  try {
    const fileContent = JSON.stringify(data)
    await fs.writeFile(`${__dirname}/../database/${filename}.json`, fileContent)
    return true
  } catch (error) {
    return false
  }
}

const QueryParams = z.object({
  after: z.coerce.number()
})



//szűrés kategórára

app.get("/api/books", async (req, res) => {

  const result = QueryParams.safeParse(req.query)
  if (!result.success)
    return res.status(400).json(result.error.issues)
  const queryParams = result.data

  const books = await loadDB("books")
  if (!books)
    return res.sendStatus(500)

  const filterBooks = books.filter(book => book.category > queryParams.after)

  res.json(filterBooks)
})


// szűrés elérhetőségre

app.get("/api/books/:available", async (req, res) => {

  const result = z.coerce.boolean().safeParse(req.params.available)
  if (!result.success)
    return res.status(400).json(result.error.issues)

  const available = result.data

  const books = await loadDB("books")
  if (!books)
    return res.sendStatus(500)

  const book = books.find(book => book.available === available)
  if (!book)
    return res.sendStatus(404)

  res.json(book)
})

const PostRequest = z.object({
  title: z.string(),
  category: z.string(),
})


app.listen(3000)
