import { useState } from 'react';
import './App.css'; 
import ToDoList from './components/ToDoList';

function App() {
  // States for counter and dynamic inputs
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState([{ value: '' }]); // Array of input values
  const [result, setResult] = useState(0);

  // Increment function
  function handleIncrement() {
    setCount(count + 1);
  }

  // Decrement function
  function handleDecrement() {
    if (count > 0) setCount(count - 1); // Prevent going below zero
  }

  // Reset function
  function handleReset() {
    setCount(0);
  }

  // Handle change for a specific input field
  function handleInputChange(e, index) {
    const newInputs = [...inputs];
    newInputs[index].value = e.target.value;
    setInputs(newInputs);
  }

  // Add a new input field
  function handleAddInput() {
    setInputs([...inputs, { value: '' }]);
  }

  // Remove an input field
  function handleRemoveInput(index) {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  }

  // Calculator functions (similar to before)
  function handleAdd() {
    const sum = inputs.reduce((acc, input) => acc + Number(input.value), 0);
    setResult(sum);
  }


function handleSubtract() {
  if (inputs.length > 0) {
     const difference = inputs.slice(1).reduce((acc, input) => acc - Number(input.value), Number(inputs[0].value));
    setResult(difference);
  }
}


  function handleMultiply() {
    const product = inputs.reduce((acc, input) => acc * Number(input.value), 1);
    setResult(product);
  }

  function handleDivide() {
    const divisor = inputs.reduce((acc, input) => acc / Number(input.value), inputs[0].value);
    if (inputs.some(input => Number(input.value) === 0)) {
      alert('Cannot divide by zero');
    } else {
      setResult(divisor);
    }
  }

  return (
    <main>
      <div className="app-container">
        {/* Counter Section */}
        <div className="counter-section">
          <h1 className="counter-heading">The Number: {count}</h1>
          <div className="button-group">
            <button className="button increment" onClick={handleIncrement}>
              Increment
            </button>
            <button className="button decrement" onClick={handleDecrement} disabled={count === 0}>
              Decrement
            </button>
            <button className="button reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="calculator-section">
          <h2>Calculator</h2>
          <div className="inputs">
            {inputs.map((input, index) => (
              <div key={index} className="input-group">
                <input
                  type="number"
                  className="input-field"
                  value={input.value}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Enter number"
                />
                {inputs.length > 1 && (
                  <button
                    className="button remove"
                    onClick={() => handleRemoveInput(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="button-group">
            <button className="button" onClick={handleAdd}>+</button>
            <button className="button" onClick={handleSubtract}>-</button>
            <button className="button" onClick={handleMultiply}>*</button>
            <button className="button" onClick={handleDivide}>/</button>
          </div>

          <h3 className="result">Result: {result}</h3>
          <button className="button add-input" onClick={handleAddInput}>
            Add Input
          </button>
        </div>
      </div>

      <div>
        <ToDoList />
      </div>
    </main>
  );
}

export default App;
