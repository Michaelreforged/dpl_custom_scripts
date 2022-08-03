const fs = require("fs");
const { exec } = require("child_process");
const { folder } = require("./info");

const num = fs.readdirSync(`./${folder}`).length; // used to for check for deleting folder

let current = 0; // used as an iterator

const deleteFolder = () => {
  if (current == num) { // when both match folder is deleted, needs to be checked, if issue occured database might not have been deleted
    exec(`rm -rf ${folder}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`deleted ${folder}`);
      console.log(`stdout: \n ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }
};

fs.readdirSync(`./${folder}`).forEach((name) => {
  console.log(`deleting ${name}`);
  exec(
    `cd ${folder} && cd ${name} && rails db:drop`,// used to drop database from system to prevent excess amount of postgres db
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      current++; // adds to iterator
      console.log(`stdout: \n ${stdout}`);
      console.error(`stderr: ${stderr}`);
      deleteFolder(); // called here so that folder can be deleted when all folders have been looped thru
    }
  );
});
