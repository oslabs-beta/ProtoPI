import path from "path";
import * as vscode from "vscode";

export interface SpecFile {
  uri: vscode.Uri;
  name: string;
}

export interface SpecTreeDirectory {
  files: SpecFile[];
  name: string;
}

export async function findSpecFiles(): Promise<vscode.Uri[]> {
  const glob = "**/*.yaml";
  const files = await vscode.workspace.findFiles(glob, "**/node_modules/**");
  return files;
}

export function groupFilesByDirectory(
  files: vscode.Uri[]
): SpecTreeDirectory[] {
  const dirMap: { [key: string]: SpecFile[] } = {};

  files.forEach((file) => {
    const dirName = path.dirname(file.fsPath);
    if (!dirMap[dirName]) {
      dirMap[dirName] = [];
    }

    dirMap[dirName].push({
      uri: file,
      name: path.basename(file.fsPath),
    });
  });

  // Returns an array of directories containing spec files
  return Object.keys(dirMap).map((dir) => ({
    name: path.basename(dir),
    files: dirMap[dir],
  }));
}
