# Dino game

This project is my personal interpretation of the classic Google Dino game that appears when there is no internet connection.

While technically not the most complex project I’ve built, it is one of the most meaningful to me. Games were one of the main reasons I chose to pursue programming in the first place, and this project reflects that origin.

---

# Live Demo

Play the game here:
🔗 https://dino-gamev2.vercel.app/

---

# Game Concept

The gameplay is intentionally simple:

- The dinosaur runs continuously
- Obstacles move toward the player
- The goal is to jump at the right time and avoid collisions
- Each successfully passed obstacle increases the score

---

# Features

- Obstacles move from right to left
- Score increases over time
- Dynamic difficulty:
  - Obstacle speed increases after reaching certain score thresholds
  - Multiple obstacles can appear simultaneously
- Randomized obstacle positioning using `Math.random()`, making each run unique

---

# Technologies used: 

- React
- Vite
- JavaScript (ES6+)
- CSS

The game logic is implemented using React state and effects without direct DOM manipulation.

---

# Planned Improvements

- Leaderboard (global or local high scores)
- Personal best tracking (localStorage)
- Additional difficulty scaling
- Improved jump physics
- Fix a known bug where continuous jumping can prevent the dinosaur from landing, allowing the game to be exploited
- Flip the dinosaur sprite so it faces the obstacles (currently showing impressive courage by jumping with its back to them)

---

# Notes

This project is not just a technical exercise — it’s a small homage to a simple game that left a lasting impression and played a role in shaping my path into software development.

---


