// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import hintTemplate from './commands/hint-template';
import updateTemplate from './commands/update-template';

export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-cs" is now active!');

	let disposableUpdateTemplate = vscode.commands.registerCommand('vscode-cs.updateTemplate', updateTemplate);

	let disposableHintTemplate = vscode.commands.registerCommand('vscode-cs.hintTemplate', hintTemplate);


	context.subscriptions.push(disposableUpdateTemplate, disposableHintTemplate);
}

// this method is called when your extension is deactivated
export function deactivate() { }
