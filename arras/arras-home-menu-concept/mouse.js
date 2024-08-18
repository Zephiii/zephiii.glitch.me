import Canvas from './canvas.js'

const canvas = document.getElementById('canvas')
const c = new Canvas(canvas)

let mouse = { 
  x: 0, 
  y: 0,
  left: false,
  right: false,
}

canvas.addEventListener('click', e => {
  mouse.left = true
})
canvas.addEventListener('contextmenu', e => {
  e.preventDefault()
  mouse.left = true
})
canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX * window.devicePixelRatio
  mouse.y = e.clientY * window.devicePixelRatio
})

export default mouse
