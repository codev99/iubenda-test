const cookieSolution = () => {
  const elements = [
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
  ];

  const updateCookie = (values) => {
    let expireDate = new Date();
    let days = 10; // expire after 10 days
    expireDate.setTime(expireDate.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `cookie-solution=${values.join(",")}; expires=${expireDate.toUTCString()}; path="/"`;
  };

  const closePanel = () => {
    // remove panel
    const wrapper = document.getElementById("cookie-solution");
    wrapper.remove();

    // render edit button
    renderEditButton();
  };

  const getCookie = () => {
    return document.cookie.split(";").filter((item) => item.startsWith("cookie-solution="));
  };

  const getSelected = () => {
    let arrayValues = [];
    const cookie = getCookie();
    if (cookie[0]) {
      const cookieValue = cookie[0].split("=")[1];
      if (cookieValue) {
        arrayValues = cookieValue.split(",");
      }
    }
    return arrayValues;
  };

  const checkCookie = () => {
    const cookie = getCookie();
    if (cookie[0]) {
      return true;
    }
    return false;
  };

  const setSelected = () => {
    const checkboxes = [...document.getElementsByClassName("cookie-solution-checkbox")];
    const selected = checkboxes.filter((item) => item.checked).map((item) => item.id);
    updateCookie(selected);
    closePanel();
  };

  const rejectAll = () => {
    updateCookie(["-1"]);
    closePanel();
  };

  const createHtmlElement = (tag, className, id, type) => {
    const el = document.createElement(tag);
    el.className = className;
    if (id) el.id = id;
    if (type) el.type = type;
    return el;
  };

  const renderPanel = () => {
    // panel
    const panel = createHtmlElement("div", "cookie-solution-panel");
    const title = createHtmlElement("p");
    title.innerHTML = "We and selected third parties use cookies for technical purposes and, with your consent, for other purposes";
    panel.appendChild(title);

    // get selected elements
    const selectedElements = getSelected();

    // render checkboxes
    elements.forEach((item) => {
      const el = createHtmlElement("div", "cookie-solution-element");

      const checkBox = createHtmlElement("input", "cookie-solution-checkbox", item.id, "checkbox");
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

    // accept button
    const btnReject = createHtmlElement("button", "btn-Reject");
    btnReject.onclick = rejectAll;
    btnReject.innerHTML = "Reject";
    panel.appendChild(btnReject);

    // reject button
    const btnAccept = createHtmlElement("button", "btn-accept");
    btnAccept.onclick = setSelected;
    btnAccept.innerHTML = "Accept";
    panel.appendChild(btnAccept);
  
    // wrapper
    const wrapper = createHtmlElement("div", "cookie-solution", "cookie-solution");
    wrapper.appendChild(panel);
    document.body.appendChild(wrapper);

    // style
    const style = document.createElement("style");
    style.innerHTML = ".cookie-solution {} .cookie-solution-panel { position: absolute; z-index:9999; background-color: #FFFFFF; width: 80vw; left: 10vw; top: 5vh;} .cookie-solution-element { padding: 10px 20px; } .cookie-solution:after { content: ''; background-color: rgb(0 0 0 / 80%); position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999}";
    document.body.appendChild(style);
  };

  const editPurposes = () => {
    // remove edit button
    const btnEdit = document.getElementById("btn-edit");
    btnEdit.remove();

    // open panel
    renderPanel();
  };

  const renderEditButton = () => {
    // edit button
    const btnEdit = createHtmlElement("button", "btn-edit", "btn-edit");
    btnEdit.onclick = editPurposes;
    btnEdit.innerHTML = "Edit";
    document.body.appendChild(btnEdit);
  };

  const init = () => {
    if (checkCookie()) {
      // edit button
      renderEditButton();
    } else {
      // open panel
      renderPanel();
    }
  }

  init();
}

cookieSolution();