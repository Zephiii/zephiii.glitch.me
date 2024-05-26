import Canvas from './canvas.js'
import * as util from './util.js'
import mouse from './mouse.js'

const canvas = document.getElementById('canvas')
const c = new Canvas(canvas)

const colors = {
  _: '#7adbbc',
  _: '#b9e87e',
  _: '#e7896d',
  _: '#fdf380',
  _: '#b58efd',
  _: '#ef99c3',
  _: '#e8ebf7',
  _: '#aa9f9e',
  white: '#ffffff',
  black: '#484848',
  blue: '#3ca4cb',
  green: '#8abc3f',
  red: '#e03e41',
  yellow: '#efc74b',
  purple: '#8d6adf',
  pink: '#cc669c',
  gray: '#a7a7af',
  _: '#726f6f',
  lgray: '#dbdbdb',
  pureBlack: '#000000',
  cream: '#ffdbac',
  mgreen: '#567d46',
  agreen: '#8abc3f',
  burple: '#7289da',
  cherry: '#ff0000',
  redorang: '#FF5700',
  tangerine: '#f96855',
  
  hotorang: '#e44d2e',
  oceanblue: '#007ba7',
  lemon: '#ff9900',
  lavender: '#8e7cc3',
  lpink: '#de6fa1',
}

const exampleTank = {
  barrels: [{
    position: [ 18, 8, 1, 0, 0, 0, 0 ],
  }],
  name: 'Basic Tank',
  type: 'tank',
}
const optionsTank = {
  barrels: [{
    position: [ 18, 7, 1, 0, 0, 0, 0 ],
  }, {
    position: [ 18, 7, 1, 0, 0, 45, 0 ],
  }, {
    position: [ 18, 7, 1, 0, 0, 90, 0 ],
  }, {
    position: [ 18, 7, 1, 0, 0, 135, 0 ],
  }, {
    position: [ 18, 7, 1, 0, 0, 180, 0 ],
  }, {
    position: [ 18, 7, 1, 0, 0, 225, 0 ],
  }, {
    position: [ 18, 7, 1, 0, 0, 270, 0 ],
  }, {
    position: [ 18, 7, 1, 0, 0, 315, 0 ],
  }],
  name: 'Octo Tank',
  type: 'options',
}
const iconTank = {
  barrels: [{
    position: [ 8, 8, 1, 10, 0, 0, 0 ],
  }],
  name: 'Basic Tank',
  type: 'icon',
}

let rotatePoint = (x, y, angle) => {
  let cos = Math.cos(angle)
  let sin = Math.sin(angle)
  return {
    x: cos * x - sin * y,
    y: sin * x + cos * y,
  }
}

let renderEntity = (cx, cy, facing, source, size = 50) => {
  let borderSize = 12
  for (let barrel of source.barrels) {
    let [length, width, aspect, ox, oy, oAngle, _delay] = barrel.position
    let angle = oAngle / 180 * Math.PI + facing
    let { x, y } = rotatePoint((ox + length * 0.5) * 0.1 * size, oy * 0.1 * size, angle)
    if (aspect !== 1) {
      c.trapezoid(cx + x, cy + y, length * 0.05 * size, width * 0.05 * size, angle, aspect, colors.gray, util.mixColors(colors.gray, colors.black, 0.65), borderSize)
    } else {
      if (source.type === 'icon') {
        c.box(cx + x, cy + y, length * 0.1 * size, width * 0.1 * size, angle, null, colors.white, borderSize)
      } else {
        c.box(cx + x, cy + y, length * 0.1 * size, width * 0.1 * size, angle, colors.gray, util.mixColors(colors.gray, colors.black, 0.65), borderSize)
      }
    }
  }

  if (source.turret) {
    c.circle(cx, cy, size, 1, colors.gray, util.mixColors(colors.gray, colors.black, 0.65), 12)
  } else if (source.type === 'icon') {
    c.circle(cx, cy, size, 1, null, colors.white, 12)
  } else if (source.type === 'options') {
    c.circle(cx, cy, size, 1, colors.gray, util.mixColors(colors.gray, colors.black, 0.65), 12)
  } else {
    c.circle(cx, cy, size, 1, colors.blue, util.mixColors(colors.blue, colors.black, 0.65), 12)
  }
  if (source.healer)
    c.healPlus(cx, cy, size * 0.65, colors.red, util.mixColors(colors.red, colors.black, 0.65), 12, 1)
}

