(function () {
    
    var documents = [
        "Toolbar", "Scaffold", "RollerLayout", "FitToTargetBoundsLayout",
        "Editor", "Core", "ApplicationController", "App"
    ];
    
    enyo.kind({
        name: "Mvc.Documents",
        controller: "Mvc.DocumentsController"
    });
    
}());