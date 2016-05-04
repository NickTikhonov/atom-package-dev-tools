'use babel';

import { CompositeDisposable } from 'atom';
import * as path from 'path'

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'package-dev-tools:toggle-code-spec': () => this.toggleCodeSpec()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  __isSpec(editor) {
    var parentPath = path.join(editor.getPath(), '..');
    return path.basename(parentPath) === "spec" && fs.existsSync(path.join(parentPath, '..', 'lib'));
  },

  __isCode(editor) {
    var parentPath = path.join(editor.getPath(), '..');
    return path.basename(parentPath) === "lib" && fs.existsSync(path.join(parentPath, '..', 'spec'));
  },

  __openSpec(editor) {
    var fileExt = path.extname(editor.getPath());
    var fileName = path.basename(editor.getPath(), fileExt);
    var parentPath = path.join(editor.getPath(), '..');
    var specPath = path.join(parentPath, '..', 'spec')
    var specName = fileName + "-spec" + fileExt;
    var specPath = path.join(specPath, specName);

    if (fs.existsSync(specPath)) {
      atom.workspace.open(specPath);
    } else {
      atom.notifications.addWarning("No spec");
    }
  },

  __openCode(editor) {
    var fileExt = path.extname(editor.getPath());
    var fileName = path.basename(editor.getPath(), fileExt);
    var parentPath = path.join(editor.getPath(), '..');
    var libPath = path.join(parentPath, '..', 'lib')
    if (fileName.endsWith('-spec')) {
      var codeFileName = fileName.substring(0, fileName.length - 5) + fileExt;
      var codeFilePath = path.join(libPath, codeFileName);
      if (fs.existsSync(codeFilePath)) {
        atom.workspace.open(codeFilePath, {
        })
      } else {
        atom.notifications.addWarning("No code file");
      }
    } else {
      atom.notifications.addWarning("Not a spec file");
    }
  },

  /**
   * Opens/refocuses on associated spec/code file.
   */
  toggleCodeSpec() {
    var editor = atom.workspace.getActiveTextEditor();
    if (!editor || !editor.getPath()) return

    var fileExt = path.extname(editor.getPath());
    var fileName = path.basename(editor.getPath(), fileExt);

    var parentPath = path.join(editor.getPath(), '..');
    if (this.__isCode(editor)) {
      this.__openSpec(editor)
    } else if (this.__isSpec(editor)) {
      this.__openCode(editor);
    } else {
      atom.notifications.addWarning("Wrong kinda file :(");
    }
  }
}
