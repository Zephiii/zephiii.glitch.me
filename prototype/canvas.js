const Canvas = class {
    constructor(canvas) {
      this.canvas = canvas
      this.width = 300
      this.height = 150
      this.scale = 1
      
      this.ctx = canvas.getContext('2d')
      this.ctx.lineJoin = 'round'
    }
    setSize(width, height, scale) {
      if (this.width !== width || this.height !== height || this.scale !== scale) {
        this.width = width
        this.height = height
        this.scale = scale
        
        let cWidth = Math.ceil(width * scale)
        let cHeight = Math.ceil(height * scale)
        this.canvas.width = cWidth
        this.canvas.height = cHeight
        this.canvas.style.width = `${cWidth / scale}px`
        this.canvas.style.height = `${cHeight / scale}px`
  
        this.ctx.lineJoin = 'round'
      }
      return width / height
    }
    setViewport(x, y, width, height) {
      let sx = this.width * this.scale / width
      let sy = this.height * this.scale / height
      this.ctx.setTransform(sx, 0, 0, sy, -x * sx, -y * sy)
    }
    circle(x, y, radius, alpha = 1, fill = null, stroke = null, border = 0) {
      this.ctx.save()
      this.ctx.globalAlpha = alpha
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, 0, Math.PI * 2)
      if (stroke != null) {
        this.ctx.lineWidth = border
        this.ctx.strokeStyle = stroke
        this.ctx.stroke()
      }
      if (fill != null) {
        this.ctx.fillStyle = fill
        this.ctx.fill()
      }
      this.ctx.restore()
    }
    rect(x, y, width, height, angle, fill = null, stroke = null, border = 0) {
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.translate(x, y)
      this.ctx.rotate(angle)
      this.ctx.rect(0, 0, width, height)
      if (stroke != null) {
        this.ctx.lineWidth = border
        this.ctx.strokeStyle = stroke
        this.ctx.stroke()
      }
      if (fill != null) {
        this.ctx.fillStyle = fill
        this.ctx.fill()
      }
      this.ctx.restore()
    }
    box(x, y, width, height, angle, fill = null, stroke = null, border = 0, alpha = 1) {
      this.ctx.save()
      this.ctx.globalAlpha = alpha
      this.ctx.beginPath()
      this.ctx.translate(x, y)
      this.ctx.rotate(angle)
      this.ctx.rect(width * -0.5, height * -0.5, width, height)
      if (stroke != null) {
        this.ctx.lineWidth = border
        this.ctx.strokeStyle = stroke
        this.ctx.stroke()
      }
      if (fill != null) {
        this.ctx.fillStyle = fill
        this.ctx.fill()
      }
      this.ctx.restore()
    }
    trapezoid(x, y, width, height, angle, aspect, fill = null, stroke = null, border = 0) {
      let h0 = height
      let h1 = height
      if (aspect > 0)
        h0 *= aspect
      else if (aspect < 0)
        h1 *= -aspect
      let r0 = Math.atan2(h0, width)
      let r1 = Math.atan2(h1, width)
      let l0 = Math.sqrt(width * width + h0 * h0)
      let l1 = Math.sqrt(width * width + h1 * h1)
  
      this.ctx.beginPath()
      this.ctx.moveTo(x + l0 * Math.cos(angle + r0),           y + l0 * Math.sin(angle + r0))
      this.ctx.lineTo(x + l1 * Math.cos(angle + Math.PI - r1), y + l1 * Math.sin(angle + Math.PI - r1))
      this.ctx.lineTo(x + l1 * Math.cos(angle + Math.PI + r1), y + l1 * Math.sin(angle + Math.PI + r1))
      this.ctx.lineTo(x + l0 * Math.cos(angle - r0),           y + l0 * Math.sin(angle - r0))
      this.ctx.closePath()
      if (stroke != null) {
        this.ctx.lineWidth = border
        this.ctx.strokeStyle = stroke
        this.ctx.stroke()
      }
      if (fill != null) {
        this.ctx.fillStyle = fill
        this.ctx.fill()
      }
    }
    polygon(sides, size, x, y, fill = null, stroke = null, border = 0) {
      this.ctx.beginPath()
      this.ctx.moveTo (x + size, y + size * 0)
      for (let i = 1; i <= sides; i++)
        this.ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / sides), y + size * Math.sin(i * 2 * Math.PI / sides))
      this.ctx.closePath() 
      if (stroke != null) {
        this.ctx.lineWidth = border
        this.ctx.strokeStyle = stroke
        this.ctx.stroke()
      }
      if (fill != null) {
        this.ctx.fillStyle = fill
        this.ctx.fill()
      }
    }
    text(x, y, size, text) {
      this.ctx.font = `bold ${size}px Ubuntu`
      this.ctx.textAlign = 'center'
      this.ctx.lineWidth = size * 0.35
      this.ctx.strokeStyle = '#3a3a3a'
      this.ctx.fillStyle = '#f6f6f6'
      this.ctx.beginPath()
      this.ctx.strokeText(text, x, y)
      this.ctx.fillText(text, x, y)
    }
    healPlus(x, y, size, fill = null, stroke = null, border = 0, alpha = 1) {
      let s = size / 3
      
      this.ctx.save()
      this.ctx.globalAlpha = alpha
      this.ctx.beginPath()
      this.ctx.moveTo(x + s    , y - s * 3)
      this.ctx.lineTo(x - s    , y - s * 3)
      this.ctx.lineTo(x - s    , y - s    )
      this.ctx.lineTo(x - s * 3, y - s    )
      this.ctx.lineTo(x - s * 3, y + s    )
      this.ctx.lineTo(x - s    , y + s    )
      this.ctx.lineTo(x - s    , y + s * 3)
      this.ctx.lineTo(x + s    , y + s * 3)
      this.ctx.lineTo(x + s    , y + s    )
      this.ctx.lineTo(x + s * 3, y + s    )
      this.ctx.lineTo(x + s * 3, y - s    )
      this.ctx.lineTo(x + s    , y - s    )
      this.ctx.lineTo(x + s    , y - s * 3)
      this.ctx.closePath() 
  
      if (stroke != null) {
        this.ctx.lineWidth = border
        this.ctx.strokeStyle = stroke
        this.ctx.stroke()
      }
      if (fill != null) {
        this.ctx.fillStyle = fill
        this.ctx.fill()
      }
      this.ctx.restore()
    }
    createPath(x, y, width, height, pathTo, opacity, fill = null, stroke = null, border = 0) {
      this.ctx.save()
      this.ctx.globalAlpha = opacity
      let path = new Path2D(pathTo)
      if (typeof pathTo === 'object') {
        let paths = Object.values(pathTo)
        let origin = new Path2D(pathTo[0])
        for (let path of paths.splice(1, paths.length))
          origin.addPath(new Path2D(path))
        path = origin
      }
      //path.moveTo(x, y)
      this.ctx.translate(x + (width * 0.5), y + (height * 0.5))
      this.ctx.scale(width / 12800, height / -12800)
      this.ctx.translate(0, -12800)
  
      if (stroke != null) {
        this.ctx.lineWidth = border
        this.ctx.strokeStyle = stroke
        this.ctx.stroke(path)
      }
      if (fill != null) {
        this.ctx.fillStyle = fill
        this.ctx.fill(path)
      }
      this.ctx.restore()
    }
  }
  
  export default Canvas
  
