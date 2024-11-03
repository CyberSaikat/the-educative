document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("profile-card")) {
      return;
    }
    if (e.target.closest(".profile-card")) {
      return;
    }
    setProfileCard(false);
  });
});
