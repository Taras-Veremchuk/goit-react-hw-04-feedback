import React from 'react';
import Section from 'components/FeedbackForm/Section';
import Statistics from 'components/FeedbackForm/Statistics';
import FeedbackOptions from 'components/FeedbackForm/FeedbackOptions';
import Notification from 'components/FeedbackForm/Notification';
import { Container } from './FeedbackForm/FeedbackForm.styled';
import { useState } from 'react';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [visible, setVisible] = useState(false);

  const showVisible = () => {
    setVisible(true);
  };
  const onLeaveFeedback = event => {
    switch (event.currentTarget.id) {
      case 'good':
        setGood(prevState => prevState + 1);
        showVisible();
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        showVisible();
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        showVisible();
        break;
      default:
        showVisible();
    }
  };

  const countTotalFeedback = () => {
    return neutral + good + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    return Math.round((good * 100) / (neutral + good + bad));
  };

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistic">
        {visible ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification message="No feedback given"></Notification>
        )}
      </Section>
    </Container>
  );
}
