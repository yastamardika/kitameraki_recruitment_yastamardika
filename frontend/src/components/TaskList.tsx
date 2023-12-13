import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getRTL } from '@fluentui/react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { Icon } from '@fluentui/react/lib/Icon';
import { List } from '@fluentui/react/lib/List';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from '@fluentui/react/lib/Styling';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react';
import { Stack } from '@fluentui/react/lib/Stack';
import TaskForm from './TaskForm';
import UpdateTaskForm from './UpdateTaskForm';

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;
interface Task {

  title: string;
  description: string;

}
const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
});
interface UpdateTask{  
  title: string;
  description: string;
}
const onRenderCell = (item: Task | undefined, index: number | undefined = 0): JSX.Element => {
  // const [detailTask, setDetailTask] = useState({item})
  type TaskId = {
    id: number;
  };
  const _deleteTask = () => {
    const apiUrl = `http://localhost:8000/tasks/${index + 1}`;

    axios.delete(apiUrl)
      .then(response => {
        alert(`task deleted successfully!`)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  return (
    <div className={classNames.itemCell} data-is-focusable={true}>
      <Image
        className={classNames.itemImage}
        src="https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/fluent-placeholder.svg"
        width={50}
        height={50}
        imageFit={ImageFit.cover}
      />
      <div className={classNames.itemContent}>
        <div className={classNames.itemName}>{item?.title}</div>
        <div>{item?.description}</div>
        <div>
          <Stack enableScopedSelectors horizontal >
            <Stack.Item grow={1}>
              <UpdateTaskForm title={`${item?.title}`} description={`${item?.description}`} id={index+1}/>
            </Stack.Item>
            <Stack.Item grow={1}>
              <PrimaryButton text="Delete Task" onClick={_deleteTask} />
            </Stack.Item>
          </Stack>
        </div>
      </div>
      <Icon className={classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
    </div>
  );
};

export const TaskList: React.FunctionComponent = () => {
  const [task, setTask] = useState<Task[]>([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/tasks?page=1&perPage=26';

    axios.get(apiUrl)
      .then(response => {
        setTask(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }
    // , [task] comment this to handle update and delete
  );

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <TaskForm />
      <br />
      <Text variant="large">Task List</Text>
      <List items={task} onRenderCell={onRenderCell} />
    </FocusZone>
  );
};
