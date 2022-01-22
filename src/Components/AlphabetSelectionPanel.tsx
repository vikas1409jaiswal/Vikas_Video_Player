import React from 'react';
import './AlphabetSelectionPanel.css';

interface AlphabetSelectionPanelProps{

}

const AlphabetSelectionPanel : React.FunctionComponent<AlphabetSelectionPanelProps> = (props) => {

    const alphabets: string[] =[
          'A','B','C','D',
          'E','F','G','H',
          'I','J','K','L',
          'M','N','O','P',
          'Q','R','S','T',
          'U','V','W','X',
          'Y','Z'];

    return (
        <>
            <div className="alphabet-container">
              {alphabets.map(a =>  <div>{a}</div>)}
            </div>
        </>
    )
}

export default AlphabetSelectionPanel
