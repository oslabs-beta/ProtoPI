import { writable } from 'svelte/store';

type SidebarTab = 'Responses' | 'Requests' | 'Master';
export const SidebarTabs = writable<SidebarTab>('Responses'); // DEFAULT TAB

type Http2Tab = 'Params' | 'Body' | 'Headers' | 'Authorization' | 'Vars' | 'Scripts' | 'Tests' | 'Documentation' | 'Settings';
export const currentHttp2Tab = writable<Http2Tab>('Params'); // DEFAULT TAB