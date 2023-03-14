const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
// const argv = require('yargs').argv;
const { program } = require('commander');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case 'add':
      const add = await addContact({ name, email, phone });
      console.table(add);
      break;

    case 'remove':
      const remove = await removeContact(id);
      console.log(remove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// invokeAction(argv);

program
.option("-a, --action <type>", 'Action that we want to trigger')
.option("-i, --id <contactId>", 'contact id')
.option("-n, --name <name>", 'contact name')
.option("-e, --email <email>", 'contact email')
.option("-p, --phone <phone>", 'contact phone')

program.parse(process.argv);

invokeAction(program.opts());