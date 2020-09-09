import { JSDOM } from 'jsdom'

const { window } = new JSDOM('')

export function setup () {
  // @ts-ignore
  global.window = window
  global.document = window.document
  global.navigator = window.navigator
  global.getComputedStyle = window.getComputedStyle
  global.requestAnimationFrame = null
}

export function reset () {
  window.document.title = ''
  window.document.head.innerHTML = ''
  window.document.body.innerHTML = ''
}

export class SvelteWrapper {
  constructor (Tag, props = {}) {
    this.Tag = Tag.default || Tag
    this.props = props
    this.container = window.document.body
    this.component = null
    this.render()
  }

  // What's the tight way to change props and test reload?
  set properties (props) {
    this.props = props
    this.component.$set(props)
  }

  render () {
    this.cleanup()
    this.component = new this.Tag({
      props: this.props,
      target: this.container
    })
  }

  textContent (selector) {
    return this.container.querySelector(selector).textContent
  }

  // fire(elem, event, details) {
  //     let evt = new window.Event(event, details);
  //     elem.dispatchEvent(evt);
  //     return tick();
  // }
  fire (selector, event, details) {
    const evt = new window.Event(event, details)
    this.container.querySelector(selector).dispatchEvent(evt)
    return tick()
  }

  cleanup () {
    if (this.component) {
      this.component.$destroy()
      this.container.childNodes.forEach(child => {
        this.container.removeChild(child)
      })
    }
  }
}


