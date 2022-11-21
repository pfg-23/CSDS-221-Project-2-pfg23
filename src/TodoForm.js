import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import toastr from 'toastr';
import uuidv4 from 'uuid/v4';

function TodoForm({
  open,
  setOpen,
  todos,
  setTodos,
  addOpen,
  title,
  setTitle,
  description,
  setDescription,
  deadline,
  setDeadline,
  priority,
  setPriority,
}) {
  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [titleHelper, setTitleHelper] = useState('');
  const [descriptionHelper, setDescriptionHelper] = useState('');

  const handleClose = () => {
    setOpen(false);
    clearErrors();
  };

  const handleAddClose = () => {
    if (!errorInForm(true)) {
      handleAddTodo();
      handleClose();
      toastr.success('Item successfully added!');
    }
  };

  function handleEditClose() {
    if (!errorInForm(false)) {
      const newTodos = [...todos];
      const todo = newTodos.find((todo) => todo.title === title);
      todo.description = description;
      todo.deadline = deadline;
      todo.priority = priority;
      setTodos(newTodos);
      handleClose();
      toastr.success('Item successfully updated!');
    }
  }

  function handleAddTodo() {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          title: title,
          description: description,
          deadline: deadline,
          priority: priority,
          complete: false,
        },
      ];
    });
  }

  function errorInForm(includeTitle) {
    let foundError = false;
    if (includeTitle && document.getElementById('nameInput').value === '') {
      setTitleError(true);
      setTitleHelper('Title is Required!');
      foundError = true;
    } else if (
      includeTitle &&
      todos.find(
        (todo) => todo.title === document.getElementById('nameInput').value
      )
    ) {
      setTitleError(true);
      setTitleHelper('Needs a Unique Title!');
      foundError = true;
    }
    if (document.getElementById('descriptionInput').value === '') {
      setDescriptionError(true);
      setDescriptionHelper('Description is Required!');
      foundError = true;
    }
    return foundError;
  }

  function clearErrors() {
    setTitleError(false);
    setTitleHelper('');
    setDescriptionError(false);
    setDescriptionHelper('');
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <AppBar position="static" style={{ display: 'block' }}>
          <Toolbar style={{ align: 'center' }}>
            <Typography
              component={'span'}
              align="center"
              style={{ width: '100%', alignItems: 'center' }}
            >
              <Grid display="flex" justifyContent="center" alignItems="center">
                {addOpen ? (
                  <AddCircleIcon fontSize="small" />
                ) : (
                  <EditRoundedIcon fontSize="small" />
                )}
                &nbsp;{addOpen ? 'Add Task' : 'Edit Task'}
              </Grid>
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Stack component="form" spacing={1}>
            <TextField
              id="nameInput"
              label="Title"
              style={{ display: addOpen ? 'block' : 'none' }}
              fullWidth
              error={titleError}
              helperText={titleHelper}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br
              style={{
                display: addOpen ? 'block' : 'none',
              }}
            />
            <TextField
              id="descriptionInput"
              label="Description"
              style={{ display: 'block' }}
              fullWidth
              error={descriptionError}
              helperText={descriptionHelper}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <TextField
              type="date"
              id="dateInput"
              label="Deadline"
              style={{ display: 'block' }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <FormLabel>Priority</FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              defaultValue="Low"
              id="radioInputs"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <FormControlLabel value="Low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="Medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="High" control={<Radio />} label="High" />
            </RadioGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addOpen ? handleAddClose : handleEditClose}
            style={{
              background: '#1666bf',
              color: 'white',
              width: 100,
            }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <AddCircleIcon fontSize="small" />
              &nbsp;{addOpen ? 'Add' : 'Edit'}
            </Grid>
          </Button>
          <Button
            onClick={handleClose}
            style={{ background: '#f04031', color: 'white', width: 100 }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <HighlightOffIcon fontSize="small" />
              &nbsp;Cancel
            </Grid>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TodoForm;
