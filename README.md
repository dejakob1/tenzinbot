# Discord Image Bot
This discord.js bot is used solely for using custom commands to send an image to the chat. 

## Info
The bot is configurable via JSON files, you can change the word used to perform one of three tasks (defaults: help, imagecreate, imageremove), or change the command prefix (default: !). You can also manually add images to use, but the file will not be formatted well if you have used the commands to add/remove beforehand. 
*Note: Your bot token also goes in config.json*

## Installation (possible to still not work if I'm forgetting something)
 1. If you haven't done this already, create the bot user [here](https://discordapp.com/developers/applications/me).
 2. Click 'New App', put in a name, click 'Create App' (All those things are editable)
 3. Click 'Create a Bot User', reveal the token, and put that in your config.json
 4. Copy that Client ID and go to this link (change YOUR_CLIENT_ID_HERE to your client id) https://discordapp.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissionns=0
 5. Awesome! You have a bot user now, and it's in a server of your choice! Onto the bot part.
 
 1. To run the bot, node.js is required. Get the latest version [here](https://nodejs.org/en/).
 2. After installing, hold down shift and right click in the directory where bot.js, config.json, images.json, startbot.bat and package.json are.
 3. Click 'Open Command Window Here'.
 4. Run the command 'npm install' and wait for it to complete.
 5. Run 'startbot.bat', or do 'node bot.js' in the command line.
 6. Your bot is now alive, if everything has been done successfully.
 
## Commands
  **help**
  
Lists all three commands, and all available images.

  **imagecreate**
  
Adds an image to available images.

  **imageremove**
  
Removes an image from available images.


