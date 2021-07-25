// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import updateTemplate from "./commands/update-template";
import hintTemplate from "./commands/hint-template";

export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tscode" is now active!');

	let disposableUpdateTemplate = vscode.commands.registerCommand(
		"vscodecs.updateTemplate",
		updateTemplate
	  );
	
	  let disposableHintTemplate = vscode.commands.registerCommand(
		"vscodecs.hintTemplate",
		hintTemplate
	  );

	context.subscriptions.push(disposableUpdateTemplate,disposableHintTemplate);
}

// this method is called when your extension is deactivated
export function deactivate() {}
