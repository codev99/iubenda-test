const cookieSolution = {
  elements: [
    {
      id: "1",
      label: "Purpose 1",
    },
    {
      id: "2",
      label: "Purpose 2",
    },
    {
      id: "3",
      label: "Purpose 3",
    },
    {
      id: "4",
      label: "Purpose 4",
    },
  ],

  updateCookie: (values) => {
    let expireDate = new Date();
    let days = 10; // expire after 10 days
    expireDate.setTime(expireDate.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `cookie-solution=${values.join(",")}; expires=${expireDate.toUTCString()}; path="/"`;
  },

  closePanel: () => {
    // remove panel
    const wrapper = document.getElementById("cookie-solution");
    wrapper.remove();
    const style = document.getElementById("style-cookie-panel");
    style.remove();

    // render edit button
    cookieSolution.renderEditButton();
  },

  getCookie: () => {
    return document.cookie.split(";").filter((item) => item.startsWith("cookie-solution="));
  },

  getSelected: () => {
    let arrayValues = [];
    const cookie = cookieSolution.getCookie();
    if (cookie[0]) {
      const cookieValue = cookie[0].split("=")[1];
      if (cookieValue) {
        arrayValues = cookieValue.split(",");
      }
    }
    return arrayValues;
  },

  checkCookie: () => {
    const cookie = cookieSolution.getCookie();
    if (cookie[0]) {
      return true;
    }
    return false;
  },

  setSelected: () => {
    const checkboxes = [...document.getElementsByClassName("cookie-solution-checkbox")];
    const selected = checkboxes.filter((item) => item.checked).map((item) => item.id);
    cookieSolution.updateCookie(selected);
    cookieSolution.closePanel();
  },

  rejectAll: () => {
    cookieSolution.updateCookie(["-1"]);
    cookieSolution.closePanel();
  },

  createHtmlElement: (tag, className, id, type) => {
    const el = document.createElement(tag);
    el.className = className;
    if (id) el.id = id;
    if (type) el.type = type;
    return el;
  },

  renderPanel: () => {
    // panel
    const panel = cookieSolution.createHtmlElement("div", "cookie-solution-panel", "cookie-solution-panel");
    const title = cookieSolution.createHtmlElement("p", "cookie-title");
    title.innerHTML = "We and selected third parties use cookies for technical purposes and, with your consent, for other purposes";
    panel.appendChild(title);

    // get selected elements
    const selectedElements = cookieSolution.getSelected();

    // render checkboxes
    cookieSolution.elements.forEach((item) => {
      const el = cookieSolution.createHtmlElement("div", "cookie-solution-element");

      const checkBox = cookieSolution.createHtmlElement("input", "cookie-solution-checkbox", item.id, "checkbox");
      if (selectedElements.includes(item.id)) {
        checkBox.setAttribute("checked", true);
      }
      const label = document.createElement("label");
      label.setAttribute("for", item.id);
      label.innerHTML = item.label;
    
      el.appendChild(checkBox);
      el.appendChild(label);

      panel.appendChild(el);
    });

    // footer
    const footer = cookieSolution.createHtmlElement("div", "cookie-footer");

    // accept button
    const btnReject = cookieSolution.createHtmlElement("button", "btn-Reject");
    btnReject.onclick = cookieSolution.rejectAll;
    btnReject.innerHTML = "Reject";
    footer.appendChild(btnReject);

    // reject button
    const btnAccept = cookieSolution.createHtmlElement("button", "btn-accept");
    btnAccept.onclick = cookieSolution.setSelected;
    btnAccept.innerHTML = "Accept";
    footer.appendChild(btnAccept);

    panel.appendChild(footer);
  
    // wrapper
    const wrapper = cookieSolution.createHtmlElement("div", "cookie-solution", "cookie-solution");
    wrapper.appendChild(panel);
    document.body.appendChild(wrapper);

    // style
    const style = document.createElement("style");
    style.id = "style-cookie-panel";
    style.innerHTML = ".cookie-solution {} .cookie-solution-panel { position: absolute; z-index:9999; background-color: #FFFFFF; width: 80vw; left: 10vw; top: 5vh;} .cookie-title { padding: 0 25px; } .cookie-solution-element { padding: 10px 20px; } .cookie-solution:after { content: ''; background-color: rgb(0 0 0 / 80%); position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999} .cookie-footer { padding: 0 25px 25px; text-align: right; } .cookie-footer button { margin-left: 10px; }";
    document.body.appendChild(style);
  },

  editPurposes: () => {
    // remove edit button
    const btnEdit = document.getElementById("btn-edit");
    btnEdit.remove();
    const style = document.getElementById("style-cookie-btn");
    style.remove();

    // open panel
    cookieSolution.renderPanel();
  },

  renderEditButton: () => {
    // edit button
    const btnEdit = cookieSolution.createHtmlElement("button", "btn-edit", "btn-edit");
    btnEdit.onclick = cookieSolution.editPurposes;
    btnEdit.innerHTML = "Edit Preferences";
    document.body.appendChild(btnEdit);

    // style
    const style = document.createElement("style");
    style.id = "style-cookie-btn";
    style.innerHTML = ".cookie-solution {} .btn-edit { position: fixed; bottom: 20px; right: 20px; }";
    document.body.appendChild(style);
  },

  init: () => {
    if (cookieSolution.checkCookie()) {
      // edit button
      cookieSolution.renderEditButton();
    } else {
      // open panel
      cookieSolution.renderPanel();
    }
  }
}

cookieSolution.init();

if (typeof module === "object") module.exports = cookieSolution;