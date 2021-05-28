import fs from 'fs'
import path from 'path'

console.log('Read products from raw_data')

const __dirname = path.resolve()
const location = path.join(__dirname, '/backend/raw_data')

const categorytxt = fs.readFileSync(`${location}/Category.txt`, 'utf8')
const categoryList = categorytxt.split('\n')

const productArray = categoryList.map((categoryName) => {
  categoryName = categoryName.trim()
  const categoryFile = fs
    .readFileSync(`${location}/${categoryName}/${categoryName}.txt`, 'utf8')
    .split('\n')

  return categoryFile.map((productData) => {
    const data = productData
      .trim()
      .split('\t')
      .filter((value) => value !== '')

    const product = {
      name: data[0],
      image: '',
      brand: data[1],
      category: categoryName,
      price: data[2],
      countInStock: data[3],
      description: data[4],
    }
    return product
  })
})

let products = productArray.reduce((acc, val) => acc.concat(val))
products = products.sort(() => Math.random() - 0.5)

const simpleProducts = products.map((product) => {
  const fileS = `${__dirname}/backend/raw_data/${
    product.category
  }/${product.name.trim()}.jpeg`
  const fileNewName = `${Date.now()}.jpeg`
  const fileD = `${__dirname}/uploads/${fileNewName}`

  const r = fs.createReadStream(fileS).pipe(fs.createWriteStream(fileD))
  console.log(r)

  product.image = `/uploads/${fileNewName}`
  product.price = Number(product.price)
  product.countInStock = Number(product.countInStock)
  return product
})
export default simpleProducts
