# ai-to-screen
An export script for Illustrator that turns your *.ai Layers to screens in *.png format, 
similar to the psd exporter from invisionapp 

Use symbols at the start of your layer name to set how the layer is exported
* Layers beginning with + will be exported as new screen
* Layers beginning with * will be present on all screens exported (they need to be set to visible though)
* Layers beginning with & will be exported as variants of the screen (can only be used in the first sublayer of a screen layer)
