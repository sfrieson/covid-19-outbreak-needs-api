# COVID-19 Outbreak Needs API

## Getting Started

### Before you start

You need a valid `.firebaserc` file. It should look something like this:

```json
{
  "projects": {
    "default": "<your Firebase project name>"
  }
}
```

You will also need the credentials JSON file for the "App Engine default service account" [exported as an environment variable](https://cloud.google.com/docs/authentication/getting-started#auth-cloud-implicit-nodejs).

### Starting the server

To start the development server for the Firebase functions run:

```bash
make server
```

This will ensure the dependencies are available if there are any. This includes installing the npm packages listing in the `functions/package.json` as well as copying down the environment variables running in the deployed functions.

### Testing the funciton locally

Looking at the output from running `make server`, you should see lines that point you to where the functions are running like:

```
✔  functions[<function name>]: http function initialized (http://localhost:5001/<project name>/<project zone>/<function name>).
```
