import React, { FC, useContext, useState } from 'react';
import { OctiveContext, IOctiveContext } from '../../contexts/octive-context';
// @ts-ignore
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import './styles.css';

const OctiveControl: FC<{}> = props => {
  const octiveContext: IOctiveContext = useContext(OctiveContext);
  const [octive, setOctive] = useState(4);

  const handleOctiveChange = (octive: number) => {
    if (Number(octive)) {
      setOctive(octive);
      octiveContext.setOctive(octive);
    } else {
      setOctive(parseInt(octive.toString(), 10));
    }
  };

  return (
    <div className="set-octive">
      <label>Octive</label>
      <InputNumber defaultValue={4} min={1} max={6} value={octive} onChange={handleOctiveChange} required={true} />
    </div>
  );
};

export default OctiveControl;
