import React from 'react';
import * as styles from '../style/ClubCardStyle';

export default function ClubCard({ name, description, membersCount }) {
  return (
    <div style={styles.cardContainer}>
      <h3 style={styles.title}>{name}</h3>
      <p style={styles.description}>{description}</p>
      <p style={styles.memberCount}>{membersCount} members</p>
    </div>
  );
}