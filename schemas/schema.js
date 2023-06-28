const {model, Schema} = require('mongoose')

module.exports = model(
  'Usuários registrados',
    new Schema({
      DiscordID: String,
      Nickname: String
    })
)