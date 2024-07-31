import * as vscode from 'vscode';
import { handleFetchRequest } from './methodsAxios';

// HANDLERS FOR AXIOS ROUTER MESSAGES
export const axiosMessageHandler = {
  makeFetchRequest: handleFetchRequest,
};
