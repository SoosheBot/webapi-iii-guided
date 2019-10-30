#Middleware notes

##Jargon
-Separation of Concerns
_We do not write code for the computer, code is a communication device, a way to reveal our intentions to the next developer_

**EVERYTHING IS MIDDLEWAAAAREEE!!**

(Almost everyting)

##Types (based on how we got it or who built it)

-built-in: included with expresss, e.g. `express.json()`
-third party: must be installed from npm
-custom: we build these

##Types (based on how it's being used)

-global: runs on every request that comes in to the server


TO NOTE: Order matters. It goes top to bottom, and left to right