

export class Note {
  constructor({ title, text, id }, parentElem) {
    this.parentElem = parentElem;

    this.title = title;
    this.text = text;
    this.id = id;

    document.onclick = this.onClick.bind(this);
    // this.noteElem = document.querySelector(`[data-id=${this.id}]`);
    // this.noteElem.onclick = this.onClick.bind(this);
    // document.onclick = this.onClick.bind(this);
  }

  onClick(event) {
    if (!event.target.closest("[data-note-action]")) return;

    const note = event.target.closest(".note");
    const action = event.target.closest("[data-note-action]").dataset.noteAction;

    this[action](note);
  }

  remove(note) {
    const id = note.dataset.id;

    this.parentElem.data.delete(id);

    this.parentElem.save();
    this.parentElem.init();
  }

  edit(note) {
    note.innerHTML = `
         <form class="note__form" name="edit" action="">

           <label for="note-title">
             <input name="note-title" id="note-title" type="text">
           </label>

           <label for="note-text">
             <input name="note-text" id="note-text" type="text">
           </label>

            <button class="note-edit__submit" type="submit">Сохранить</button>
            <button type="submit">Назад</button>
         </form>
    `

    const noteFormElem = note.querySelector(".note__form");
    noteFormElem.addEventListener("click", () => {
      console.log(123)
    });

    let noteObj = this.parentElem.data.get(`${note.dataset.id}`);
    noteFormElem.addEventListener("submit", () => {
      const newTitle = noteFormElem.elements["note-title"].value;
      const newText = noteFormElem.elements["note-text"].value;

      noteObj.title = newTitle;
      noteObj.text = newText;

      this.parentElem.save();
      this.parentElem.init();

      return false;
    });

  }

}