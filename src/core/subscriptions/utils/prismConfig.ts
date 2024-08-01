import * as vscode from "vscode";

export async function getServerPort(): Promise<number> {
    const config = vscode.workspace.getConfiguration("protopi");
    const startPort = config.get<number>("mockServer.port") ?? 4010;

    // Dynamic import for get-port
    const { default: getPort } = await import('get-port');

    // Creating a range of ports manually
    const port = await getPort({ port: Array.from({ length: 100 }, (_, i) => startPort + i) });
    return port;
}

export function getPrismPath(): string {
    return require.resolve('@stoplight/prism-cli');
}