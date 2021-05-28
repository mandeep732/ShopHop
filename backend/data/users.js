import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin One',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Arjun admin',
    email: 'arjun@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'krish',
    email: 'krish@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'jay',
    email: 'jay@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'Isha',
    email: 'isha@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'Jui kumari',
    email: 'juikumari@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'Siddhant Singh',
    email: 'siddhantsingh@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'Kavin De',
    email: 'kavinde@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'Shivi Kapoor',
    email: 'shivikapoor@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'Farhan khan',
    email: 'farhankhan@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'Daksh Singh',
    email: 'DakshSingh@gmail.com',
    password: bcrypt.hashSync('daksh123', 10),
  },
]

export default users
