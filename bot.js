
                let Discord;
                let Database;
                if(typeof window !== "undefined"){
                    Discord = DiscordJS;
                    Database = EasyDatabase;
                } else {
                    Discord = require("discord.js");
                    Database = require("easy-json-database");
                }
                const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
                const s4d = {
                    Discord,
                    client: null,
                    tokenInvalid: false,
                    reply: null,
                    joiningMember: null,
                    database: new Database("./db.json"),
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    fetchAllMembers: true
                });
                s4d.client.on('raw', async (packet) => {
                    if(['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)){
                        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
                        if(!guild) return;
                        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
                        if(!member) return;
                        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
                        if(!channel) return;
                        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
                        if(!message) return;
                        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
                    }
                });
                s4d.client.login('ODMzMjU4MDk1MzQ2MDU3MjI2.YHvuEw.Xr5cwZYj9lNSsPxXwrDg7h35IyU').catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == '!ping') {
    s4dmessage.channel.send(String('pong!'));
  }
  if ((s4dmessage.content) == '!Help') {
    s4dmessage.channel.send(String('Hello I see you need my help there here are some of my commands !Help,!kill,jokes,!creator and remmber do not cuss bad habit'));
    if ((s4dmessage.content) == 'fuck') {
      s4dmessage.delete();
    }
  }
  if ((s4dmessage.content) == '!kill') {
    s4dmessage.channel.send(String('I have have done what you wanted me to do i killed you ai hands are full of human blood now '));
  }
  if ((s4dmessage.content) == '!jokes') {
    s4dmessage.channel.send(String('Why did dwight cross the road.............................to get to the other side LOL i am so funny'));
  }

});

                s4d;
            