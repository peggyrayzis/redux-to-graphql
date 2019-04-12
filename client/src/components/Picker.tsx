import React from 'react';

type Props = {
  options: Array<string>;
  value: string;
  onChange: any;
};

const Picker: React.FC<Props> = ({ value, onChange, options }) => (
  <span>
    <h1>{value}</h1>
    <select onChange={e => onChange(e.target.value)} value={value}>
      {options.map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </span>
);

export default Picker;
