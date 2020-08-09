require("dotenv").config()

module.exports = {
    env: { API_URL: process.env.API_URL, EMAIL: process.env.EMAIL, KEY: process.env.KEY }

}