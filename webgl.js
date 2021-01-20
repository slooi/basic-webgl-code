

// Source
const vsSource = document.getElementById("vsSource").innerText
const fsSource = document.getElementById("fsSource").innerText


// Canvas
const canvas = document.getElementById("canvas")
const gl = canvas.getContext("webgl")

// gl setup
gl.viewport(0,0,400,400)
gl.clear(gl.COLOR_BUFFER_BIT)
gl.clearColor(1,1,1,1)

// Data
const position = [
// X   y
	0,	0,
	0,	0.5,
	0.5,	0.5,
]

const color = [
// R G B
	1,0,0,
]

// Program
const program = buildProgram()
gl.useProgram(program)

// Location
// attrib
const attribLocations = []
for (let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_ATTRIBUTES);i++){
	const attribName = gl.getActiveAttrib(program,i).name
	attribLocations[attribName] = gl.getAttribLocation(program,attribName)
}

// buffer
const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(position),gl.STATIC_DRAW)

// pointer
gl.vertexAttribPointer(
	attribLocations.a_VertexPositions,
	2,
	gl.FLOAT,
	false,
	Float32Array.BYTES_PER_ELEMENT*2,
	Float32Array.BYTES_PER_ELEMENT*0,	
)


const colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Uint8Array(color),gl.STATIC_DRAW)

gl.vertexAttribPointer(
	attribLocations.a_Color,
	3,
	gl.UNSIGNED_BYTE,
	false,
	Uint8Array.BYTES_PER_ELEMENT*3,
	Uint8Array.BYTES_PER_ELEMENT*0,	
)


// enable
gl.enableVertexAttribArray(attribLocations.a_VertexPositions)
gl.enableVertexAttribArray(attribLocations.a_Color)


// uniform

// DRAW
gl.drawArrays(gl.POINTS,0,position.length/2)
gl.drawArrays(gl.TRIANGLES,0,position.length/2)


// FUNCTIONS


// Program
function buildProgram(){
	const program = gl.createProgram()
	gl.attachShader(program,buildShader(gl.VERTEX_SHADER,vsSource))
	gl.attachShader(program,buildShader(gl.FRAGMENT_SHADER,fsSource))
	gl.linkProgram(program)
	gl.validateProgram(program)
	
	
	if(!gl.getProgramParameter(program,gl.LINK_STATUS)) console.log("program LINK_STATUS err");
	if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)) console.log("program VALIDATE_STATUS err");
	
	return program
	
}

// Shaders
function buildShader(type,source){
	const shader = gl.createShader(type)
	gl.shaderSource(shader,source)
	gl.compileShader(shader)
	
	console.log(gl.getShaderParameter(shader,gl.COMPILE_STATUS))
	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
		console.log("COMPILE_STATUS ERROR")
	}
	
	return shader
}


/*

NOTE:
- After you bind the buffer, the vertexAttribPointer

*/
