import TelegramBot from 'node-telegram-bot-api';

const botToken = '6674142401:AAH0XDqxeAzXdxGhjHEMWUIQpHiTb9VTVxw';
const bot = new TelegramBot(botToken, { polling: false });

const sendTelegramMessage = (chatId: number, message: string) => {
 
        
        // Send the message using the obtained chat ID
        bot.sendMessage(chatId, message)
          .then(() => {
            console.log(`Message Sent to ${chatId} Successfully`);
          })
          .catch((error) => {
            console.error(`Error Sending Message to ${chatId}:`, error);
          });
    
     
  };

export {sendTelegramMessage}