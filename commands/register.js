const {Command, CommandType, Argument, ArgumentType} = require('gcommands')
const {EmbedBuilder} = require('discord.js')
const mongoose = require('mongoose')
const connection = require('../connection/conection')
new Command({
  name:'verificar-nick',
  description:'verifique aqui seu nick',
  type: [CommandType.SLASH],
  arguments: [
    new Argument({ 
      name:'seu-nickname',
      description:'Coloque seu nickname aqui',
      type: ArgumentType.STRING,
      required: true
    })
  ],
  run: async(ctx) => { 
    const nickname = ctx.arguments.getString('seu-nickname')
      let embed; 
            const frases = ['Bip Bop! Carregando...', `Aguarde, estou revirando minha caixa e tentando achar ${nickname}`, 'Hum... Ok, espera ai...']
            let frasesAleatorias = frases[Math.floor(Math.random() * frases.length)]
  
     
      const sql = `SELECT * FROM AetherCoreProfile WHERE name = ?`
      connection.query(sql, [nickname], (err, data) => { 
              console.log(data)
                if (err) throw err;
             for (let i = 0; i < data.length; i++) {
        const nome = data[i].name;
                if(data[0].verification_discord === "true") {
                  return ctx.reply(`${ctx.user} olá, parece que você já foi verificado!`)
                } 
                  
        if(nome === nickname) {
           const tableName = 'AetherCoreProfile';
const query = `UPDATE AetherCoreProfile SET verification_discord = ? WHERE name = ?`;
       

              connection.query(query, ["true", nickname], (err) => {console.error(err)})
            console.log('tem')
            embed = new EmbedBuilder()
            .setTitle(`⏰ > ${frasesAleatorias}`)
            .setColor('Random')
           return ctx.reply({embeds: [embed]})
            .then(msg => { 
                let embed_troca;
                setTimeout(() => {
                    const discordUser = data[0].discord || 'Não possui'
                embed_troca = new EmbedBuilder()
                .setTitle(` ✅  > Usuário encontrado com sucesso!`)
                .setColor('Random')
                .setDescription(`🛑 > **Usuário encontrado:** ${nickname}\n🖋️ **> Discord achado: ${discordUser}**`)
                .setThumbnail(`https://mc-heads.net/combo/${nickname}`)
                msg.edit({embeds: [embed_troca]})
                }, 5000)
            })
        } 
            }
       ctx.reply('não tem')

              // if(data.length) {
              //     console.log(data)
              // } else { 
              //   console.log('nada')
              // }
      })
  }
})