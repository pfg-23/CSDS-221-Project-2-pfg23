import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Checkbox from '@mui/material/Checkbox';

import toastr from 'toastr';
import moment from 'moment';

function Todo({
  todo,
  toggleTodo,
  deleteTodo,
  setOpen,
  setAddOpen,
  setTitle,
  setDescription,
  setDeadline,
  setPriority,
}) {

  function handleCompleteClick() {
    toggleTodo(todo.id);
  }

  function handleDeleteClick() {
    deleteTodo(todo.id);
    toastr.success('Item successfully deleted!');
  }

  return (
    <TableRow key={todo.id}>
      <TableCell align="center">{todo.title}</TableCell>
      <TableCell align="center">{todo.description}</TableCell>
      <TableCell align="center">
        {moment(todo.deadline).format('MM/DD/YYYY')}
      </TableCell>
      <TableCell align="center">{todo.priority}</TableCell>
      <TableCell align="center">
        <Checkbox onClick={handleCompleteClick} />
      </TableCell>
      <TableCell align="center">
        <div>
          <Button
            onClick={() => {
              setOpen(true);
              setAddOpen(false);
              setTitle(todo.title);
              setDescription(todo.description);
              setDeadline(todo.deadline);
              setPriority(todo.priority);
            }}
            style={{
              background: '#1666bf',
              color: 'white',
              width: 100,
              display: todo.complete ? 'none' : '',
            }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <EditRoundedIcon fontSize="small" />
              &nbsp;Update
            </Grid>
          </Button>
        </div>
        <div>
          <Button
            onClick={handleDeleteClick}
            style={{
              background: '#f04031',
              color: 'white',
              width: 100,
            }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <HighlightOffIcon fontsize="small" />
              &nbsp;Delete
            </Grid>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default Todo;
