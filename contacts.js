const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const dbPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const dbRaw = await fs.readFile(dbPath);
  const contacts = JSON.parse(dbRaw);
  return contacts;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(dbPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const findContact = contacts.find((item) => item.id === id);
  if (!findContact) {
    return null;
  }
  const newContacts = contacts.filter((item) => item.id !== id);
//   contacts = newContacts;
  await fs.writeFile(dbPath, JSON.stringify(newContacts));
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
};
