'use babel';

import { CompositeDisposable } from 'atom';
import * as path from 'path'

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-package-dev-tools:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    var editor = atom.workspace.getActiveTextEditor();
    if (!editor || !editor.getPath()) return

    var fileExt = path.extname(editor.getPath());
    var fileName = path.basename(editor.getPath(), fileExt);

    var libPath = path.join(editor.getPath(), '..');
    if (path.basename(libPath) === "lib" && fs.existsSync(path.join(libPath, '..', 'spec'))) {
      var specPath = path.join(libPath, '..', 'spec')
      var specName = fileName + "-spec" + fileExt;
      var specPath = path.join(specPath, specName);
      if (fs.existsSync(specPath)) {
        atom.workspace.open(specPath, {
          split: 'right'
        })
      } else {
        atom.notifications.addWarning("No spec");
      }
    } else {
      atom.notifications.addWarning("Wrong kinda file :(");
    }
  }
}
