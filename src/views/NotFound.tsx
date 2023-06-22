import { Button, Result } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const NotFound = () => {
  const [timeoutId, setTimeoutId] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeoutId(setTimeout(() => navigate('/home'), 2500));
  }, [navigate]);
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist. You are being redirected...'
      extra={
        <Button
          type='primary'
          onClick={() => {
            clearTimeout(timeoutId);
            navigate('/home');
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};
