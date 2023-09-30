const { Events, UserFlagsBitField } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    const user = await message.author.fetch();

    // Get the linked accounts
    const linkedAccounts = user.settings.accounts;
    // Check if the message author has linked accounts
    console.log(linkedAccounts);
    if (message.author.flags.has(UserFlagsBitField.Flags)) {
      const user = await message.author.fetch();

      // Get the linked accounts
      const linkedAccounts = user.settings.accounts;

      // Check if there are linked accounts
      if (linkedAccounts) {
        // Find the Battle.net account in the linked accounts
        const battlenetAccount = linkedAccounts.find(
          (account) => account.type === "battlenet"
        );

        if (battlenetAccount) {
          const battlenetName = battlenetAccount.name;
          message.channel.send(`Battle.net Name: ${battlenetName}`);
        } else {
          message.channel.send("No Battle.net account linked.");
        }
      } else {
        message.channel.send("No linked accounts found.");
      }
    } else {
      message.channel.send(
        "You need to link your Discord account to access this feature."
      );
    }
  },
};
