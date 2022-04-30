const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const generate = require("./lib/htmlGenerator");

const teamMembers = [];

function init() {
  managerPrompts();
}

// `````` TEAM MANAGER ``````
function managerPrompts() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the name of the team manager:",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter team manager's empoyee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter team manager's email address:",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter team manager's office number:",
      },
    ])
    .then((val) => {
      const manager = new Manager(
        val.name,
        val.id,
        val.email,
        val.officeNumber
      );
      teamMembers.push(manager);
      addTeamMember();
    });
}

function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "what_type",
        message: "Do you want to add an engineer or intern to the team?",
        choices: ["Engineer", "Intern", "No"],
      },
    ])
    .then((val) => {
      if (val.what_type === "Engineer") {
        engineerPrompts();
      } else if (val.what_type === "Intern") {
        internPrompts();
      } else {
        createFile();
      }
    });
}

// `````` ENGINEER ``````
function engineerPrompts() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the name of the engineer:",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter engineer's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter engineer's email address:",
      },
      {
        type: "input",
        name: "github",
        message: "Please enter engineer's GitHub username:",
      },
    ])
    .then((val) => {
      const engineer = new Engineer(val.name, val.id, val.email, val.github);
      teamMembers.push(engineer);
      addTeamMember();
    });
}

// `````` INTERN ``````
function internPrompts() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the name of the intern:",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter intern's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter intern's email address:",
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the intern's school/university name:",
      },
    ])
    .then((val) => {
      const intern = new Intern(val.name, val.id, val.email, val.school);
      teamMembers.push(intern);
      addTeamMember();
    });
}

function createFile() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  } else {

    fs.writeFileSync(outputPath, generate(teamMembers), "UTF-8");
    console.log("HTML file created in the dist folder!");
  }
  
}

init();
