import * as React from 'react';
import { useState,  FormEvent } from 'react';
import axios from "axios";
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { useBoolean } from '@fluentui/react-hooks';
import { TextField } from '@fluentui/react';

const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'Update this task',
  subText: 'Click save to change the task information',
};
interface UpdateTask {
  id: number;
  title: string;
  description: string;
}
export const UpdateTaskForm: React.FunctionComponent<UpdateTask> = ({ title, description,id }) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [currentTask, setCurrentTask] = useState<UpdateTask>({
    title: title,
    description: description,
    id: id,
  });
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setCurrentTask({ ...currentTask, [name]: value });
  };
  
  const submitChange = () => {
    const apiUrl = `http://localhost:8000/tasks/${id}`;

    axios.put(apiUrl, currentTask)
      .then(response => {
        alert(`task updated successfully!`)
        toggleHideDialog();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  return (
    <>
      <DefaultButton secondaryText={`Edit task`}  onClick={toggleHideDialog} text="Edit task" />
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <TextField
          placeholder="Title"
          label="Title"
          value={currentTask.title}
          name="title"
          onChange={handleInputChange}
        />
        <TextField
          placeholder="Description"
          label="Description"
          value={currentTask.description}
          name="description"
          onChange={handleInputChange}
        />
        <DialogFooter>
          <PrimaryButton onClick={submitChange} text="Save" />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UpdateTaskForm;