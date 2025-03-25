# Advanced To-Do App

An advanced To-Do application built with **React, Redux, and Vite**. This app enables users to manage tasks efficiently with priority levels, view real-time weather updates, and experience a clean and responsive UI.

## Features

### Authentication
- Simple login functionality managed using Redux state.

### Task Management
- Add tasks with priority levels (**High, Medium, Low**).
- Delete tasks.
- Filter tasks by priority.
- Sort tasks by priority.

### Weather Updates
- Displays current weather for a predefined location.
- Provides weather warnings based on conditions.

### Responsive Design
- Fully optimized for mobile, tablet, and desktop devices.

### State Persistence
- Tasks and authentication state are stored in **localStorage** for session retention.

## Project Structure

```
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── public/
│   ├── vite.svg
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── store.js
│   ├── styles.css
│   ├── assets/
│   │   ├── react.svg
│   ├── components/
│   │   ├── TaskInput.jsx
│   │   ├── TaskList.jsx
│   │   ├── Weather.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Tasks.jsx
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── taskSlice.js
│   │   ├── weatherSlice.js
```

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd adv-todo-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open the app in your browser at: **http://localhost:5173**

## Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the app for production.
- `npm run preview` - Preview the production build.
- `npm run lint` - Run ESLint for code quality checks.

## Dependencies

- **React** - Frontend UI library.
- **Redux Toolkit** - State management.
- **React Router DOM** - Routing.
- **Axios** - HTTP requests.
- **Bootstrap** - Responsive design.
- **React Icons** - Icon library for UI enhancements.

## Weather API Configuration

This app uses the [OpenWeatherMap API](https://openweathermap.org/) to fetch weather data.
Replace the API key in `src/slices/weatherSlice.js` with your own API key.

## License

This project is licensed under the **MIT License**. See the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Bootstrap](https://getbootstrap.com/)
- [OpenWeatherMap API](https://openweathermap.org/)