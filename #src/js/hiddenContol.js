
document.addEventListener("click", function(event) {
  const target = event.target;

  if (!target.closest("[data-hidden]")) return;
  const hiddenElem = target.closest("[data-hidden]");

  switch (hiddenElem.dataset.hidden) {
    case "false":
      hiddenElem.dataset.hidden = "true";
      break;
    case "true":
      hiddenElem.dataset.hidden = "false";
      break;
  }

});