import React from "react";

function Contact({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />;
}

export default Contact;
