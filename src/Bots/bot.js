import TelegramBot from 'node-telegram-bot-api';
const token = 'TokenDentroDeLasComillas';
const bot = new TelegramBot(token, {polling:true});

bot.on('polling_error', function(error){
    console.log(error);
});

bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    
    bot.sendMessage(chatId, "Bienvenido a mi bot " + nameUser);
});