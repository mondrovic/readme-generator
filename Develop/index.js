const inquirer = require("inquirer");
const writeFile = require("./utils/write.js");
const generateMarkdown = require("./utils/generateMarkdown.js");

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
          console.log("\nProgram instructions are required");
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
                "\nInput at least one credit. Put N/A if not applicable."
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
  if (!projectData.license) {
    projectData.license = [];
  }

  return inquirer
    .prompt([
      // gets licensing information from popular licenses
      {
        type: "list",
        name: "license",
        message: "Choose from the following licenses. (Check one)",
        choices: [
          "MIT License",
          "GNU GPLv3",
          "GNU AGPLv3",
          "GNU LGPLv3",
          "Unlicense",
        ],
      },
    ])
    .then((licenseData) => {
      projectData.license.push(licenseData);
      return projectData;
    });
};

const contactInfo = (projectData) => {
  if (!projectData.contact) {
    projectData.contact = [];
  }

  console.log(`
  ========================
  Contact Info & Questions
  ========================
  `);

  return inquirer
    .prompt([
      //   collects name
      {
        type: "input",
        name: "fullName",
        message:
          "Please type in your full name for contact and licensing (required)",
        validate: (fullNameVal) => {
          if (fullNameVal) {
            return true;
          } else {
            console.log("\nA name is required");
            return false;
          }
        },
      },
      // collects email
      {
        type: "input",
        name: "email",
        message:
          "Please provide an email address for contact purposes (required)",
        validate: (emailVal) => {
          if (emailVal) {
            return true;
          } else {
            console.log("\nAn email address is required");
            return false;
          }
        },
      },
      // collects github
      {
        type: "input",
        name: "github",
        message: "Please type in your GitHub username (required)",
        validate: (githubVal) => {
          if (githubVal) {
            return true;
          } else {
            console.log("\nYour GitHub username is required");
            return false;
          }
        },
      },
    ])
    .then((contactData) => {
      projectData.contact.push(contactData);
      return projectData;
    });
};

projectQuestions()
  .then(creditPrompts)
  .then(licensePrompt)
  .then(contactInfo)
  .then((readmeData) => {
    return generateMarkdown(readmeData);
  })
  .then((readme) => {
    return writeFile(readme);
  });
