# 2048 React Clone (4x4 Grid)

This is a simple 2048 clone built with React and Vite. It features smooth tile movement, merge logic, and a clean 4x4 grid layout.

---

## 🛠 Prerequisites

Before running the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes `npm`)

You can check your versions with:

```bash
node -v
npm -v
```

We recommend Node.js v18 or later.

---

## 🚀 Deployment & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/2048-react-clone.git
cd 2048-react-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build locally

```bash
npm run preview
```

---

## 🎮 How to Play

- Click the **Start** button to begin
- Use **Arrow keys (← ↑ → ↓)** to slide tiles
- Tiles with the same number **merge** when they collide
- Reach **2048** to trigger a **clear** message
- If no moves are possible, the game ends with a **Game Over**
- After each move, a new tile appears randomly on the grid

---

## 🧱 Technologies Used

- React (with Vite)
- Custom hook: `useGameLogic.jsx`
- Component structure: `App.jsx`, `Grid.jsx`, `tileLogic.jsx`
- Smooth sliding animation
- State management via React hooks
