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

			# Execute the code below if a Component is found
			while "<component " in line:

				i1 = line.find( compEle )
				i2 = line.find( ">", i1 )
				compRef = line[ i1 : i2 + 1 ]
				compArr = line[ i1 + len( compEle ) : i2 ].split( "-" )
				compName = compArr[ 0 ]
				compPath = srcComp + "/" +  compName + "/" + compName

				# Transpile the Component's js file if it exists
				if ( os.path.exists( compPath + ".js" ) ):
					with io.open( buildDir + "/main.js", "a", encoding="utf-8" ) as buildJsFile:
						with io.open( compPath + ".js", "r", encoding="utf-8" ) as srcJsFile:
							buildJsFile.write( srcJsFile.read() )

				# Transpile the Component's css file if it exists
				if ( os.path.exists( compPath + ".css" ) ):
					with io.open( buildDir + "/style.css", "a", encoding="utf-8" ) as buildCssFile:
						with io.open( compPath + ".css", "r", encoding="utf-8" ) as srcCssFile:
							buildCssFile.write( srcCssFile.read() )
				
				# If the Directive does not include a View, then...
				if len( compArr ) == 1:

					compHtml = io.open( compPath + ".html", "r", encoding="utf-8" ).read()
					line = line.replace( compRef, compHtml )

				# Else the Component Directive includes a View, e.g., "gbk-dump", where "dump" is the name of the View
				else:

					compView = compArr[ 1 ]
					compViewPath = srcComp + "/" +  compName + "/views/" + compView

					# Transpile View's html file if it exists
					if ( os.path.exists( compViewPath + ".html" ) ):
						with io.open( compViewPath + ".html", "r", encoding="utf-8" ) as srcHtmlFile:
							compViewHtml = srcHtmlFile.read()
							line = line.replace( compRef, compViewHtml )

					# Transpile the View's css file if it exists
					if ( os.path.exists( compViewPath + ".css" ) ):
						with io.open( buildDir + "/style.css", "a", encoding="utf-8" ) as buildCssFile:
							with io.open( compViewPath + ".css", "r", encoding="utf-8" ) as srcCssFile:
								buildCssFile.write( srcCssFile.read() )

					# Transpile the View's js file if it exists
					if ( os.path.exists( compViewPath + ".js" ) ):
						with io.open( buildDir + "/main.js", "a", encoding="utf-8" ) as buildJsFile:
							with io.open( compViewPath + ".js", "r", encoding="utf-8" ) as srcJsFile:
								buildJsFile.write( srcJsFile.read() )

			buildFile.write( line )

