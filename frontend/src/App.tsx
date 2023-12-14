import React from 'react';
import { Stack, Text, Link, FontWeights, IStackTokens, IStackStyles, ITextStyles } from '@fluentui/react';
import './App.css';
import { TaskList } from "./components/TaskList";

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '1280px',
    margin: '0 auto',
    color: '#605e5c',
  },
};
const taskParentStyles: Partial<IStackStyles> = {
  root: {
    width: '1280px',
    marginTop: '64px',
    backgroundColor: '#F5F7F8',
    padding: '24px',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.13), 0px 1px 1px 0px rgba(0,0,0,0.11);'
  },
};

export const App: React.FunctionComponent = () => {
  
  return (
    <Stack horizontalAlign="center" verticalAlign="center" tokens={stackTokens}>
      <Stack.Item align="auto" styles={stackStyles}>
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={taskParentStyles} tokens={stackTokens}>
          
          <Text variant="xxLarge" styles={boldStyle}>
            Simple task management site
          </Text>
          <Text variant="large" styles={boldStyle}>
            <TaskList/>
          </Text>
          <Stack horizontal tokens={stackTokens} horizontalAlign="center">
            <Link href="https://developer.microsoft.com/en-us/fluentui#/get-started/web">Docs</Link>
            <Link href="https://stackoverflow.com/questions/tagged/office-ui-fabric">Stack Overflow</Link>
            <Link href="https://github.com/microsoft/fluentui/">Github</Link>
            <Link href="https://twitter.com/fluentui">Twitter</Link>
          </Stack>
          <Text variant="large" styles={boldStyle}>
            Kitameraki Test 
          </Text>
          <Stack horizontal tokens={stackTokens} horizontalAlign="center">
          </Stack>
        </Stack>
      </Stack.Item>
    </Stack>

  );
};
