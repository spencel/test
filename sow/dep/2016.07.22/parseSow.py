import io
import os
import sys

d = {} # a dictionary of sentences which are arrays of words

selfDir = os.path.dirname(sys.argv[0])
sowFileName = "SOW.txt"
with open( "%s/%s" % ( selfDir, sowFileName ), 
	'r', 
	encoding="utf-8" ) as f:
	sNo = 0 # keys in the dictionary as sentence numbers as strings
	k = str( sNo )
	d[ k ] = [] # initialize first sentence
	c = f.read(1) # a character
	w = "" # a word
	while c != "": # loop until there are no more characters
		if c == " ": # a word is key in a dictionary
			d[ k ].append( w )
			w = ""
			c = f.read(1)
		elif c in "\n.": # sentence and line break is separate dictionary
			d[ k ].append( w )
			w = ""
			sNo += 1
			k = str( sNo )
			d[ k ] = []
			c = f.read(1)
		elif c not in "\t": # it's a character and part of a word (exclude tabs)
			w = "%s%s" % ( w, c )
			c = f.read(1)
print(d)