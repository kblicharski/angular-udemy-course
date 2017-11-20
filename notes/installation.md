# Quick Install
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
nvm install node
nvm use node
npm install -g npm @angular/cli typescript tslint
```

```bash
# Verify that all dependencies were installed:
command -v nvm node npm ng tsc tslint
# Alternately:
npm list -g --depth=0
```

# Installation
Open a new Terminal window and enter the following commands sequentially.

1. Install [nvm](https://github.com/creationix/nvm). Note that this script may be outdated.
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```
2. Install Node.js:
```bash
nvm install node
nvm use node
```
3. Install npm:
```bash
npm install -g npm
```

4. Install Angular, TypeScript, and TSLint:
```bash
npm install -g @angular/cli typescript tslint
```

5. Verify installation of each dependency:
```bash
command -v nvm node npm ng tsc tslint
```

6. Output should resemble (version numbers may differ):
```bash
nvm
/Users/kblicharski/.nvm/versions/node/v9.2.0/bin/node
/Users/kblicharski/.nvm/versions/node/v9.2.0/bin/npm
/Users/kblicharski/.nvm/versions/node/v9.2.0/bin/ng
/Users/kblicharski/.nvm/versions/node/v9.2.0/bin/tsc
/Users/kblicharski/.nvm/versions/node/v9.2.0/bin/tslint
```
