import React, { useState } from 'react';
import { Button, Icon, Modal, Input, Grid } from 'semantic-ui-react';
import MyPopup from '../util/MyPopup';

function ShareButton({ postId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false); // Track if the link is copied
  const shareableLink = `http://striphy.in/posts/${postId}`;

  const handleShare = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsCopied(false); // Reset the copy state when closing the modal
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    setIsCopied(true); // Indicate the link was copied
    setTimeout(() => setIsCopied(false), 2000); // Reset the state after 2 seconds
  };

  const circularButtonStyle = {
    borderRadius: '50%',
    width: '48px', // Adjust as needed
    height: '48px', // Adjust as needed
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px', // Add spacing between buttons
    border: 'none', // Remove any default border
  };

  const copyButtonStyle = {
    backgroundColor: isCopied ? '#21ba45' : '#2185d0', // Green when copied, blue otherwise
    color: 'white',
    transition: 'background-color 0.3s ease',
  };

  return (
    <>
      <MyPopup content="Share post">
        <Button style={circularButtonStyle} color="PaleVioletRed" basic onClick={handleShare}>
          <Icon name="share" />
        </Button>
      </MyPopup>
      <Modal open={modalOpen} onClose={closeModal} size="small">
        <Modal.Header>Share Post</Modal.Header>
        <Modal.Content>
          <p>Share this post via:</p>
          <Grid textAlign="center">
            <Grid.Row>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  style={{
                    ...circularButtonStyle,
                    backgroundColor: '#25D366', // WhatsApp green background
                    color: 'white',
                  }}
                  href={`https://wa.me/?text=${shareableLink}`}
                  target="_blank"
                >
                  <Icon name="whatsapp" style={{ margin: '0' }} />
                </Button>
                <Button
                  style={circularButtonStyle}
                  color="facebook"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareableLink}`}
                  target="_blank"
                >
                  <Icon name="facebook" style={{ margin: '0' }} />
                </Button>
                <Button
                  style={circularButtonStyle}
                  color="twitter"
                  href={`https://twitter.com/intent/tweet?url=${shareableLink}`}
                  target="_blank"
                >
                  <Icon name="twitter" style={{ margin: '0' }} />
                </Button>
                <Button
                  style={circularButtonStyle}
                  color="blue"
                  href={`mailto:?subject=Check out this post!&body=Here's a great post I found: ${shareableLink}`}
                  target="_self"
                >
                  <Icon name="mail" style={{ margin: '0' }} />
                </Button>
                <Button
                  style={circularButtonStyle}
                  color="linkedin"
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareableLink}`}
                  target="_blank"
                >
                  <Icon name="linkedin" style={{ margin: '0' }} />
                </Button>
              </div>
            </Grid.Row>
          </Grid>
          <p>Or copy the link below:</p>
          <Input
            fluid
            value={shareableLink}
            readOnly
            action={{
              style: copyButtonStyle,
              labelPosition: 'right',
              icon: isCopied ? 'check' : 'copy', // Show tick when copied
              content: isCopied ? 'Copied!' : 'Copy Link', // Update text dynamically
              onClick: handleCopy,
            }}
            style={{ marginBottom: '1em' }} // Adding some space below the input
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} color="green">
            Done
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ShareButton;
