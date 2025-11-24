import React from 'react';
import {
  container,
  header,
  headerText,
  listContainer,
  row,
  clubName,
  deleteButton,
  divider,
} from '../../style/AdminDeleteStyle.jsx';

const clubs = [
  "The Robotics Team",
  "Club Name",
  "Club Name",
  "Club Name",
  "Club Name",
  "Club Name",
  "Club Name",
  "Club Name",
  "Club Name",
  "Club Name",
  "Club Name",
  "Club Name",
];


export default function DeleteClub(){
    return (
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <div style={{...headerText, left: 27, top: 19 }}>Club Name</div>
        <div style={{...headerText, left: 732, top: 19 }}>Actions</div>
      </div>

      {/* Club Rows */}
      <div style={listContainer}>
        {clubs.map((club, index) => (
          <div key={index} style={row}>
            <div style={clubName}>{club}</div>
            <div style={deleteButton}>Delete Club</div>
            <div style={{ ...divider, top: 0 }} />
            <div style={{ ...divider, top: 68 }} />
          </div>
        ))}
      </div>
    </div>
    )
}
