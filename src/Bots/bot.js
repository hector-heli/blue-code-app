// API_BOT TOKEN
// 5861283585:AAFQx2nQqfQwPRAXqI7XPU7iFUWS3gzqQx4 
//https://www.youtube.com/watch?v=Z7aN0xfn5NM&ab_channel=FaztCode

import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const token = '5861283585:AAFQx2nQqfQwPRAXqI7XPU7iFUWS3gzqQx4';

export const bot = new Telegraf(token);

// Configurar el webhook

bot.start((ctx)=> {
    //console.log(ctx);
    ctx.reply("Iniciando la conversación del bot");  
});   

bot.command('quit', async (ctx) => {
  // Explicit usage
  // await ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  await ctx.leaveChat();
});

bot.on(message('text'), async (ctx) => {
  // Explicit usage
  console.log(ctx);

  await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

  // Using context shortcut
  //await ctx.reply(`Hello ${ctx.state.role}`);
}); 

bot.on('callback_query', async (ctx) => {
  // Explicit usage
  // await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

  // Using context shortcut
  await ctx.answerCbQuery();
});

bot.on('inline_query', async (ctx) => {
  const result = [];
  // Explicit usage
  // await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

  // Using context shortcut
  await ctx.answerInlineQuery(result);
});

bot.launch();
