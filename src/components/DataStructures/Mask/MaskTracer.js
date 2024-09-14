// eslint-disable-next-line import/no-unresolved
import Tracer from '../common/Tracer';
import MaskRenderer from './MaskRenderer/index'

class MaskTracer extends Tracer {
  getRendererClass() {
    return MaskRenderer
  }

  init() {
    super.init()
    this.maxBits = 0
    this.binaryData = 0
    this.maskData = 0
  }

  setMaxBits(bits) {
    this.maxBits = bits
  }

  setBinary(data) {
    this.binaryData = data
  }

  setMask(maskDecimal, maskIndex) {
    this.maskData = maskDecimal
    this.highlight = maskIndex
  }
}

export default MaskTracer
