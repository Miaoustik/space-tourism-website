const tabs = document.querySelectorAll('[role="tab"]');
const tabList = document.querySelector('[role="tablist"]');
const vertical = tabList.dataset.vertical === "true"

let prev = "ArrowLeft"
let next = "ArrowRight"

if (vertical) {
  prev = "ArrowUp"
  next = "ArrowDown"
}

// Add a click event handler to each tab
tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabs);
});

// Enable arrow navigation between tabs in the tab list
let tabFocus = 0;

tabList.addEventListener("keydown", (e) => {

  if (e.key === prev || e.key === next) {
      e.preventDefault()
      tabs[tabFocus].setAttribute("tabindex", -1);
      if (e.key === next) {
      tabFocus++;
      // If we're at the end, go to the start
      if (tabFocus >= tabs.length) {
          tabFocus = 0;
      }
      // Move left
      } else if (e.key === prev) {
      tabFocus--;
      // If we're at the start, move to the end
      if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
      }
      }

      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();
  }
});

function changeTabs(e) {
  const target = e.currentTarget;
  const parent = target.parentNode;

  // Remove all current selected tabs
  parent
    .querySelectorAll('[aria-selected="true"]')
    .forEach((t) => t.setAttribute("aria-selected", false));

  // Set this tab as selected
  target.setAttribute("aria-selected", true);
}