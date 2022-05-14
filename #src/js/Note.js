

export class Note {
  constructor({ title, text, id }, parentTodoList) {
    this.parentTodoList = parentTodoList;

    this.title = title;
    this.text = text;
    this.id = id;

    document.addEventListener("click", this.onClick.bind(this));
  }

  onClick(event) {
    if (!event.target.closest("[data-note-action]")) return;

    const note = event.target.closest(".note");
    const action = event.target.closest("[data-note-action]").dataset.noteAction;

    this[action](note);
  }

  remove(note) {
    const id = note.dataset.id;

    this.parentTodoList.data.delete(id);
    this.parentTodoList.save();
    this.parentTodoList.init();
  }

  edit(note) {
    const noteHtmlBefore = note.innerHTML;

    note.innerHTML = `
         <form class="note__form" name="edit" action="">

           <label for="note-title">
             <input name="note-title" id="note-title" type="text">
           </label>

           <label for="note-text">
             <input name="note-text" id="note-text" type="text">
           </label>

            <button class="note-edit__submit" data-note-form="save" type="button">Сохранить</button>
            <button data-note-form="back" type="button">Назад</button>
         </form>
    `;

    const noteFormElem = note.querySelector(".note__form");
    const noteObj = this.parentTodoList.data.get(`${note.dataset.id}`);

    noteFormElem.addEventListener("click", (event) => {
      const target = event.target.dataset.noteForm;

      if (target === "save") {
        const newTitle = noteFormElem.elements["note-title"].value;
        const newText = noteFormElem.elements["note-text"].value;

        noteObj.title = newTitle;
        noteObj.text = newText;

        this.parentTodoList.save();
        this.parentTodoList.init();

      } else if (target === "back") {
        note.innerHTML = noteHtmlBefore;
      } else return;

    });

  }


}