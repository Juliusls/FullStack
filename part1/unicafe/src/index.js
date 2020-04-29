import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;

const Statistic = ({text, value}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td width='60'>{text}</td>
                    <td>{value}</td>
                </tr>
            </tbody>
        </table>
)};

const Statistics = ({good, neutral, bad, feedbackAll}) => {

    const feedbackAvg = feedbackAll.reduce((sum, elem) => sum + elem, 0) / feedbackAll.length;
    const numOfPositive = feedbackAll.filter(num => num > 0);
    const positiveFeedback = numOfPositive.length * 100 / feedbackAll.length;

    return (
        <div className='statistics'>
            <h2>statistics</h2>
            {feedbackAll.length > 0
                ? (<div>
                        <Statistic text="good" value ={good} />
                        <Statistic text="neutral" value ={neutral} />
                        <Statistic text="bad" value ={bad} />
                        <Statistic text="all" value ={feedbackAll.length}/>
                        <Statistic text="average" value ={feedbackAll.length > 0 ? feedbackAvg : 0}/>
                        <Statistic text="positive" value ={positiveFeedback ? positiveFeedback + ' %' : 0}/>
                    </div>)
                : (<p>No feedback given</p>)
            }
        </div>
    )
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [feedbackAll, setFeedback] = useState([]);

    const handleSetGood = () => {
        setGood(good + 1);
        setFeedback(feedbackAll.concat(1));
    };

    const handleSetNeutral = () => {
        setNeutral(neutral + 1);
        setFeedback(feedbackAll.concat(0));
    };

    const handleSetBad = () => {
        setBad(bad + 1);
        setFeedback(feedbackAll.concat(-1));
    };

    return (
        <div>
            <h1>give feedback</h1>
            <Button text='good' handleClick={handleSetGood}/>
            <Button text='neutral' handleClick={handleSetNeutral}/>
            <Button text='bad' handleClick={handleSetBad}/>
            <Statistics good={good} neutral={neutral} bad={bad} feedbackAll={feedbackAll} />
        </div>
    )
};

ReactDOM.render(<App />,
    document.getElementById('root')
);
