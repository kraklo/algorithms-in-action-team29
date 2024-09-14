import React, { useCallback } from 'react';
import styles from './BinaryRenderer.module.scss';
import PropTypes from 'prop-types';

const BinaryRenderer = ({ header, data, maxBits }) => {
  const binary = useCallback(() => {
    let binaryString = data.toString(2);
    if (binaryString.length < maxBits) {
      binaryString = binaryString.padStart(maxBits, '0');
    }
    return binaryString;
  })

  return (
    <div className={styles.container}>
      <div className={styles.outline}>
        {binary()}
      </div>
      <div className={styles.title}>
        {header}
      </div>
    </div>
  );
}

BinaryRenderer.propTypes = ({
  header: PropTypes.string.isRequired,
  data: PropTypes.number.isRequired,
  maxBits: PropTypes.number,
})

export default BinaryRenderer;
