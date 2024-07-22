import { writable } from 'svelte/store';

type SidebarTabs = 'Responses' | 'Requests' | 'Master';
export const SidebarTabs = writable('Responses'); // DEFAULT TAB

type Http2TabName = 'Params' | 'Body' | 'Headers' | 'Authorization' | 'Vars' | 'Scripts' | 'Tests' | 'Documentation' | 'Settings';
export const currentHttp2Tab = writable<Http2TabName>('Params'); // DEFAULT TAB
