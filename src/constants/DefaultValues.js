import {Priority} from './';
const DEFAULT_REMAINING_DAYS = 7;
const DEFAULT_DUE_TIME_IN_MILLI = 1000 * 60 * 60 * 24 * DEFAULT_REMAINING_DAYS;
const DEFAULT_TASK_NAME = 'New task';
const DEFAULT_ID = '';
const DEFAULT_PRIORITY = Priority.normal;

export const DEFAULT_ITEM = {
  id: DEFAULT_ID,
  title: DEFAULT_TASK_NAME,
  priority: DEFAULT_PRIORITY,
  dueTime: Date.now() + DEFAULT_DUE_TIME_IN_MILLI,
};
