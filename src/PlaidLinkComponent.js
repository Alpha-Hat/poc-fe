import React, { useState } from 'react';
import { PlaidLink } from 'react-plaid-link';

const PlaidLinkComponent = () => {
  const [linkToken, setLinkToken] = useState(null);

  // Fetch a link token from your server (see step 2)
  useEffect(() => {
    const fetchLinkToken = async () => {
      const response = await axios.get('/api/create_link_token');
      setLinkToken(response.data.link_token);
    };

    fetchLinkToken();
  }, []);

  const handleOnSuccess = (publicToken, metadata) => {
    // Send the public_token to your server for exchange (see step 2)
    axios.post('/api/exchange_public_token', { public_token: publicToken })
      .then(response => {
        // Handle the response, such as storing the access token
        console.log(response.data);
      });
  };

  return (
    <PlaidLink
      token={linkToken}
      onSuccess={handleOnSuccess}
      onExit={(error, metadata) => {
        // Handle the exit event, such as error handling
      }}
    >
      Connect your bank account
    </PlaidLink>
  );
};

export default PlaidLinkComponent;