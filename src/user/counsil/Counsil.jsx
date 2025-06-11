import React from "react";
import classes from "./Counsil.module.css";
import councilData from "./counsilData";

const ScientificCouncil = ({ data }) => {
  return (
    <div className={classes["scientific-council"]}>
      <h1 className={classes["navbar-logo"]}>Ilmiy kengash</h1>
      <div className={classes["table-responsive"]}>
        <table className={classes["table"]}>
          <thead>
            <tr>
              <th>№</th>
              <th>F.I.SH</th>
              <th>Email manzili</th>
              <th>Lavozimi</th>
            </tr>
          </thead>
          <tbody>
            {councilData.map((member, index) => (
              <tr key={member.id}>
                <td data-label="№">{index + 1}</td>
                <td data-label="F.I.SH">{member.name}</td>
                <td data-label="Email manzili">
                  <a
                    className={classes["email-link"]}
                    href={`mailto:${member.email}`}
                  >
                    {member.email}
                  </a>
                </td>
                <td data-label="Lavozimi">{member.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScientificCouncil;
