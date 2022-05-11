// const mainNoteListElem = document.querySelector(".todo-list");
// const btnCreateNote = document.querySelector(".create-note__btn");
//
// const notesData = new WeakMap();
//
// btnCreateNote.onclick = function() {
//   let note = new Note("123", "123");
//   note.create();
//   notesData.set(note, "note");
// }
//
// class TodoList {
//
//   constructor(elem) {
//     elem.
//   }
// }
//
//
// // class Note {
// //
// //   constructor(title, text) {
// //     this._title = title;
// //     this._text = text;
// //     this._parentElem = mainNoteListElem;
// //   }
// //
// //   create() {
// //     let note = document.createElement("li");
// //     note.innerHTML =
// //       `<article>
// //           <h2>${this._title}</h2>
// //           <p>${this._text}</p>
// //           <ul>
// //             <li>
// //               <button data-action="remove">Удалить</button>
// //             </li>
// //             <li>
// //               <button>Редактировать</button>
// //             </li>
// //           </ul>
// //         </article>`
// //     this._parentElem.append(note);
// //     note.onclick = this.onClick.bind(this);
// //   }
// //
// //   onClick(event) {
// //     let action = event.target.dataset.action;
// //     if (action) this[action]();
// //   }
// // }

const modalElem = document.querySelector(".modal");
const modalOpenBtn = document.querySelector(".btn-create");

modalElem.addEventListener("click", function(event) {
  const target = event.target;

  if (target.classList.contains("modal__close")) {
    const modal = target.closest(".modal");
    modal.style.display = "none";
  }
});

modalOpenBtn.addEventListener("click", function() {
  modalElem.style.display = "flex";
});


class TodoList {

  constructor() {
    this.data = new Map(JSON.parse(localStorage.getItem("JSONData")));

    this.listElem = document.querySelector(".todo-list");

    this.form = document.querySelector(".form-create");
    this.form.onsubmit = this.create.bind(this);
  }

  init() {
    let todoListText = "";

    this.data.forEach(({ title, text, id }) => {
      todoListText += `
         <li>
          <article class="note" data-id="${id}">
            <h2>${title}</h2>

            <p>${text}</p>

            <ul>
              <li>
                <button data-action="remove">Удалить</button>
              </li>

              <li>
                <button>Редактировать</button>
              </li>
            </ul>

          </article>
        </li>
      `
    });

    this.listElem.innerHTML = todoListText;
    console.log(this.data);
  }

  create() {
    let noteObj = {
      title: this.form.elements["note-title"].value,
      text: this.form.elements["note-text"].value,
      id: this.getRandomID(),
    }

    this.data.set(`${noteObj.id}`, new Note(noteObj));
    this.save();
    this.init();

    return false;
  }

  save() {
    const JSONData = JSON.stringify(Array.from(this.data));
    localStorage.setItem("JSONData", JSONData);
  }

  //возращяет строку, не делать id числом!
  getRandomID = this.makeRandomNum(6);
  makeRandomNum(length) {
    let used = []

    return function getNum() {
      const num = Math.random().toFixed(length) * 10 ** length;

      if (used.includes(num)) {
        getNum();
      } else {
        used.push(num);
        return num;
      }

    }
  }

  onClick() {
    console.log(123);
  }
}

const todoList = new TodoList();
todoList.init();
localStorage.clear()