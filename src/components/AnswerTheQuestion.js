import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const AnswerTheQuestion = ({ question, choices, onAnswerSelected }) => {
  return (
    <div>
      <p>{question}</p>
      <List component="nav" aria-label="secondary mailbox folder">
        {choices.map((answer, index) => (
          <ListItemButton variant="contained" key={index} onClick={() => onAnswerSelected(answer)}>
            <ListItemText primary={answer.text} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default AnswerTheQuestion;
