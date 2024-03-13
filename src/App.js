import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState("");
  const [Popup, setPopup] = useState(false);

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: schemas.map((schema) => ({ [schema.value]: schema.label })),
    };

    const response = await fetch(
      "https://webhook.site/262fe495-f923-47e7-af1d-f9e4a577d866",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response, data);
  };

  const handleAddNewSchema = () => {
    if (
      selectedSchema !== "" &&
      !schemas.some((schema) => schema.value === selectedSchema)
    ) {
      setSchemas((prevSchemas) => [
        ...prevSchemas,
        {
          label: selectedSchema,
          value: selectedSchema,
          dotClass: selectedSchema === "account_name" ? "dotRed" : "dotGreen",
        },
      ]);
      setSelectedSchema("");
    }
  };

  const handlePopUp = () => {
    setPopup(true);
  };
  const handleDelete = (e) => {
    console.log(e.target.value, schemas);
    let newVal = schemas.filter((val) => val.label !== e.target.value);
    console.log(newVal);
    setSchemas(newVal);
  };

  const handleCancel = () => {
    setSchemas([]);
  };

  return (
    <div className="screen">
      <div className="saveSegment">
        <h1>View Audience</h1>
        <button onClick={handlePopUp}>Save Segment</button>
      </div>
      {Popup && (
        <div className="popUp">
          <h1>Saving Segment</h1>
          <span>Enter the name of the Segment</span>
          <br />
          {/* To enter segment name */}
          <input
            type="text"
            placeholder="Name of the Segment"
            value={segmentName}
            className="segName"
            onChange={(e) => setSegmentName(e.target.value)}
          />{" "}
          <br />
          <span>
            To save your segment, you need to add the schemas to build the query
          </span>
          <br />
          <div className="dots">
            <span className="dotGreen"></span>
            <label>User Traits</label>
            <span className="dotRed"></span>
            <label>Group Traits</label>
          </div>
          <br />
          {/* To display the selected dropdown */}
          <ul>
            {schemas.map((schema, index) => (
              <li key={index}>
                <span className={schema.dotClass}></span>
                <select
                  value={schema.label}
                  onChange={(e) => setSelectedSchema(e.target.value)}
                >
                  <option value="">Add schema to segment</option>
                  <option value="first_name">First Name</option>
                  <option value="last_name">Last Name</option>
                  <option value="gender">Gender</option>
                  <option value="age">Age</option>
                  <option value="account_name">Account Name</option>
                  <option value="city">City</option>
                  <option value="state">State</option>
                </select>{" "}
                <button
                  className="delete"
                  value={schema.label}
                  onClick={(e) => handleDelete(e)}
                >
                  -
                </button>
                <br />
              </li>
            ))}
          </ul>
          {/* To select the schema */}
          <span className="dot"></span>
          <select
            value={selectedSchema}
            onChange={(e) => setSelectedSchema(e.target.value)}
          >
            <option value="">Add schema to segment</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="gender">Gender</option>
            <option value="age">Age</option>
            <option value="account_name">Account Name</option>
            <option value="city">City</option>
            <option value="state">State</option>
          </select>{" "}
          <button className="delete">-</button>
          <br />
          {/* To add new schema or list */}
          <a href="#" onClick={handleAddNewSchema}>
            + Add New Schema
          </a>
          {/* Buttons for saving the schemas or to cancel it */}
          <div>
            <button className="save" onClick={handleSaveSegment}>
              Save the Segment
            </button>
            <button className="cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
