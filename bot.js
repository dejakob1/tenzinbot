/*/
 * Installation and command list is in the readme/at the home page: https://github.com/ChocolateMilk-Senpai/discord-image-bot/
 *
 * All times where the bot sends a message, it will be a .send() function.
 * To edit messages, you can use ctrl+f to look for 'send' and change what's in the string.
/*/

// Initializing discord.js
const Discord = require("discord.js");
const bot 		= new Discord.Client();

// Initializing other node modules
const fs      = require("fs");

// Reading config file
console.log('Reading config.json...')
  var config = JSON.parse(fs.readFileSync("./config.json"));
console.log('Done.')

// Reading images file
console.log('Reading images.json...')
  var images = JSON.parse(fs.readFileSync("./images.json"));
console.log('Done.')

// If the bot token has not been changed, say so.
if(config.token === "YOUR_BOT_TOKEN_GOES_HERE"){
  console.log("[ERROR] You have not put your bot token in the config.json! Please fix that!");
}

// Ready event - When the bot is usable/active, do this:
bot.on('ready', () => {
  // Log that the bot has started up (bot will listen to commands after this appears in the console)
  console.log("The bot has started a session.\n");

  // You can change this to whatever
	bot.user.setGame('Rokucraft');
});

// Message event - on each message the bot can read, do this:
bot.on('message', message => {
  // If the message DOES NOT start with the prefix, return (ignores the message)
  if(!message.content.startsWith(config.prefix)) return;

  // If the author user is a bot, return (ignores the message)
  if(message.author.bot) return;

  // This variable will be the message content without the first character (prefix)
  var noPrefixMsg = message.content.substring(1);

  // This makes each word in the command a different entry in an array
  var args = noPrefixMsg.split(" ");

  // Lists available images.
  if(args[0] === config.help.command){                    // Help command
    // Creates variable and assigns first header
    var output = ' **Commands:** \n';

    // Adds commands to output
    var output = output + `\`${config.help.command}\`, \`${config.imageCreate.command}\`, and \`${config.imageRemove.command}\``

    // Adds a line break and second header to output
    var output = output + '\n **Images:** \n'

    // Loops over each entry in images
    for(i = 0; i < images.length; i++){
      // Low amount of pictures causes issues so let's make it a preset output
      if(images.length <= 3){
        // If the images array has one entry, just add the entry
        if(images.length === 1){
          var output = output + `\`${images[0].name}\``
        }else
        // If the array has two entries, add the first and the second
        if(images.length === 2){
          var output = output + `\`${images[0].name}\` and \`${images[1].name}\``
        }else
        // If the array has three, add the first, the second, and the third
        if(images.length === 3){
          var output = output + `\`${images[0].name}\`, \`${images[1].name}\`, and \`${images[2].name}\``
        }
        // Break leaves the for loop
        break;
      }

      // Adds an entry to the output
      var output = output + `\`${images[i].name}\``

      // If it is the last image needed to add, don't add a comma or 'and'
      if(i === images.length - 1){
        break;
      }else
      // If it is the second last needed to add, add an 'and'
      if(i === images.length - 2){
        var output = output + ', and '
      // If it isn't the last or second, add a comma
      }else{
        var output = output + ', '
      }
    }

    // Send the output to the channel
    message.channel.send(output);
  }else
  // If the message starts with the image create command
  if(args[0] === config.imageCreate.command){                    // ImageCreate command
    // If the second or third argument (first is the command) is non existant, we do not have enough info to save
    if(args[1] === undefined || args[2] === undefined){
      // Send a confirmation in chat saying that there is insufficient arguments, and the correct use of the command
      message.channel.send(`Insufficient arguments. Correct usage: \`${config.prefix}${config.imageCreate.command} <image name> <image url>\``);
      // Return, doing stuff after may call on undefined variables
      return;
    }

    for(i = 0; i < images.length; i++){
      // If the second argument (first is the command) is equal to the name at index 'i', it already exists
      if(args[1] === images[i].name){
        // Send a confirmation in chat saying that it is already used
        message.channel.send(':x: Image name is already used.');
        // Return, doing stuff after will add it after all
        return;
      }
    }

    // Pushes the input at the back of the array
    images.push({
      "name": args[1],
      "url": args[2]
    });

    // Log and save it
    console.log("Writing to 'images.json'...");
      fs.writeFileSync('./images.json', JSON.stringify(images));
    console.log("Done.");

    // Send a confirmation to the chat
    message.channel.send(`Image \`${args[1]}\` created.`);
  }else
  // If the message starts with the image remove command
  if(args[0] === config.imageRemove.command){                    // ImageRemove command
    if(args[1] === undefined){
      message.channel.send(`Insufficient arguments. Correct usage: \`${config.prefix}${config.imageRemove.command} <image name>\``);
      return;
    }

    for(i = 0; i < images.length; i++){
      // If the second argument (first is the command) is equal to the name at index 'i', remove it
      if(args[1] === images[i].name){
        // So we can call on the name after the entry is gone from the images array
        var temp = images[i].name;

        // Remove the array entry at index 'i'
        images.splice(i, 1)

        // Log and save it
        console.log("Writing to 'images.json'...");
          fs.writeFileSync('./images.json', JSON.stringify(images));
        console.log("Done.");

        // Send a confirmation to the channel the message is in
        message.channel.send(`Image \`${temp}\` removed.`);

        // Return, to not do anything after the for loop as the image is found
        return;
      }
    }

    // If it gets through the for loop without returning (leaving this code block) it means that the image was not found
    message.channel.send(':x: Image not found.');
  }
  // If the command is not any of the other commands, it might be an image!
  else{                    // An image command or not any command
    for(i = 0; i < images.length; i++){
      // If the first argument is an image, do:
      if(args[0] === images[i].name){
        // Sends the url to the channel the message was retrieved from, Discord handles most image urls and embeds the image
        message.channel.send(`${images[i].url}`);
        // Return from the code block. Going past the for loop would mean an image or a command was not found after all
        return;
      }
    }

    // If we get past all the if statements before, and past the for loop here, that means the command or image is completely non-existant. Maybe a typo eh?
    message.channel.send('Type `${config.help.command}` for a list of commands and images.');
  }
});

// Bot login
bot.login(process.env.BOT_TOKEN);
