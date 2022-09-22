//REACT STUFF
import React from "react";

import "./UserOptionsForm.css";

function UserOptionsForm() {
  return (
    <div id="own-post-options">
      {/* ----------------------FORM ---------------------- vv*/}
      <div className="own-post-options-button">
        <button className="button-text">
          <span className="critical-operations">Block</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">
          <span className="critical-operations">Restrict</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">
          <span className="critical-operations">Report</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">Embed</button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">About this account</button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">Cancel</button>
      </div>
      {/* ---------------------- FORM ---------------------- ^^*/}
    </div>
  );
}

export default UserOptionsForm;
