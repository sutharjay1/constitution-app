#!/usr/bin/env node

import { execSync } from "child_process";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .option("-g, --generate", "Run `prisma generate`")
  .option("-p, --push", "Run `prisma db push`")
  .option("-f, --format", "Run `npm run format:write`")
  .option("-c, --clear", "Run `clear`");

program.parse(process.argv);

const options = program.opts();

// Helper function to run shell commands
const runCommand = (cmd) => {
  try {
    console.log(chalk.blue(`Executing: ${cmd}`)); // Command being executed in blue
    const output = execSync(cmd, { stdio: "inherit" });
    return output;
  } catch (error) {
    console.error(chalk.red(`Error executing ${cmd}: ${error.message}`)); // Errors in red
    process.exit(1);
  }
};

// Execute the appropriate commands based on options
if (options.generate) {
  runCommand("npx prisma generate");
  console.log(chalk.green("Prisma client generated successfully.")); // Success message in green
}
if (options.push) {
  runCommand("npx prisma db push");
  console.log(chalk.green("Database changes pushed successfully.")); // Success message in green
}
if (options.format) {
  runCommand("npm run format:write");
  console.log(chalk.green("Code formatted successfully.")); // Success message in green
}
if (options.clear) {
  runCommand("clear");
  console.log(chalk.yellow("Console cleared.")); // Clear message in yellow
}

console.log(chalk.green("All commands executed successfully.")); // Overall success message
