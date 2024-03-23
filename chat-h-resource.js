
    const targetDiv = document.getElementById("chat-h-box");

// HTML content you want to insert
const htmlContent = `
<div class="chat-box" id="chat-box">


<div class="chat-popup" id="chat-popup">
  <div class="chat-header">
    <h2>Customer Support</h2>
    <span class="close-btn" onclick="closeChat()">×</span>
  </div>
  <div class="chat-messages" id="chat-messages">
    <!-- Chat messages will be appended here -->
  </div>
  <div class="chat-input">
    <input type="text" id="user-input" placeholder="Type your message...">
    <button onclick="sendMessage()">Send</button>
  </div>
</div>

<div id="login-form" class="form-container">
  <h2>Login</h2>
  <form>
    <label for="username">Username:</label>
    <input type="text" id="login-username" name="username" placeholder="Enter your username" required>
    <label for="pin">PIN:</label>
    <input type="number" id="login-pin" name="pin" placeholder="Enter your PIN" required>
    <button type="button" onclick="login()">Login</button>
  </form>
  <p>Don't have an account? <a href="#" onclick="showRegisterForm()">Register here</a></p>
</div>

<div id="register-form" class="form-container">
  <h2>Register</h2>
  <form>
    <label for="username">Username:</label>
    <input type="text" id="register-username" name="username" placeholder="Choose a username" required>
    <label for="pin">PIN:</label>
    <input type="number" id="register-pin" name="pin" placeholder="Enter a PIN (minimum 999)" required>
    <label for="pin2">Confirm PIN:</label>
    <input type="number" id="register-pin2" name="pin2" placeholder="Confirm your PIN" required>
    <button type="button" onclick="register()">Register</button>
  </form>
  <p>Already have an account? <a href="#" onclick="showLoginForm()">Login here</a></p>
</div>
</div>
<button class="open-button" id="open-button" onclick="openChat()">Open Chat</button>
`;

// Insert the HTML content into the div
targetDiv.innerHTML = htmlContent;
    
    function openChat() {
      document.getElementById("chat-popup").style.display = "block";
      document.getElementById("chat-box").style.display = "block";
      document.getElementById("open-button").style.display = "none";
    }

    function closeChat() {
      document.getElementById("chat-popup").style.display = "none";
      document.getElementById("chat-box").style.display = "none";
      document.getElementById("open-button").style.display = "block";
    }

    var socket = new WebSocket('ws://localhost:8000/chat/bot/');

    socket.onopen = function (event) {
      console.log('WebSocket connection established.');
    };

    socket.onmessage = function (event) {
      var chatMessages = document.getElementById("chat-messages");
      var userMessage = document.createElement("p");
      userMessage.textContent = "Bot: " + JSON.parse(event.data).message;
      console.log('Message received:', userMessage);
      chatMessages.appendChild(userMessage);
    };

    socket.onclose = function (event) {
      console.log('WebSocket connection closed.');
    };

    function sendMessage() {
      var userInput = document.getElementById("user-input").value;
      

      var userMessage = document.createElement("p");
      userMessage.textContent = "You: " + userInput;
      var chatMessages = document.getElementById("chat-messages");
      chatMessages.appendChild(userMessage);

      socket.send(JSON.stringify({ 'message': userMessage }));

      document.getElementById("user-input").value = "";
    }

    function showLoginForm() {
      document.getElementById("login-form").style.display = "block";
      document.getElementById("register-form").style.display = "none";
      document.getElementById("open-button").style.display = "none";
    }

    function showRegisterForm() {
      document.getElementById("register-form").style.display = "block";
      document.getElementById("login-form").style.display = "none";
      document.getElementById("open-button").style.display = "none";
    }

    function register() {
      // Implement registration logic here
      alert("Registration functionality is not implemented yet.");
    }

    function login() {
      // Implement login logic here
      alert("Login functionality is not implemented yet.");
    }
