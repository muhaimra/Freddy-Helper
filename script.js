// Your Supabase credentials
const SUPABASE_URL = "https://bjrtcgdzhoplrkujnwnd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqcnRjZ2R6aG9wbHJrdWpud25kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NTQwNTgsImV4cCI6MjA3MzMzMDA1OH0.OXmdhhDZYMHBHls6Mg7K568P6TYQLX9j3VtZzn-O8eI";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const message = document.getElementById("message");
const authBox = document.querySelector(".auth-box");
const userBox = document.querySelector(".user-box");
const userEmail = document.getElementById("user-email");

// Register
document.getElementById("register").addEventListener("click", async () => {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    message.textContent = "❌ " + error.message;
  } else {
    message.textContent = "✅ Registered! Check your email to confirm.";
  }
});

// Login
document.getElementById("login").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    message.textContent = "❌ " + error.message;
  } else {
    message.textContent = "✅ Logged in!";
    showUser(data.user);
  }
});

// Logout
document.getElementById("logout").addEventListener("click", async () => {
  await supabase.auth.signOut();
  authBox.style.display = "block";
  userBox.style.display = "none";
  message.textContent = "👋 Logged out!";
});

// Show user info
function showUser(user) {
  authBox.style.display = "none";
  userBox.style.display = "block";
  userEmail.textContent = "You are logged in as: " + user.email;
}

// Check if already logged in when page loads
async function checkSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    showUser(data.session.user);
  }
}
checkSession();