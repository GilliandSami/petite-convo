"use strict";
const currentUser = "Anna";


const User = function (name) {
  this.name = name;
};

const Conversation = function () {
  this.users = [];
  this.messages = [];
}

const Message = function (user, content) {
  this.user = user;
  this.content = content;
}

Conversation.prototype.addUsers = function (users) {
  users.forEach((user) => {
    if (user instanceof User) {
      if (!this.users.includes(user)) {
        console.log(`On a ajouté l'user ${user.name} à la conversation`);
        this.users.push(user);
      } else {
        throw new Error("Peut pas ajouter l'user, il est déjà dans la conversation");
      }
    } else {
      throw new Error("Peut pas ajouter l'user, il est pas une instance de User");
    }

    return this;
  });
}


User.prototype.sendMessage = function (conversation, message) {
  if (!conversation.users.includes(this)) {
    throw new Error("Cet utilisateur est pas dans la conversation")
  }

  const messageUser = new Message(this, message);
  conversation.messages.push(messageUser);

  messageUser.display();
}

Message.prototype.display = function () {
  const qui = this.user.name === currentUser ? "from-me" : "from-them";
  const fil = document.querySelector(".conversation");

  const html =
    `<div>
      <span class="${qui}">${this.user.name}</span>
      <p class="${qui}">${this.content}</p>
    </div>`

  fil.insertAdjacentHTML("beforeend", html);
  return this;
}


const anna = new User("Anna");
const michel = new User("Michel");

const users = [anna, michel];

const conversation = new Conversation();
conversation.addUsers(users);

const messageChoisi = "Kakou Kakou !";
const autreMessage = "Ta gueule frère";

anna.sendMessage(conversation, messageChoisi);
michel.sendMessage(conversation, autreMessage);

