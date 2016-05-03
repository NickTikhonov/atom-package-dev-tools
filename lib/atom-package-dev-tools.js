'use babel';

import { CompositeDisposable } from 'atom';
import * as path from 'path'

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-package-dev-tools:toggle-code-spec': () => this.toggleCodeSpec()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggleCodeSpec() {
    var editor = atom.workspace.getActiveTextEditor();
    if (!editor || !editor.getPath()) return

    var fileExt = path.extname(editor.getPath());
    var fileName = path.basename(editor.getPath(), fileExt);

    var parentPath = path.join(editor.getPath(), '..');
    if (path.basename(parentPath) === "lib" && fs.existsSync(path.join(parentPath, '..', 'spec'))) {
      var specPath = path.join(parentPath, '..', 'spec')
      var specName = fileName + "-spec" + fileExt;
      var specPath = path.join(specPath, specName);
      if (fs.existsSync(specPath)) {
        atom.workspace.open(specPath, {
        })
      } else {
        atom.notifications.addWarning("No spec");
      }
    } else if (path.basename(parentPath) === "spec" && fs.existsSync(path.join(parentPath, '..', 'lib'))) {
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
    } else {
      atom.notifications.addWarning("Wrong kinda file :(");
    }
  }
}
