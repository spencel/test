import io
import os

# Directory of source code
srcDir = "../../src"
srcComp = srcDir + "/components"

# Directory of transpiled website and apps
buildDir = "../../build"

# Component element
compEle = "<component "

# Valid html element name characters
validNameChars = "abcdefghijklmnopqrstuvwxyz-_"

# Get list of components
componentList = os.listdir( srcDir + "/components" )

# Build app
with io.open( srcDir + "/main.js", "r", encoding="utf-8" ) as srcFile:

	with io.open( buildDir + "/main.js", "w", encoding="utf-8" ) as buildFile:
	
		for line in srcFile:

			buildFile.write( line )

# Parse index.html and build it
with io.open( srcDir + "/index.html", "r", encoding="utf-8" ) as srcFile:

	with io.open( buildDir + "/index.html", "w", encoding="utf-8" ) as buildFile:
	
		for line in srcFile:

			while "<component " in line:

				i1 = line.find( compEle )
				i2 = line.find( ">", i1 )
				compRef = line[ i1 : i2 + 1 ]
				compName = line[ i1 + len( compEle ) : i2 ]
				compHtml = io.open( srcComp + "/" +  compName + "/" + compName + ".html", "r", encoding="utf-8" ).read()
				line = line.replace( compRef, compHtml )

				with io.open( buildDir + "/main.js", "a", encoding="utf-8" ) as buildScriptFile:

					buildScriptFile.write( io.open( srcComp + "/" +  compName + "/" + compName + ".js", "r", encoding="utf-8" ).read() )

			buildFile.write( line )

