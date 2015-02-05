# argeebe
Color guessing game

Argeebe is a simple color guessing game I was inspired to make after looking at <a href='http://www.therodimels.com/wp-content/uploads/2013/07/photo-4.jpg'>Pantone swatches</a>. To play, you just input the RGB values you think make up a color that has been randomly generated, and then click through to find out how wrong you are.

The game functions fine, but improvements are still being made, one of the most important being a new scoring algorithm because the current one, which just calculates the Euclidian distance between the generated color and the player's guess in a 3D space designated by the RGB values, is honestly just terrible. I'll most likely be putting in a scoring algorithm based on the Lab color space. 

The project isn't hosted anywhere yet, but it will be soon. 
