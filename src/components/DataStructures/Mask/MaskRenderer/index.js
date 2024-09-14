import React from 'react'
import Renderer from '../../common/Renderer'
import styles from './MaskRenderer.module.scss'
import BinaryRenderer from '../BinaryRenderer'

class MaskRenderer extends Renderer {
  constructor(props) {
    super(props)
    this.centerX = 0
    this.centerY = 0
    this.zoom = 100
    this.elementRef = React.createRef()
    this.togglePan(true)
    this.toggleZoom(true)
  }

  renderData() {
    const { binaryData, maskData, maxBits } = this.props.data
    return (
      <div className={styles.container}>
        <BinaryRenderer
          header={"Binary Rep"}
          data={binaryData}
          maxBits={maxBits}
        />
        <BinaryRenderer
          header={"Mask"}
          data={maskData}
          maxBits={maxBits}
        />
      </div>
    );
  }
}

export default MaskRenderer
