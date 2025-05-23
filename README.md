# Awesome Web Features – SIT774 Task 10.4HD

This project is a full-stack web application demonstrating advanced web development concepts including secure authentication, dynamic content rendering, persistent storage, responsive design, and UI interactivity. It was built using Node.js, Express.js, EJS, and Bootstrap.

## 🔐 Features Overview

### 1. Secure Login and Registration
- Users can register and log in using a username and password.
- Passwords are hashed using `bcrypt` and stored permanently in a `users.json` file.
- User sessions are managed with `express-session`.

```js
// Registration (server.js)
app.post('/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  users.push({ username: req.body.username, password: hashed });
  writeUsers(users); // saves to users.json
});
```

### 2. Persistent User Storage
- User data is stored in `data/users.json`.
- On each login or register request, the server reads and writes this file.

```js
function readUsers() {
  const data = fs.readFileSync(usersPath);
  return JSON.parse(data);
}
```

### 3. Loading Animation
- After login, a loading screen is displayed with a dynamic percentage count.
- Enhances user transition experience.

### 4. Dynamic Tutorials from JSON
- The app fetches tutorial content from a local JSON file (`tutorials.json`) and renders it as Bootstrap cards using JavaScript.

```js
fetch("/data/tutorials.json")
  .then(res => res.json())
  .then(data => {
    // Dynamically generate tutorial cards
  });
```

### 5. Responsive and Beautiful UI
- Built using Bootstrap 5.
- Includes feature highlight cards, modals, hover animations, and dark mode.

### 6. Dark Mode Toggle
- A floating moon icon toggles dark/light themes.
- Saves user preference in `localStorage`.

```js
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});
```

---

## 🚀 How It Works

1. **User Visits `/login`**
   - Can register or log in.
   - Form sends POST request to server.

2. **Login Authenticates with JSON**
   - Server hashes password and compares with stored hash.
   - If valid, user is redirected to `/loading` then `/index`.

3. **Home Page (`/index`)**
   - Shows animated hero, feature cards, tutorials section, and toggle for dark mode.
   - Feature modals expand with more information.

---

## 🗂️ File Structure

```
project/
├── public/
│   ├── script.js
│   └── styles.css
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── loading.ejs
├── data/
│   ├── users.json
│   └── tutorials.json
├── server.js
└── README.md
```

---

## ✅ Getting Started

```bash
npm install
node server.js
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 👨‍💻 Developed For

**SIT774 Web Technologies and Development (Task 10.4HD)**  
Submitted by: ARNOLD SEBASTIAN
