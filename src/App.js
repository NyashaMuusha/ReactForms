import React, { useReducer, useState } from "react";
import "./styles.css";

const fromReducer = (state, e) => {
  if (e.reset) {
    return {
      apple: "",
      count: 0,
      name: "",
      "gift-wrap": false
    };
  }
  return {
    ...state,
    [e.name]: e.value
  };
};
export default function App() {
  const [formData, setformData] = useReducer(fromReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const isCheckbox = e.target.type === "checked";
    setformData({
      name: e.target.name,
      value: isCheckbox ? e.target.checked : e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setformData({
        reset: true
      });
    }, 3000);
  };

  return (
    <div className="wrapper">
      <h1>How about them apples</h1>
      {submitting && (
        <div>
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>:{value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset disabled={submitting}>
          <label>
            <p>Name</p>
            <input
              name="name"
              onChange={handleChange}
              value={formData.name || ""}
            />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
        <fieldset disabled={submitting}>
          <label>
            <p>Apples</p>
            <select
              name="apple"
              onChange={handleChange}
              value={formData.apple || ""}
            >
              <option value="">--Please choose an option--</option>
              <option value="fuji">Fuji</option>
              <option value="jonathan">Jonathan</option>
              <option value="honey-crisp">Honey Crisp</option>
            </select>
          </label>{" "}
          <label>
            <p>Count</p>
            <input
              type="number"
              name="count"
              onChange={handleChange}
              value={formData.count || ""}
              step="1"
            />
          </label>
          <label>
            <p>Gift Wrap</p>
            <input
              type="checkbox"
              disabled={(formData.apple /= "fuji")}
              name="gift-wrap"
              onChange={handleChange}
              checked={formData["gift-wrap"] || false}
            />
          </label>
        </fieldset>
      </form>
    </div>
  );
}
