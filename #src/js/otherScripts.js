

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



document.addEventListener("click", function(event) {
  if (!event.target.closest("[data-hidden]")) {

    const hiddenElems = document.querySelectorAll("[data-hidden=false]");
    hiddenElems.forEach(elem => elem.dataset.hidden = "true");

  } else {

    const switchableElem = event.target.closest("[data-hidden]");
    switch (switchableElem.dataset.hidden) {
      case "false":
        switchableElem.dataset.hidden = "true";
        break;
      case "true":
        const hiddenElems = document.querySelectorAll("[data-hidden=false]");
        hiddenElems.forEach(elem => elem.dataset.hidden = "true");

        switchableElem.dataset.hidden = "false";
        break;
    }
  }

});