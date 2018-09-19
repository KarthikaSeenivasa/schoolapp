import { combineReducers } from "redux";

import User from './User';
import Clients from "./Clients";
import Projects from './Projects';
import Tasks from './Tasks';
import TimeEntries from './TimeEntries';

export default combineReducers({
  user: User,
  clients: Clients,
  projects: Projects,
  tasks: Tasks,
  timeEntries: TimeEntries
});