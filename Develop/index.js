const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const projectQuestions = () => {
  // introduces to the app
  console.log(`
    ================
    README-GENERATOR
    ================
    `);
  // gets questions from user
  return inquirer.prompt([
    //title for project
    {
      type: "input",
      name: "title",
      message: "What is the Project Title? (required)",
      validate: (prjTitle) => {
        if (prjTitle) {
          return true;
        } else {
          console.log("\nA project title is required");
          return flase;
        }
      },
    },
    // description of project
    {
      type: "input",
      name: "description",
      message: "Please provide a description for the project (required)",
      validate: (prjDescrip) => {
        if (prjDescrip) {
          return true;
        } else {
          console.log("\nA project description is required");
          return false;
        }
      },
    },
    // checks if client wants to add table of contents
    {
      type: "confirm",
      name: "tocConfirm",
      message: "Would you like to provide a table of contents? (optional)",
      default: false,
    },
    // installation instructions
    {
      type: "input",
      name: "installation",
      message: "Please describe how to install your application. (required)",
      validate: (install) => {
        if (install) {
          return true;
        } else {
          console.log("\nAn installation guide is required.");
          return false;
        }
      },
    },
    // file usage
    {
      type: "input",
      name: "usage",
      message: "Please describe how to use the application. (required)",
      validate: (usage) => {
        if (usage) {
          return true;
        } else {
          console.log("Program instructions are required");
          return false;
        }
      },
    },
  ]);
};

const creditPrompts = (projectData) => {
  // creates array if doesn't exist
  if (!projectData.contrib) {
    projectData.contrib = [];
  }
  // introduces to new section
  console.log(`
  =======
  Credits
  =======
  `);

  return (
    inquirer
      .prompt([
        // prompts for credits
        {
          type: "input",
          name: "credits",
          message:
            "Please input a contributor or collaberator for this project.",
          validate: (credits) => {
            if (credits) {
              return true;
            } else {
              console.log(
                "Input at least one credit. Put N/A if not applicable."
              );
              return false;
            }
          },
        },
        {
          type: "confirm",
          name: "creditConfirm",
          message: "Would you like to add another contributer?",
          default: false,
        },
      ])
      // passes info into projectData.credits then repeats if user selected yes previously
      .then((creditData) => {
        projectData.contrib.push(creditData);
        if (creditData.creditConfirm) {
          return creditPrompts(projectData);
        } else {
          return projectData;
        }
      })
  );
};

const licensePrompt = (projectData) => {
  console.log(`
    =======
    License
    =======
    `);

  return inquirer.prompt([
    {
      type: "checkbox",
      name: "licenses",
      message: "Choose from the following licenses. (Check one)",
      choices: [
        "MIT License",
        "GNU GPLv3",
        "GNU AGPLv3",
        "GNU LGPLv3",
        "Unlicense",
      ],
    },
  ]);
};

// function to write README file
function writeToFile(fileName, data) {}

projectQuestions()
  .then(creditPrompts)
  .then((readmeData) => {
    console.log("Test");
  });
