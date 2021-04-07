import { useEffect, useState } from 'react';
import { Rule } from './api';
import './App.css';
import Navbar from './components/Navbar';
import { RuleCard, RuleCreator } from './components/Rule'

function App () {
  document.title = 'Demo'

  const [rules, setRules] = useState([])
  const [route, setRoute] = useState('list')

  useEffect(() => {
    Rule.getAll().then(data => {
      setRules(data)
    })
  }, [])

  function randomSelect (arr, cnt) {
    if (arr.length < cnt) cnt = arr.length

    function shuffle (array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
    shuffle(arr);
    return arr.slice(0, cnt)
  }

  return (
    <div className="App">
      <Navbar onClick={handle => setRoute(handle)} />
      {route === 'list' && <div className="main">
        <RuleCreator afterCreate={() => {
          Rule.getAll().then(data => {
            setRules(data)
          })
        }} />
        <div className="rulelist">
          {rules.map((rule, idx) => <RuleCard 
            key={idx} rule={rule} editable
            afterDelete={() => {
              Rule.getAll().then(data => {
                setRules(data)
              })
            }}
          />)}
        </div>
      </div>}
      {route === 'vote' && <div className="main">
        <div className="rulelist">
          {randomSelect(rules, 10).map((rule, idx) => <RuleCard key={idx} rule={rule} votable voting />)}
        </div>
      </div>}
      {route === 'home' && <div className="main">
        <h1>Demo</h1>
      </div>}
    </div>
  );
}

export default App;
