#!/bin/bash

docco -t assets/docco/pagelet.jst -c assets/docco/docco.less \
    -o assets/docco/generated \
    source/start.js \
    source/controllers/PanelsController.js \
    source/controllers/EditorController.js \
    source/controllers/FilesController.js \
    source/models/collections/RollerCollection.js \
    source/models/collections/NodeCollection.js \
    source/models/models/RollerModel.js \
    source/models/models/NodeModel.js \
    source/models/Scaffold.js \
    source/views/RootView.js \
    source/views/Main/Editor.js \
    source/views/Main/Toolbar.js \
    source/views/Main/Divider.js \
    source/views/Main/Main.js \
    source/views/Main/Documents/Documents.js \
    source/views/Main/Documents/FileTree.js \
    source/views/Main/Roller/Roller.js \
    source/views/Main/Roller/RollerPanel.js \
    source/apps/Sample.js 