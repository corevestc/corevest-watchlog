import { useAuthStore } from "@/presentation/hooks/useAuthStore";

const LOGIN = "/account.html?mode=login";

function hasSession() {
  return Boolean(useAuthStore.getState().token);
}

function goToLogin() {
  if (window.location.pathname.endsWith(".html")) {
    return;
  }
  window.location.replace(LOGIN);
}

function markAuthed() {
  document.documentElement.setAttribute("data-authed", "1");
}

function mountSignOut() {
  if (document.getElementById("watchlog-sign-out")) {
    return;
  }
  const button = document.createElement("button");
  button.id = "watchlog-sign-out";
  button.type = "button";
  button.textContent = "Sign out";
  button.className = "watchlog-sign-out";
  button.addEventListener("click", () => {
    useAuthStore.getState().clearSession();
    window.location.replace(LOGIN);
  });
  document.body.append(button);
}

function applyGate() {
  if (hasSession()) {
    markAuthed();
    mountSignOut();
    return;
  }
  goToLogin();
}

export function startAuthGate() {
  if (useAuthStore.persist.hasHydrated()) {
    applyGate();
  }
  useAuthStore.persist.onFinishHydration(applyGate);
}
