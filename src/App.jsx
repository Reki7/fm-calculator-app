import './App.css';
import Calculator from "./components/Calculator";

//TODO:
// --0. Period
// --1. App layout (on page) + footer
// --2. Styling service buttons (Del, Reset, =)
// --3. Header component
// --4. Themes
// --5. Keyboard input
// 6. Active key visualize
// --7. Keypad layout (one grid)
// 8. Tests (class Calc)
// 9. Readme
// --10. Expression show (and mode 'valRes')
// --11. String length limit (change font size, science notation)
// --12. Group delimiter
// --13. Operations history
// 14. Show history (with animation)
// 15. Save current theme in LocalStorage
// 16. prefers-color-scheme (https://web.dev/prefers-color-scheme/)


function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
