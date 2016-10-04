// ScreenExporter for InvisionApp - prototyping
// Version 0.1

// This should export all layers whose names are preceeded with special symbols to
// separate screen pngs as specified in the following article:
// https://support.invisionapp.com/hc/en-us/articles/203730535-How-does-Photoshop-layer-syncing-work-

// Licensed under GPLv3
// (c)2016 Florian Lütkebohmert
// inquiries -> me@fluetke.eu

var currDoc = app.activeDocument; //get active document from illustrator
var exportLocation = "~/Desktop";
var exportFormat = "PNG8";
var png8_options = new ExportOptionsPNG8();
png8_options.antiAliasing = true;
png8_options.artBoardClipping = true;

//alert("Das Document enthält " + currDoc.artboards.length + " Zeichenflächen");

var no_layers_to_include = 0;
var screen_layers = [];
//var always_on_layers = [];
//var alternative_layer = [0];

for (var i=0; i<currDoc.layers.length; i++) { //identify screenlayers and hide all other layers except always on layers

    var currLay = currDoc.layers[i];

    if (currLay.name[0] == "+") {//TODO: replace with regex matching or startswith
        screen_layers.push(currLay);
        currLay.visible = false;
    }
    else if (currLay.name[0] == "*") {
        continue; //these layers act as master layers visible on each screen, therefore they shouldn't be messed  with
    }
    else {
        currLay.visible = false;
    }
}

    //show layer after layer and export them
    for (var j=0; j<screen_layers.length; j++) {
        var alternative_layer = [];
        var scr_lay = screen_layers[j];
        scr_lay.visible = true;

        for(var k=0; k<scr_lay.layers.length; k++) { //this could go out of bounds
            if (scr_lay.layers[k].name[0] == "&") {
                alternative_layer.push(scr_lay.layers[k]);
                scr_lay.layers[k].visible = false;
            }
        }


        currDoc.exportFile(new File(exportLocation + "/" + scr_lay.name + ".png"), ExportType.PNG8, png8_options);

        //export alternative versions
        for (var l=0; l<alternative_layer.length; l++){
            alternative_layer[l].visible = true;
            currDoc.exportFile(new File(exportLocation + "/" + scr_lay.name + "_" + alternative_layer[l].name + ".png"), ExportType.PNG8, png8_options);
            alternative_layer[l].visible = false;
        }
        scr_lay.visible = false;
    }

    alert("Alles exportiert!");

        /*
        var exportDoc = app.documents.add();
        if (currLay.layers.length != 0) { //if sublayers exist
             hide all layers
             show layers beginning with *
             show first layer beginning with +
             export layers
             hide layers
             show next-layer with +
                 etc. create list of layers beginning with +
            alert("There are " + currLay.layers.length + " sublayers to consider here");

        }
    }

       /* if (currLay.layers.length <0)
            for currLay... // recurse or iterate here*/
        //no_layers_to_include++;




//pseudocode idea:
/*
  * grab layer
  * check if layer should be included
  * if no: continue with next layer/return empty document
  * if yes: create new document using layername without symbol as identifier
    * check if layer has sublayers
    * if yes: iterate over sublayers
    * if not: return layers in new document
    * when reaching leave - copy all content of documents into parent document
    */


/*menu - include it
 return menu.doc
+scree_1 - include it
 create scree_1.doc
 check sublayers
  +mainbutton - include it
   create mainbutton.doc
   check sublayers
    &hover - include it
     create hover.doc without ampersand
     return hover doc
    copy layers of hover.doc into mainbutton.doc
  copy layers of hover doch into scree_1.doc
 return scree_1.doc



//var activeArtboard = currDoc.artboards[currDoc.artboards.getActiveArtboardIndex()];

//important TIL - layers work document wide and are not contrained to artboards
// note - this makes having different artboards per ui interface hard to implement,
// better would be to go the other way around, create select a layer and cut it by the artboards.



//Idee zum thema artboard selection -- see note above doesn't work as artboards are not connected to layers in any way
//3 verschiedene Modis für den export:
// nach namen:
// mobile - designs für mobilen einsatz auf smartphones etc.
// tablet - design für tablet apps
// desktop - designs für desktop apps
// export nur von mobile oder desktop boards möglich, per gui-dialog
// mein favorit  zwecks einfachheit:
// export jedes artboards als "artboardname_layername-optionsname.png"
// beispiel: mobile_mainmenu-item1-hovered.png

/*for exporting the follwing methods come to mind:
 - turn off all but the current layers to be exported
 - copy all layers for export to a new document and then export the document as a whole using image capture
 - */

