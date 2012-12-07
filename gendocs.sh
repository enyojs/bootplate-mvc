#!/bin/bash

docco -t assets/docco/pagelet.jst -c assets/docco/docco.less \
    -o source/views/Main/Documents/docs \
    source/Core.js \
    source/controllers/ApplicationController.js \
    source/controllers/DocumentsController.js \
    source/controllers/EditorController.js \
    source/ext/FitToTargetBoundsLayout.js \
    source/ext/RollerLayout.js \
    source/models/Collections/RollerCollection.js \
    source/models/Models/RollerModel.js \
    source/models/Scaffold.js \
    source/views/App.js \
    source/views/Editor.js \
    source/views/Toolbar.js \
    source/views/Main/Divider.js \
    source/views/Main/Main.js \
    source/views/Main/Documents/Documents.js \
    source/views/Main/Roller/Roller.js \
    source/views/Main/Roller/RollerPanel.js