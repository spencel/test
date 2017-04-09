import io
import os

# Directory of source code
srcDir = "../../src"

# Directory of transpiled website and apps
buildDir = "../../build"

# Valid html element name characters
validNameChars = "abcdefghijklmnopqrstuvwxyz-_"

# Get list of components
componentsList = os.listdir( srcDir + "/components" )


# Parse index.html and build it

## Get html file as string
str_index_html = io.open( srcDir + "/index.html", "r", encoding="utf-8" ).read()

def parseHtml( strHtml ):

	i = 0
	while i < len( strHtml ):

		if strHtml[i] == "<":

			htmlElementName = parseName( strHtml, i )

			if htmlElementName == "component":

				componentName = parseComponent( strHtml, i )

				print( componentName )



		i += 1

def parseName( strHtml , i ):

	name = ""

	i += 1
	while i < len( strHtml ):

		if strHtml[i] in validNameChars:

			name += strHtml[i]

		else:

			return name

		i += 1

def parseComponent( strHtml, i ):

	i += 1

	return parseName( strHtml, i )

parseHtml( str_index_html )