# Algorithms in Action

Welcome to Algorithms In Action!

Here is the [entry](https://algorithms-in-action.github.io/) for the algorithm visualiser.

You may want to read the [WIKI](https://github.com/algorithms-in-action/algorithms-in-action.github.io/wiki) for more project details.

[toc]

## Project Description

Algorithms in Action (AIA) is an animation software tool, developed for the purposes of teaching computer science algorithms by Linda Stern, Lee Naish, and Harald Søndergaard at The University of Melbourne. AIA features animation, pseudocode, and textual explanations, run in coordinated fashion. A key feature of AIA, not found in other algorithm animations, is that students can view an algorithm at varying levels of detail. Starting with a high level pseudocode description of the algorithm, with accompanying high level animation and textual explanation, students can expand sections of the pseudocode to expose more detail. Animation and explanation are controlled in coordinate fashion, becoming correspondingly more detailed as the pseudocode is expanded. The rationale for various features of AIA and results from students using the program were reported in [1].

> [1] Stern, L., Søndergaard, and Naish, L., A Strategy for Managing Content Complexity in Algorithm Animation, *Proceedings of the Fourth Annual SIGCSE/SIGCUE Conference on Innovation and* *Technology in Computer Science Education (ITiCSE99),* Cracow, Poland, ACM Press, 127-130, 1999.

## Development History

The original AIA eventually had modules for some 24 different algorithms, and was used by students at The University of Melbourne and elsewhere. With advances in web technology and changing versions of languages, libraries, and web browsers, the program became progressively slower and slower, and eventually was no longer usable.

Starting in 2020, the program has been redeveloped by successive groups of Software Engineering and Computer Science students at The University of Melbourne, using the latest software tools.

XXXLee ? as at <date> AIA has XX number of modules, covering: NAMES OF MODULES

XXXLee Something about AIA on github.

The detail version history can be accessed in wiki: [Version History](https://github.com/algorithms-in-action/algorithms-in-action.github.io/wiki/Version-History).

## Developer

### Start Up

1. Clone the code
2. Run the project locally
3. Checkout to your personal branch
4. Make some modifications
5. Merge your code into target branch

### Deployment

Algorithms in Action is written in JavaScript, using the React framework. To work on it locally, you will need to install Node.js on your machine. Node.js is an open-source, cross-platform JavaScript runtime environment. NPM (Node package manager) is installed alongside when Node is installed. It is a multipurpose tool that will install 3rd party dependencies, start the app, and run test suites.

#### Environment Setup

Ensure you have node version 18.x and npm version 9.x or higher.

You may also need to install python 3.x for the project.

To verify, you can input the following command in your terminal or command line.

```bash
node --version && npm --version && python --version
```

#### Install Dependencies

Navigate to the **root directory of the project** and run c to install all the dependencies in package.json

```bash
npm install
```

#### Start a local server

Navigate to the **root directory of the project** and run the following command `npm start` this will start the server on your local machine on port 3000. The application will be launched automatically in your default browser at http://localhost:3000

```bash
npm start
```

### Branch Management

Currently, this project use `dev` as main branch. The branch named like `dev-20XXSX` will be development branch for new version. Only the development branch should be merged into main branch.

Therefore, if you are going to develop some new features or fix some bugs for the project, you should create a personal branch to write your code, and then merge your code into target branch.

You may need to check the WIKI for the [development manual](https://github.com/algorithms-in-action/algorithms-in-action.github.io/wiki/Development-Manual).

### Folder Organisation

- src/\: Source code of the web app.
- ui/\: Contains all the images and graphics used for the project.

## License

Algorithms-in-action/algorithms-in-action.github.io is licensed under the MIT License, a short and simple permissive license with conditions only requiring preservation of copyright and license notices.