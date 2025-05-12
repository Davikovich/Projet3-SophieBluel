console.log("login.js chargé !");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("Formulaire introuvable");
    return;
  }

  form.addEventListener("submit", async (event) => {
    console.log("🧠 Formulaire soumis");
    event.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Identifiants incorrects");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } catch (error) {
      const errorMsg = document.getElementById("error-message");
      if (errorMsg) {
        errorMsg.textContent = "Email ou mot de passe incorrect.";
      }
      console.error("Erreur de connexion :", error);
    }
  });

  const mdpOublier = document.getElementById("mdp-oublier");
  if (mdpOublier) {
    mdpOublier.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Fonctionnalité non encore disponible.");
    });
  }
});
