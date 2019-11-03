import React, { FC, useContext } from 'react';
import { OctiveContext, IOctiveContext } from '../../contexts/octive-context';
// @ts-ignore
import InputNumber from 'rc-input-number';

const OctiveControl: FC<{}> = props => {
  const octiveContext: IOctiveContext = useContext(OctiveContext);

  const handleOctiveChange = (octive: number) => {
    octiveContext.setOctive(octive);
  };

  return <InputNumber defaultValue={4} min={1} max={6} onChange={handleOctiveChange} />;
};

export default OctiveControl;
