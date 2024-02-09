window.onload = function () {
  let fullName = document.getElementById("fullname");
  let username = document.getElementById("username");
  let emailAddress = document.getElementById("email");
  let password = document.getElementById("password");
  let repeatPassword = document.getElementById("repeatpassword");
  let checkBox = document.getElementById("checkbox");
  let signUpButton = document.getElementById("signup");
  let wrapper = document.getElementById("wrapper");
  let closeWrapper = document.getElementById("close");
  let fullNameLabel = document.getElementById("fullNameLabel");
  let usernameLabel = document.getElementById("usernameLabel");
  let emailLabel = document.getElementById("emailLabel");
  let passwordLabel = document.getElementById("passwordLabel");
  let repeatPasswordLabel = document.getElementById("repeatPasswordLabel");
  let checkboxLabel = document.getElementById("checkboxLabel");
  let linkLogIn = document.getElementById("link-login");
  let heading = document.getElementById("heading");
  let modalWindowButton = document.getElementById("modal-button");
  let changeButton = document.getElementById("changeButton");
  let description = document.getElementById("description");

  checkBox.addEventListener("change", function (event) {
    if (event.target.checked) {
      document.getElementById("checkbox-error").style.display = "none";
    } else {
      document.getElementById("checkbox-error").style.display = "block";
    }
  });

  fullName.addEventListener("input", function () {
    if (!fullName.value.match(/^[a-zA-Zа-яА-Я\s]*$/)) {
      document.getElementById("fullname-error").style.display = "block";
    } else {
      document.getElementById("fullname-error").style.display = "none";
    }
  });
  username.addEventListener("input", function () {
    if (!username.value.match(/^[a-zA-Zа-яА-Я0-9\_\-\s]*$/)) {
      document.getElementById("username-error").style.display = "block";
    } else {
      document.getElementById("username-error").style.display = "none";
    }
  });
  emailAddress.addEventListener("input", function () {
    if (!emailAddress.value.match(/^\S+@\S+\.\S+$/)) {
      document.getElementById("email-error").style.display = "block";
    } else {
      document.getElementById("email-error").style.display = "none";
    }
  });
  password.addEventListener("input", function () {
    if (
      !password.value.match(
        /^(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/
      )
    ) {
      document.getElementById("password-error").style.display = "block";
    } else {
      document.getElementById("password-error").style.display = "none";
    }
  });
  repeatPassword.addEventListener("input", function () {
    if (password.value !== repeatPassword.value) {
      document.getElementById("repeatpassword-error").style.display = "block";
    } else {
      document.getElementById("repeatpassword-error").style.display = "none";
    }
  });

  let clients = JSON.parse(localStorage.getItem("clients"));

  signUpButton.onclick = function () {
    if (
      !fullName.value ||
      !username.value ||
      !emailAddress.value ||
      !password.value ||
      !repeatPassword.value
    ) {
      alert("Заполните все обязательные поля!");
      return;
    }

    if (password.value.length < 8) {
      alert("Пароль слишком короткий!");
      return;
    }

    if (password.value !== repeatPassword.value) {
      alert("Пароли не совпадают!");
      document.getElementById("repeatpassword-error").style.display = "none";
      return;
    }

    if (!checkBox.checked) {
      document.getElementById("repeatpassword-error").style.display = "block";
      return;
    }
    const newUser = {
      fullName: fullName.value,
      username: username.value,
      emailAddress: emailAddress.value,
      password: password.value,
    };

    // Инициализация массива clients как массива, если он равен null или undefined
    if (!clients) {
      clients = [];
    }

    // Добавление нового пользователя в массив clients
    clients.push(newUser);

    // Сохранение массива clients в Local Storage
    localStorage.setItem("clients", JSON.stringify(clients));
    // Отображение модального окна
    wrapper.style.display = "flex";
  };

  closeWrapper.onclick = function () {
    wrapper.style.display = "none";
  };
  linkLogIn.onclick = function (e) {
    if (heading.innerText === "Get your free account") {
      showLogIn(e);
      return;
    } else {
      showSignUp(e);
      return;
    }
  };
  modalWindowButton.onclick = function (e) {
    showLogIn(e);
    wrapper.style.display = "none";
    username.value = "";
    password.value = "";
  };

  function showLogIn(e) {
    e.preventDefault();
    heading.innerText = "Log in to the system";
    fullNameLabel.style.display = "none";
    emailLabel.style.display = "none";
    repeatPasswordLabel.style.display = "none";
    checkboxLabel.style.display = "none";
    description.style.display = "none";
    changeButton.innerText = "Log In";
    linkLogIn.innerText = "Registration";
    linkLogIn.onclick = () => location.reload();
    signUpButton.onclick = function () {
      if (!username.value) {
        alert("Заполните имя пользователя!");
        return;
      }
      if (!password.value) {
        alert("Введите пароль!");
        return;
      }

      let flag = false;

      for (let i = 0; i < clients.length; i++) {
        if (clients[i].username === username.value) {
          // Пользователь найден по логину
          if (clients[i].password === password.value) {
            //Пароль совпадает
            flag = true;
            alert(`Добро пожаловать, ${username.value}`);
            password.style.borderColor = "gray";
            personalCabinet();
            break;
          } else {
            alert("Неверный пароль!");
            password.style.borderColor = "red";
            break;
          }
        }
      }
      if (!flag) {
        flag = true;
        alert("Такой пользователь не зарегистрирован!");
        username.style.borderColor = "red";
      }
    };
  }
  function showSignUp(e) {
    e.preventDefault();
    heading.innerText = "Get your free account";
    fullNameLabel.style.display = "block";
    emailLabel.style.display = "block";
    repeatPasswordLabel.style.display = "block";
    checkboxLabel.style.display = "block";
    changeButton.innerText = "Sign Up";
    linkLogIn.innerText = "Already have an account?";
  }

  function personalCabinet(e) {
    let currentUser = null;
    for (let i = 0; i < clients.length; i++) {
      if (
        clients[i].username === username.value &&
        clients[i].password === password.value
      ) {
        currentUser = clients[i];
        break;
      }
    }
    if (currentUser) {
      heading.innerText = `Welcome, ${currentUser.fullName}`;
    }
    fullNameLabel.style.display = "none";
    description.style.display = "none";
    username.style.display = "none";
    usernameLabel.style.display = "none";
    emailLabel.style.display = "none";
    password.style.display = "none";
    passwordLabel.style.display = "none";
    repeatPasswordLabel.style.display = "none";
    checkboxLabel.style.display = "none";
    linkLogIn.style.display = "none";
    changeButton.innerText = "Exit";
    signUpButton.onclick = () => location.reload();
  }
};
