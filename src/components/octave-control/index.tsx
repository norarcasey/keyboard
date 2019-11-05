import React, { FC, useContext, useState } from 'react';
import { OctaveContext, IOctaveContext } from '../../contexts/octave-context';
// @ts-ignore
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import './styles.css';

const OctaveControl: FC<{}> = props => {
  const octaveContext: IOctaveContext = useContext(OctaveContext);
  const [octave, setOctave] = useState(4);

  const handleOctaveChange = (octave: number) => {
    if (Number(octave)) {
      setOctave(octave);
      octaveContext.setOctave(octave);
    } else {
      setOctave(parseInt(octave.toString(), 10));
    }
  };

  return (
    <div className="set-octave">
      <label>Octave</label>
      <InputNumber defaultValue={4} min={1} max={6} value={octave} onChange={handleOctaveChange} required={true} />
    </div>
  );
};

export default OctaveControl;
