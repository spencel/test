import io
import os

# Add a transpiler directive for removing console.log function calls from builds

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

# Build style.css
with io.open( srcDir + "/style.css", "r", encoding="utf-8" ) as srcFile:

	with io.open( buildDir + "/style.css", "w", encoding="utf-8" ) as buildFile:
	
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
				compArr = line[ i1 + len( compEle ) : i2 ].split( "-" )
				compName = compArr[ 0 ]

				with io.open( buildDir + "/main.js", "a", encoding="utf-8" ) as buildScriptFile:
					buildScriptFile.write( io.open( srcComp + "/" +  compName + "/" + compName + ".js", "r", encoding="utf-8" ).read() )

				with io.open( buildDir + "/style.css", "a", encoding="utf-8" ) as buildCssFile:
						buildCssFile.write( io.open( srcComp + "/" +  compName + "/" + compName + ".css", "r", encoding="utf-8" ).read() )
				
				# If it references a display
				if len( compArr ) > 1:
					compView = compArr[ 1 ]
					compHtml = io.open( srcComp + "/" +  compName + "/views/" + compView + ".html", "r", encoding="utf-8" ).read()
					line = line.replace( compRef, compHtml )

					# Get Style
					with io.open( buildDir + "/style.css", "a", encoding="utf-8" ) as buildCssFile:
						buildCssFile.write( io.open( srcComp + "/" +  compName + "/views/" + compView + ".css", "r", encoding="utf-8" ).read() )

					# Get Script
					with io.open( buildDir + "/main.js", "a", encoding="utf-8" ) as buildJsFile:
						buildJsFile.write( io.open( srcComp + "/" +  compName + "/views/" + compView + ".js", "r", encoding="utf-8" ).read() )

				else:

					compHtml = io.open( srcComp + "/" +  compName + "/" + compName + ".html", "r", encoding="utf-8" ).read()
					line = line.replace( compRef, compHtml )



			buildFile.write( line )