let inOrOut = (x, y, w, h, mPos) => {
  c.rect(x, y, w, h, 0, null, colors.red)
  return mPos.x >= x && mPos.x < x + w && mPos.y >= y && mPos.y < y + h
}

const renderMenu = class {
  static modeAbreviation(mode) {
    let output = ''
    /***
    # = teams
    d = dom
    m = mot/maze
    ***/
  }
  constructor(width, height) {
    this.width = width
    this.height = height
    this.render(width, height)
    this.selectedRegion = 'usa'
    this.selectedMode = 'open'
    this.modes = {
      usa: {
        open: ['f', 'o2'],
        tdm:  ['4'],
        maze: ['mf'],
        mini: ['4d', 'm2a', '1s'],
      },
      europe: {
        open: ['f', 'd'],
        tdm:  ['4'],
        maze: [],
        mini: ['1s'],
      },
      asia: {
        open: ['f', 'o2'],
        tdm:  ['p4'],
        maze: ['mf', 'md'],
        mini: ['1s', '4m'],
      }
    }
    
  }
  render(width, height, time) {
    this.width = width
    this.height = height
    this.time = time
    this.offset = {
      x: this.width * 0.005,
      y: this.height * 0.01,
    }
    this.maxWidth = this.width / 3
    this.maxHeight = this.height - (this.height * 0.9)
    //this.title()
    //this.menuSelector()
    //this.selectedMenu()
    
    this.main()
    this.bottomRow()
    this.serverSelector()
  }
  contentBox(x, y, width, height, fill = null, stroke = null, lineWidth = 1) {
    c.box(x, y, width, height, 0, fill, null, lineWidth)
    c.box(x, y + (height * 0.3), width, height * 0.4, 0, util.mixColors(fill, colors.black, 0.15), null, lineWidth)
    c.box(x, y, width, height, 0, null, stroke, lineWidth)
  }
  main() {
    /*this.contentBox(
      this.width * 0.5, this.height * 0.5, 
      this.width * 0.5, this.height * 0.5,
      colors.agreen, util.mixColors(colors.agreen, colors.black, 0.65), 12
    )*/
    this.contentBox(
      this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), this.height * 0.5, 
      this.width * 0.1, this.height * 0.5,
      colors.gray, util.mixColors(colors.gray, colors.black, 0.65), 12
    )
    this.contentBox(
      this.width * 0.5 + (this.width * 0.25 - (this.width * 0.225)), this.height * 0.5, 
      this.width * 0.2, this.height * 0.5,
      colors.agreen, util.mixColors(colors.agreen, colors.black, 0.65), 12
    )

                
    c.circle(
      this.width * 0.5, this.height * 0.125, 
      (this.width * 0.03) + (this.height * 0.03),
      1,
      colors.agreen, util.mixColors(colors.agreen, colors.black, 0.65), 24
    )
    renderEntity(
      this.width * 0.5 - ((this.width * 0.0175) + (this.height * 0.0175)) * 0.25, this.height * 0.125 + ((this.width * 0.0175) + (this.height * 0.0175)) * 0.25, 
      5.5, iconTank, (this.width * 0.015) + (this.height * 0.015)
    )
    
  }
  serverSelector() {
    this.contentBox(
      this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), this.height * 0.25 + (this.height * 0.07 * 0.75), 
      this.width * 0.08, this.height * 0.07,
      colors.hotorang, util.mixColors(colors.hotorang, colors.black, 0.65), 12
    )
    c.text(
      this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), 
      this.height * 0.25 + (this.height * 0.07), 
      25, 'Open'
    )
    
    this.contentBox(
      this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), this.height * 0.25 + (this.height * 0.07 * 0.75) * 2.75, 
      this.width * 0.08, this.height * 0.07,
      colors.oceanblue, util.mixColors(colors.oceanblue, colors.black, 0.65), 12
    )
    c.text(
      this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), 
      this.height * 0.25 + (this.height * 0.07) * 2.25, 
      25, 'TDM'
    )
    
    this.contentBox(
      this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), this.height * 0.25 + (this.height * 0.07 * 0.75) * 4.5, 
      this.width * 0.08, this.height * 0.07,
      colors.lemon, util.mixColors(colors.lemon, colors.black, 0.65), 12
    )
    c.text(
      this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), 
      this.height * 0.25 + (this.height * 0.07) * 3.5, 
      25, 'Maze'
    )
    
    this.contentBox(
      this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), this.height * 0.25 + (this.height * 0.07 * 0.75) * 6.25, 
      this.width * 0.08, this.height * 0.07,
      colors.lpink, util.mixColors(colors.lpink, colors.black, 0.65), 12
    )
    c.text(
      this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), 
      this.height * 0.25 + (this.height * 0.07) * 4.875, 
      25, 'Minigames'
    )
    
    
    
    if (inOrOut(this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)) - (this.width * 0.05),this.height * 0.25 - (this.height * 0.07) * 1.5, this.width * 0.1, this.height * 0.07, mouse) && mouse.left) {
      this.selectedRegion = this.selectedRegion === 'usa' ? 'europe' : this.selectedRegion === 'europe' ? 'asia' : 'usa'
      console.log(this.selectedRegion)
    }
    
    
    /*
        this.modes = {
      usa: {
        open: ['f', 'o2'],
        tdm:  ['4'],
        maze: ['mf'],
        mini: ['4d', 'm2a', '1s'],
      },
      europe: {
        open: ['f', 'd'],
        tdm:  ['4'],
        maze: [],
        mini: ['1s'],
      },
      asia: {
        open: ['f', 'o2'],
        tdm:  ['p4'],
        maze: ['mf', 'md'],
        mini: ['1s', '4m'],
      }
    }
    */
    
    
    
    let displayModes = type => {
      for (let server of Object.values(this.modes[this.selectedRegion][this.selectedMode])) {
        
      }
    }
    
    if (this.selectedRegion === 'usa') {
      this.contentBox(
        this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), this.height * 0.25 - (this.height * 0.07), 
        this.width * 0.1, this.height * 0.07,
        colors.blue, util.mixColors(colors.blue, colors.blue, 0.65), 12
      )
      c.text(
        this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), 
        this.height * 0.25 - (this.height * 0.07 * 0.75), 
        35, 'USA'
      )
      switch (this.selectedMode) {
        case 'open':
          
          break
        case 'tdm':
          
          break
        case 'maze':
          
          break
        case 'mini':
          
          break
      }
    } else if (this.selectedRegion === 'asia') {
      this.contentBox(
        this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), this.height * 0.25 - (this.height * 0.07), 
        this.width * 0.1, this.height * 0.07,
        colors.purple, util.mixColors(colors.purple, colors.black, 0.65), 12
      )
      c.text(
        this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), 
        this.height * 0.25 - (this.height * 0.07 * 0.75), 
        35, 'Asia'
      )
    } else {
      this.contentBox(
        this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), this.height * 0.25 - (this.height * 0.07), 
        this.width * 0.1, this.height * 0.07,
        colors.yellow, util.mixColors(colors.yellow, colors.black, 0.65), 12
      )
      c.text(
        this.width * 0.5 + (this.width * 0.25 - (this.width * 0.05)), 
        this.height * 0.25 - (this.height * 0.07 * 0.75), 
        35, 'Europe'
      )
    }
  }
  
  
  bottomRow() {
    let socialsSize = (this.width * 0.03) + (this.height * 0.03)
    let iconSize = (this.width * 0.02) + (this.height * 0.02)
    
    this.contentBox( // discord
      this.width * 0.25 + (socialsSize * 0.5), this.height * 0.75 + socialsSize,
      socialsSize, socialsSize,
      colors.burple, util.mixColors(colors.burple, colors.black, 0.65), 12
    )
    
    this.contentBox( // youtube
      this.width * 0.25 + (socialsSize * 0.5) * 4 - (this.width * 0.005), this.height * 0.75 + socialsSize,
      socialsSize, socialsSize,
      colors.cherry, util.mixColors(colors.cherry, colors.black, 0.65), 12
    )
    
    this.contentBox( // reddit
      this.width * 0.25 + (socialsSize * 0.5) * 7 - (this.width * 0.01), this.height * 0.75 + socialsSize,
      socialsSize, socialsSize,
      colors.redorang, util.mixColors(colors.redorang, colors.black, 0.65), 12
    )
    
    this.contentBox( // patreon
      this.width * 0.25 + (socialsSize * 0.5) * 10 - (this.width * 0.015), this.height * 0.75 + socialsSize,
      socialsSize, socialsSize,
      colors.tangerine, util.mixColors(colors.tangerine, colors.black, 0.65), 12
    )
    this.contentBox( // settings
      this.width * 0.5 + (this.width * 0.25 * 0.5), this.height * 0.75 + socialsSize,
      this.width * 0.25, socialsSize,
      colors.gray, util.mixColors(colors.gray, colors.black, 0.65), 12
    )
    renderEntity(
      this.width * 0.5 + (this.width * 0.25) - (socialsSize * 0.5), this.height * 0.75 + socialsSize, 
      Math.PI * this.time * 0.001 * 0.15, optionsTank, (this.width * 0.005) + (this.height * 0.005)
    )
    c.text(
      this.width * 0.5 + (this.width * 0.25 * 0.5), 
      this.height * 0.75 + (socialsSize * 1.15), 
      40, 
      'Options'
    )
  }
  /*title() {
    // create the background
    c.rect(
      this.offset.x, 
      this.offset.y, 
      this.maxWidth, 
      this.maxHeight,
      0, colors.gray, util.mixColors(colors.gray, colors.black, 0.65), 12
    )
    // create the title
    //if (this.width > 700) {
      c.text(
        this.maxWidth / 2 + this.offset.x, 
        this.maxHeight - 20, 
        40, 
        'Arras.io Tank Creator'
      )
    //}
  }
  menuSelector() {
    c.rect(
      this.offset.x, 
      this.offset.y + this.maxHeight + 15, 
      this.maxWidth / 3 - this.offset.x, 
      this.maxHeight, 
      0, colors.red, util.mixColors(colors.red, colors.black, 0.65), 12
    )
    c.text(
      this.maxWidth / 3 / 2 + 10, 
      this.offset.y + this.maxHeight * 2, 
      40, 'Menu'
    )
  }
  selectedMenu() {
    c.rect(
      this.offset.x * 2 + (this.maxWidth / 3),
      this.offset.y + this.maxHeight + 15,
      this.maxWidth / 3 * 2 - this.offset.x,
      this.maxHeight,
      0, colors.blue, util.mixColors(colors.blue, colors.black, 0.65), 12
    )
    c.text(
      this.offset.x * 2 + (this.maxWidth / 3) * 2, 
      this.offset.y + this.maxHeight * 2, 
      40, 'Barrel Menu'
    )
  }*/
}

