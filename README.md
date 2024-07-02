


List the monorepo workspaces in this git repository:

```
yarn workspaces info
```

Alternatively, run:

```
yarn run wrkspc:ls
or
yarn wrkspc:ls
```

Either of the commands will execute the package.json script which runs the following terminal command:

```
yarn workspaces info | grep '"location"' | sed 's/.*: "\(.*\)",/\1/'

```

The end result is a list of filepaths for where workspaces are located.