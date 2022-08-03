const { exec } = require("child_process");
const { folder } = require("./info");

let url = ""; // URL for cloning down projects, grabbed from github
let letter = ""; // Letter for the student's name usually first letter

exec(
  `cd ${folder} && git clone ${url} ${letter} && cd ${letter} && bundle && rails db:create db:migrate db:seed && cd client && yarn && cd .. && rails s -p 3001`, // used to change folder into the hw name, then clone from url and cd into the student's folder, stuff after can be customized as needed for the project, if project has rails and seeds it will be run as is otherwise if react only, yarn && yarn start is ran instead below is not needed help lines 14 and 15 aren't used however the error is helpful for when the there are issues that occur
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: \n ${stdout}`);
    console.error(`stderr: ${stderr}`);
  }
);
