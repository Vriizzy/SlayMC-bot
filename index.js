require('dotenv').config();
const { GClient, Plugins, Command, Component } = require('gcommands');
const { GatewayIntentBits } = require('discord.js');
const { join } = require('path');
const colors = require('colors')
const connection = require('./connection/conection')
const mongoose = require('mongoose')
Command.setDefaults({
	cooldown: '5s'
});
connection.connect((err) => { 
   if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão estabelecida com sucesso!');
})


// const connection = mysql.createConnection({
//     host: '34.95.178.99',
//     port: 3306,
//     user: 'u1_ZSw584leqL',
//     password: '79wNCdbXIfzm6^0=N!..yi3n',
//     database: 's1_core',
// });
// connection.connect((err) => {
//   if (err) {
//     console.error('Erro ao conectar ao banco de dados:', err);
//     return;
//   }
//   console.log('Conexão estabelecida com sucesso!');
// });
// const userId = '.legiteey'; // ID do usuário desejado

// const query = 'SELECT * FROM AetherCoreProfile';

// connection.query(query, [userId], (err, results) => {
//   if (err) {
//     console.error('Erro ao executar a consulta:', err);
//     return;
//   }

//   if (results.length > 0) {
//     const nome = results[0].name;
//     console.log('Nome do usuário:', nome);
//   } else {
//     console.log('Nenhum usuário encontrado com o ID informado.');
//   }

//   // Fecha a conexão com o banco de dados
//   connection.end();
// });
Component.setDefaults({
	onError: (ctx, error) => {
		return ctx.reply('Oops! Something went wrong')
	} 
});


Plugins.search(__dirname);

const client = new GClient({
	dirs: [
		join(__dirname, 'commands'),
		join(__dirname, 'components'),
		join(__dirname, 'listeners'),
    join(__dirname, 'connection')
	],
	messageSupport: true,
	messagePrefix: '!',
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers],
});

mongoose.connect(process.env.MONGOOSE_CONNECT)

client.login(process.env.TOKEN);