// Em InputControls.tsx (ou inputCalc.tsx)
import React from "react"; // Importe React se estiver usando React.ChangeEvent

interface InputControlsProps {
  currentNumber1: string;
  onNumber1Change: (value: string) => void; // Ou React.ChangeEvent<HTMLInputElement>
  currentNumber2: string;
  onNumber2Change: (value: string) => void; // Ou React.ChangeEvent<HTMLInputElement>
  currentOperation: string;
  onOperationChange: (value: string) => void; // Ou React.ChangeEvent<HTMLSelectElement>
}

function InputControls({
  currentNumber1,
  onNumber1Change,
  currentNumber2,
  onNumber2Change,
  currentOperation,
  onOperationChange,
}: InputControlsProps) {
  return (
    <div className="inputs-calc">
      <input
        type="number"
        value={currentNumber1}
        onChange={(e) => onNumber1Change(e.target.value)}
        placeholder="Numero 1"
      />
      <select
        name="operações"
        id="operações"
        value={currentOperation}
        onChange={(e) => onOperationChange(e.target.value)}
      >
        <option value="">selecione</option>
        <option value="som">+</option>
        <option value="sub">-</option>
        <option value="multi">*</option>
        <option value="div">/</option>
      </select>
      <input
        type="number"
        value={currentNumber2}
        onChange={(e) => onNumber2Change(e.target.value)}
        placeholder="Numero 2"
      />
    </div>
  );
}

export default InputControls;