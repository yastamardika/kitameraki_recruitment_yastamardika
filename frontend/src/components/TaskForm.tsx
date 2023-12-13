import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack} from '@fluentui/react/lib/Stack';

type Field = { options?: { label?: string }; validation?: string };
type Form<T> = { [P in keyof T]: Field };
type FormValue = { title: string; description: string };

type PropsForm<T> = {
  fields: Form<T>;
  value: T & { [key: string]: string };
  changeFormValue: (name: keyof Form<T>, value?: string) => void;
};

const FormComponent = <T extends unknown>({
  fields,
  changeFormValue,
  value
}: PropsForm<T>) => {
  return (
    <React.Fragment>
      {(Object.keys(fields) as Array<keyof Form<T>>).map((field) => {
        const { validation, options } = fields[field];
        return (
          <TextField
            label={options?.label}
            value={value[field]}
            errorMessage={validation}
            onChange={(_: any, value?: string) => changeFormValue(field, value)}
          />
        );
      })}
    </React.Fragment>
  );
};

const TaskForm = () => {
  const [form, setForm] =useState<FormValue>({
    title: "",
    description: ""
  });
  const viewForm = ({ title, description }: FormValue): Form<any> => ({
    title: {
      validation: title.length === 0 ? "Field is required" : undefined,
      options: {
        label: "Title"
      }
    },
    description: {
    //   validation:
    //     description.length === 0 && title.length > 0
    //       ? "Field is required"
    //       : undefined,
      options: {
        label: "Description"
      }
    }
  });
  const _submitTask = () => {
    const apiUrl = 'http://localhost:8000/tasks';

    axios.post(apiUrl, form)
      .then(response => {
        alert(`New task added successfully!`)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  const handleDisabled = () => {
    return form.title.length === 0 ? true : false
  }
  return (
    <Stack>
      {FormComponent<FormValue>({
        fields: viewForm(form),
        changeFormValue: (field, value) => setForm({ ...form, [field]: value }),
        value: form
      })}
      <PrimaryButton text="Add New Task" onClick={_submitTask} allowDisabledFocus disabled={handleDisabled()}/>
    </Stack>
  );
};

export default TaskForm;