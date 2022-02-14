import inquirer from 'inquirer';
export async function askFor ( name, message, type, choices ) {
  const answer = await inquirer
    .prompt( [
      {
        type,
        name,
        message,
        choices: [
          ...choices,
          new inquirer.Separator(),
        ],
      },
    ] );
  return answer[name];
}