let width = window.innerWidth * window.devicePixelRatio
let height = window.innerHeight * window.devicePixelRatio

const menu = new renderMenu(width, height)



let time = 0
let gameLoop = newTime => {
  let timeElapsed = newTime - time
  time = newTime
  
  let ratio = c.setSize(window.innerWidth, window.innerHeight, window.devicePixelRatio)
  width = window.innerWidth * window.devicePixelRatio
  height = window.innerHeight * window.devicePixelRatio
  
  c.box(0, 0, 12000, 12000, 0, util.mixColors(colors.lgray, colors.pureBlack, 0.1))
  c.box(0, 0, 6000, 6000, 0, colors.lgray)

  for (let i = -100; i <= 100; i++) {
    c.box(0, i * 60, 12000, 2, 0, util.mixColors(colors.lgray, colors.pureBlack, 0.1))
    c.box(i * 60, 0, 2, 12000, 0, util.mixColors(colors.lgray, colors.pureBlack, 0.1))
  }
  
  //renderEntity(width / 2, height / 2, 0, exampleTank, 30)

  menu.render(width, height, time)
  
  let lMousePos = {
    x: mouse.x / (window.innerWidth * window.devicePixelRatio) * width * 2,
    y: mouse.y / (window.innerHeight * window.devicePixelRatio) * height * 2,
  }
  
  mouse.left = false
  mouse.right = false
  

  requestAnimationFrame(gameLoop)
}
  
requestAnimationFrame(gameLoop)
