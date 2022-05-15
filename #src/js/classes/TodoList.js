

import { Note } from "./Note.js";
import { getUniqueNum } from "../getUniqueNum.js";


export class TodoList {

  constructor() {
    this.data = new Map(JSON.parse(localStorage.getItem("JSONData")));

    this.listElem = document.querySelector(".todo-list");

    this.form = document.querySelector(".form-create");
    this.form.onsubmit = this.createNoteObj.bind(this);
  }

  init() {
    let todoListText = "";

    this.data.forEach((noteObj) => {
      noteObj = new Note(noteObj, this);
      this.data.set(noteObj.id, noteObj);

      const { title, text, id } = noteObj;
      todoListText += `
          <article class="note" data-id="${id}">
            <div class="note__wrapper">
            
              <h2 class="note__title">${title}</h2>
  
              <p class="note__text">${text}</p>
                  
              <div class="note__control" data-hidden="true">
              
                 <button class="note__open-control">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <use xlink:href="/sprite.svg#svg--icon-three-dots"></use>
                  </svg>
                </button>
                  
                <ul class="note__buttons">
                  <li>
                    <button class="note__btn" data-note-action="remove">Удалить</button>
                  </li
    
                  <li>
                    <button class="note__btn" data-note-action="edit">Редактировать</button>
                  </li>
                </ul>
             
              </div>
            
            </div>
          </article>
      `
    });

    this.listElem.innerHTML = todoListText;
    console.log(this.data);
  }

  save() {
    const JSONData = JSON.stringify(Array.from(this.data));
    localStorage.setItem("JSONData", JSONData);
  }

  getRandomID = getUniqueNum(6);
  createNoteObj() {
    let noteObj = {
      title: this.form.elements["note-title"].value,
      text: this.form.elements["note-text"].value,
      id: this.getRandomID(),
    }

    this.data.set(`${noteObj.id}`, new Note(noteObj, this));
    this.save();
    this.init();

    return false;
  }

}